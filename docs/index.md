---
title: MySQL Lando Plugin
description: Add a highly configurable MySQL service to Lando for local development with all the power of Docker and Docker Compose.
next: ./config.html
---

# MySQL

[MySQL](https://www.mysql.com/) is a very common database server.

You can easily add it to your Lando app by adding an entry to the [services](https://docs.lando.dev/config/services.html) top-level config in your [Landofile](https://docs.lando.dev/config/lando.html).

```yaml
services:
  myservice:
    type: mysql
```

## Supported versions

*   [8.0](https://hub.docker.com/r/bitnami/mysql)
*   **[5.7](https://hub.docker.com/r/bitnami/mysql)** **(default)**
*   [custom](https://docs.lando.dev/config/services.html#advanced)

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

## Custom Installation

This plugin is included with Lando by default. That means if you have Lando version `3.0.8` or higher then this plugin is already installed!

However if you would like to manually install the plugin, update it to the bleeding edge or install a particular version then use the below. Note that this installation method requires Lando `3.5.0+`.

:::: code-group
::: code-group-item DOCKER
```bash:no-line-numbers
# Ensure you have a global plugins directory
mkdir -p ~/.lando/plugins

# Install plugin
# NOTE: Modify the "yarn add @lando/mysql" line to install a particular version eg
# yarn add @lando/mysql@0.5.2
docker run --rm -it -v ${HOME}/.lando/plugins:/plugins -w /tmp node:14-alpine sh -c \
  "yarn init -y \
  && yarn add @lando/mysql --production --flat --no-default-rc --no-lockfile --link-duplicates \
  && yarn install --production --cwd /tmp/node_modules/@lando/mysql \
  && mkdir -p /plugins/@lando \
  && mv --force /tmp/node_modules/@lando/mysql /plugins/@lando/mysql"

# Rebuild the plugin cache
lando --clear
```
:::
::: code-group-item HYPERDRIVE
```bash:no-line-numbers
# @TODO
# @NOTE: This doesn't actaully work yet
hyperdrive install @lando/mysql
```
::::

You should be able to verify the plugin is installed by running `lando config --path plugins` and checking for `@lando/mysql`. This command will also show you _where_ the plugin is being loaded from.
