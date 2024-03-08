'use strict';

// checks to see if a setting is disabled
module.exports = options => {
  let healthcheck = [
    'mysql',
    `--host=${options.name}`,
  ];

  // Only include whatever creds are available.
  options.creds.user ? healthcheck.push(`--user=${options.creds.user}`) : false;
  options.creds.database ? healthcheck.push(`--database=${options.creds.database}`) : false;
  options.creds.password ? healthcheck.push(`--password=${options.creds.password}`) : false;

  healthcheck = healthcheck.concat([
    '--silent',
    '--execute',
    '"SHOW TABLES;"',
  ]);

  return healthcheck.join(' ');
};
