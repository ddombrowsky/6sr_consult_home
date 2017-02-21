BEGIN TRANSACTION;
create table jobs (id integer primary key asc, name string, title string, ord integer);
INSERT INTO jobs VALUES(1,'Paylock IPT LLC', 'Integrations Software Engineer', 10);
INSERT INTO jobs VALUES(2,'Red Lion Controls', 'Embedded Systems Developer', 20);
COMMIT;
