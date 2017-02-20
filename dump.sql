BEGIN TRANSACTION;
create table jobs (id integer primary key asc, name string, title string);
INSERT INTO jobs VALUES(1,'Paylock IPT LLC', 'Integrations Software Engineer');
INSERT INTO jobs VALUES(2,'Red Lion Controlls', 'Embedded Systems Developer');
COMMIT;
