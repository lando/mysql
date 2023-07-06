'use strict';

// Modules
const fs = require('fs');
const generator = require('dockerfile-generator');
const _ = require('lodash');
const path = require('path');


// Builder
module.exports = {
  name: 'mysql',
  config: {
    meUser: 'mysql',
    version: '8',
    supported: ['8'],
    patchesSupported: true,
    authentication: 'caching_sha2_password',
    confSrc: __dirname,
    creds: {
      database: 'database',
      password: 'mysql',
      user: 'mysql',
    },
    healthcheck: 'mysql -uroot --silent --execute "SHOW DATABASES;"',
    port: '33060',
    defaultFiles: {
      database: 'my_custom.cnf',
    },
    remoteFiles: {
      database: '/etc/mysql/conf.d/my_custom.cnf',
    },
  },
  parent: '_service',
  builder: (parent, config) => class LandoMySql extends parent {
    constructor(id, options = {}) {
      options = _.merge({}, config, options);
      // Ensure the non-root backup perm sweep runs
      // NOTE: we guard against cases where the UID is the same as the bitnami non-root user
      // because this messes things up on circle ci and presumably elsewhere and _should_ be unncessary
      if (_.get(options, '_app._config.uid', '1000') !== '1001') options._app.nonRoot.push(options.name);

      // Whatever the MySQL entrypoint is for a bare-bones example to bypass the Lando default entrypoint. see here for Bitnami: https://github.com/bitnami/containers/blob/main/bitnami/mysql/5.7/debian-11/Dockerfile
      // https://github.com/lando/core/blob/main/plugins/lando-core/builders/_lando.js#LL32C45-L32C45
      options.entrypoint = 'docker-entrypoint.sh';
       
      // Create a Dockerfile.
      // Could start with a Dockerfile that literally just references the bitnami image.
      // Move all items necessary for context into /tmp folder (Dockerfile, Lando helper scripts) namespaced by app/servicename.
      fs.mkdirSync(`/tmp/${options.name}`, { recursive: true });
      fs.copyFileSync(path.resolve(__dirname, '..', 'dockerfiles', 'Dockerfile-mysql-v4-8.0'), `/tmp/${options.name}/Dockerfile-mysql-v4-8.0`);
      fs.cpSync(path.resolve(__dirname, '..', 'scripts'), `/tmp/${options.name}`, {recursive: true});
      fs.cpSync(path.resolve(__dirname, 'my_custom.cnf'), `/tmp/${options.name}/config/my_custom.cnf`, {recursive: true});

      // 1. Get as much stuff from the Docker Compose into here.
      // 2. Move as much functionality from the Lando entrypoint (certs, ssh keys, setting up the user)
      // -> Does Lando automatically use entrypoint? Can I pass in a custom entrypoint? lando/core 
      // 3. Once these things are working, switch to official MySQL image.

      // OPT: Generate the Dockerfile from metadata using docker-file-generator?
      const dockerFileJson = {
        from: {baseImage: 'mysql:8.0.33'},
        copy: {
          '*.sh': '/',
          'config/my_custom.cnf': '/etc/mysql/conf.d/my_custom.cnf',
        },
        run: '/setup.sh',
        env: {
          MYSQL_AUTHENTICATION_PLUGIN: options.authentication,
          MYSQL_DATABASE: options.creds.database,
          MYSQL_PASSWORD: options.creds.password,
          MYSQL_USER: options.creds.user,
          MYSQL_ALLOW_EMPTY_PASSWORD: 'yes',
          LANDO_NEEDS_EXEC: 'DOEEET',
        },
        entrypoint: options.entrypoint,
        cmd: 'mysqld',
      };

      // Generate Dockerfile and save to filesystem.
      generator.generate(dockerFileJson).then((dockerFile) => {
        return fs.writeFileSync(`/tmp/${options.name}/Dockerfile`, dockerFile);
      }).then(() => {
        console.log('Dockerfile saved successfully!');
      }).catch((err) => {
        console.error('Error saving Dockerfile:', err);
      });

      // Build Docker Compose file here.
      const mysql = {
        // @todo: I feel like this shouldn't be necessary.
        command: 'mysqld',
        // Use the object version with build context to reference the new Dockerfile, look at Voya example.
        build: `/tmp/${options.name}`,
        volumes: [
          `${options.confDest}/${options.defaultFiles.database}:${options.remoteFiles.database}`,
          `${options.data}:/var/lib/mysql`,
        ],
      };
      // Send it downstream
      super(id, options, {services: _.set({}, options.name, mysql)});
    };
  },
};
