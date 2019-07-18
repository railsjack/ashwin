## You can refer to this document in order to create new one.

```
$ heroku create
$ heroku rename ashwin-nahrae --app mighty-headland-77844
$ git push origin master && git push heroku master && heroku ps:scale web=1
$ heroku open
$ npm install --yes
$ heroku local web
$ npm install cool-ascii-faces --save
$ heroku open cool
$ heroku addons:create papertrail
$ heroku addons:open papertrail
$ heroku addons:create heroku-postgresql:hobby-dev
$ heroku config:set TIMES=2
$ npm install pg --sav
$ heroku pg:psql
psql (9.5.2, server 9.6.2)
SSL connection (cipher: DHE-RSA-AES256-SHA, bits: 256)
Type "help" for help.
=> create table test_table (id integer, name text);
CREATE TABLE
=> insert into test_table values (1, 'hello database');
INSERT 0 1
=> \q

$ heroku pg:psql
psql (9.5.2, server 9.6.2)
SSL connection (cipher: DHE-RSA-AES256-SHA, bits: 256)
Type "help" for help.
=> create table messages (id serial primary key, message text);
CREATE TABLE
=> insert into messages values (1, 'hello database');
INSERT 0 1
=> \q


