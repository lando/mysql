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
# Should use 5.7.29 as the default version
lando ssh -s defaults -c "mysql --version | grep 5.7.29"

# Should use the patch version when set by the user
lando ssh -s patch -c "mysql --version | grep 5.7.24"

# Should use the correct default user pass db
lando ssh -s defaults -c "mysql -umysql -pmysql database -e quit"

# Should still be running even after a restart
lando restart
lando ssh -s defaults -c "mysql -umysql -pmysql database -e quit"
```

Destroy tests
-------------

Run the following commands to trash this app like nothing ever happened.

```bash
# Should be destroyed with success
lando destroy -y
lando poweroff
```
