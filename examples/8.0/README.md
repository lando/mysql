MySQL Example
=============

This example exists primarily to test the following documentation:

* [MySQL Service](https://docs.devwithlando.io/tutorials/mysql.html)

Start up tests
--------------

Run the following commands to get up and running with this example.

```bash
# Should start up successfully
lando poweroff
lando start
```

Verification commands
---------------------

Run the following commands to validate things are rolling as they should.

```bash
# Should use 8.4 as the default version
lando exec defaults -- mysql --version | grep 8.4.3

# Should use the patch version when set by the user
lando exec patch -- mysql --version | grep 8.0.24

# Should use the correct default user pass db
lando exec defaults -- mysql -umysql -pmysql database -e quit

# Should still be running even after a restart
lando restart
lando exec defaults -- mysql -umysql -pmysql database -e quit
```

Destroy tests
-------------

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
lando destroy -y
lando poweroff
```
