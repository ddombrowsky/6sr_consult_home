BEGIN TRANSACTION;
create table jobs (id integer primary key asc, desc string);
INSERT INTO jobs VALUES(1,'job a');
INSERT INTO jobs VALUES(2,'job b');
COMMIT;
