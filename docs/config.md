---
title: Configuration
description: Learn how to configure the Lando MySQL service.
---

# Configuration

Here are the configuration options, set to the default values, for this service. If you are unsure about where this goes or what this means, we *highly recommend* scanning the [services documentation](https://docs.lando.dev/config/services.html) to get a good handle on how the magicks work.

Also note that options, in addition to the [build steps](https://docs.lando.dev/config/services.html#build-steps) and [overrides](https://docs.lando.dev/config/services.html#overrides) that are available to every service, are shown below:

::: warning Be careful when switching database type, version or credentials!
You should be careful switching database `type`, `version` or `creds`.

In the case of type and version, the underlying database files between these things will likely not be compatible. In the case of credentials, these are set when the container is **initially created** so in order to change them you need to `lando destroy && lando start`. Note that `lando destroy` will delete all the data in your database.


**Ignoring this warning can prevent your database from starting**
:::

```yaml
services:
  myservice:
    type: mysql:5.7
    portforward: false
    creds:
      user: mysql
      password: mysql
      database: database
    config:
      database: SEE BELOW
    # This setting only works on mysql:8.0
    authentication: caching_sha2_password
```

## Port forwarding

`portforward` will allow you to access this service externally by assigning a port directly on your host's `localhost`. Note that ` portforward` can be set to either `true` or a specific `port` but we *highly recommend* you set it to `true` unless you have pretty good knowledge of how port assignment works or you have a **very** compelling reason for needing a locked down port.

`portforward: true` will prevent inevitable port collisions and provide greater reliability and stability across Lando apps. That said, one downside of `portforward: true` is that Docker will assign a different port every time you restart your application. You can read more about accessing services externally [over here](https://docs.lando.dev/guides/external-access.html).

`tl;dr`

**Recommended**

```yaml
services:
  myservice:
    type: mysql
    portforward: true
```

**Not recommended**

```yaml
services:
  myservice:
    type: mysql
    portforward: 3600
```

## Setting custom credentials

You can also configure the default `database`, `user` and `password`. However, it is *very important* to note that these things get set the **FIRST TIME YOU START** the service and **ONLY THE FIRST TIME.**

This means that if you change any of the `creds`, you need to `lando destroy` and then `lando start` the service for the changes to take effect. This stands in contrast to the normal `lando rebuild` method to change config and is a consequence of persisting the database's data directory between rebuilds.

```yaml
services:
  myservice:
    type: mysql
    creds:
      user: mysql -> myuser
      password: mysql -> mypassword
      database: database -> db7
```

```bash
lando destroy -y && lando start
```

Also note that by default all `mysql` services have a passwordless `root` user. **DO NOT ALTER THE PASSWORD OF THE ROOT USER.**


## Using a custom MySQL config file

You may need to override our [default MySQL config](https://github.com/lando/mysql/tree/main/services/mysql) with your own [custom MySQL config](https://dev.mysql.com/doc/refman/8.0/en/option-files.html).

If you do this, you must use a file that exists inside your application and express it relative to your project root as shown below:

**A hypothetical project**

Note that you can put your configuration files anywhere inside your application directory. We use a `config` directory but you can call it whatever you want such as `.lando` in the example below:

```bash
./
|-- config
   |-- my-custom.cnf
|-- .lando.yml
```

**Landofile's mysql config**

```yaml
services:
  myservice:
    type: mysql
    config:
      database: config/my-custom.cnf
```
Your override file will get copied to `/opt/bitnami/mysql/conf/bitnami/my_custom.cnf` in the database container and an include will be added to the MySQL configuration file located at `/opt/bitnami/mysql/conf/my.cnf`.

## Getting information

You can get connection and credential information about your mysql instance by running [`lando info`](https://docs.lando.dev/cli/info.html). It may also be worth checking out our [accessing services externally guide](https://docs.lando.dev/guides/external-access.html).

## Adding tooling commands

By default a service will not do any tooling routing for you but you can add helpful `lando` commands.

```yaml
tooling:
  donet:
    service: myservice
```

You can then invoke them on the command line.

```bash
lando dotnet
```

Lando tooling is actually pretty powerful so definitely check out [the rest](https://docs.lando.dev/config/tooling.html) of its cool features.

## Adding routing

By default a service will not do any proxy routing for you but you can add your own.

```yaml
proxy:
  myservice:
    - myapp.lndo.site
    - something.else.local
```

Lando proxying is actually pretty powerful so definitely check out [the rest](https://docs.lando.dev/config/proxy.html) of its cool features.