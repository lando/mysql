---
title: MySQL Lando Plugin
description: Add a highly configurable MySQL service to Lando for local development with all the power of Docker and Docker Compose.
next: ./config.html
---

# MySQL

[MySQL](https://www.mysql.com/) is a very common database server.

You can easily add it to your Lando app by adding an entry to the [services](https://docs.lando.dev/services/lando-3.html) top-level config in your [Landofile](https://docs.lando.dev/landofile/).

```yaml
services:
  myservice:
    type: mysql:8.0
```

## Supported versions

*   [8.4](https://hub.docker.com/r/bitnami/mysql/tags?name=8.4.)
*   [8.0](https://hub.docker.com/r/bitnami/mysql/tags?name=8.0.)
*   **[5.7](https://hub.docker.com/r/bitnami/mysql/tags?name=5.7.)** **(default)**
*   [custom](https://docs.lando.dev/services/lando-3.html#overrides)

## Patch versions

::: warning Not officially supported!
While we allow users to specify patch versions for this service they are not *officially* supported so if you use one, YMMV.
:::

To use a patch version, you can do something as shown below:

```yaml
services:
  myservice:
    type: mysql:5.7.24
```

But make sure you use one of the available [patch tags](https://hub.docker.com/r/bitnami/mysql/tags) for the underlying image we are using.

