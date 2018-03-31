DROP DATABASE IF EXISTS ksakexpo;
CREATE DATABASE ksakexpo;

\c ksakexpo;

CREATE TABLE performance (
  id serial PRIMARY KEY,
  name VARCHAR,
  approval DECIMAL,
  imageName VARCHAR
);

CREATE TABLE member (
  id serial PRIMARY KEY,
  admin BOOLEAN,
  username VARCHAR,
  performances BOOLEAN []
);

CREATE TABLE finalPerformance (
  id serial PRIMARY KEY,
  name VARCHAR,
  approval DECIMAL
);

CREATE TABLE permissions (
  id serial PRIMARY KEY,
  name VARCHAR,
  category VARCHAR,
  enabled BOOLEAN
);

-- Uncomment if need seed data
INSERT INTO performance(name, approval, imageName) VALUES('Rachel, Nathan, & Matt', 0, 'Rachel_Nathan_Matt.png');
INSERT INTO performance(name, approval, imageName) VALUES('GGWB', 0, 'GGWB.jpg');
INSERT INTO performance(name, approval, imageName) VALUES('IAM', 0, 'iam.jpg');
INSERT INTO performance(name, approval, imageName) VALUES('The Uptown Boys', 0, 'the_uptown_boys.jpg');
INSERT INTO performance(name, approval, imageName) VALUES('Rachel & Terry', 0, 'Rachel_Terry.png');
INSERT INTO performance(name, approval, imageName) VALUES('Chung Le', 0, 'Chung_Le.png');


-- Permissions data
INSERT INTO permissions(name, category, enabled) VALUES('create_user', 'l', true);
INSERT INTO permissions(name, category, enabled) VALUES('final_voting', 'fv', false);
INSERT INTO permissions(name, category, enabled) VALUES('Rachel, Nathan, & Matt', 'p' ,false);
INSERT INTO permissions(name, category, enabled) VALUES('GGWB', 'p' ,false);
INSERT INTO permissions(name, category, enabled) VALUES('IAM', 'p' ,false);
INSERT INTO permissions(name, category, enabled) VALUES('The Uptown Boys', 'p' ,false);
INSERT INTO permissions(name, category, enabled) VALUES('Rachel & Terry', 'p' ,false);
INSERT INTO permissions(name, category, enabled) VALUES('Chung Le', 'p' ,false);
