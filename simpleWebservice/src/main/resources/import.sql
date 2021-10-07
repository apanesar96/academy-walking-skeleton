alter table example_user drop column id;
ALTER TABLE example_user ADD COLUMN id SERIAL PRIMARY KEY;
INSERT INTO example_user VALUES (30, to_date('1980/05/21', 'yyyy/MM/dd' ), 'Micheal Jackson');
INSERT INTO example_user VALUES (30, to_date('1980/05/21', 'yyyy/MM/dd' ), 'Micheal Jackson');
INSERT INTO example_user VALUES (30, to_date('1980/05/21', 'yyyy/MM/dd' ), 'Micheal Jackson');