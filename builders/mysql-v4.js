'use strict';

// Modules
const _ = require('lodash');

// Builder
module.exports = {
  name: 'mysql-v4',
  config: {
  },
  parent: '_service',
  builder: (parent, config) => class LandoMySqlV4 extends parent {
    constructor(id, options = {}) {
      options = _.merge({}, config, options);

      // Use options to determine which builder to load.
      const mysql = require(`./mysql-v4-${options.version}.js`)(parent, config);
      
      // Load builder into super.
      super(id, options, {services: _.set({}, options.name, mysql)});
    };
  },
};
