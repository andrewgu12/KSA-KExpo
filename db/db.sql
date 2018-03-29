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
INSERT INTO performance(name, approval, imageName) VALUES('first performance', 84, 'first_performance.jpg');
INSERT INTO performance(name, approval, imageName) VALUES('second performance', 34, 'second_performance.jpg');
INSERT INTO performance(name, approval, imageName) VALUES('third performance', 74, 'third_performance.jpg');
INSERT INTO performance(name, approval, imageName) VALUES('forth performance', 66, 'forth_performance.jpg');
INSERT INTO performance(name, approval, imageName) VALUES('5th performance', 52, '5th_performance.jpg');
INSERT INTO performance(name, approval, imageName) VALUES('6th performance', 88, '6th_performance.jpg');


-- Permissions data
INSERT INTO permissions(name, category, enabled) VALUES('create_user', 'l', true);
INSERT INTO permissions(name, category, enabled) VALUES('final_voting', 'fv', false);
INSERT INTO permissions(name, category, enabled) VALUES('first performance', 'p' ,false);
INSERT INTO permissions(name, category, enabled) VALUES('second performance', 'p' ,false);
INSERT INTO permissions(name, category, enabled) VALUES('third performance', 'p' ,false);
INSERT INTO permissions(name, category, enabled) VALUES('forth performance', 'p' ,false);
INSERT INTO permissions(name, category, enabled) VALUES('5th performance', 'p' ,false);
INSERT INTO permissions(name, category, enabled) VALUES('6th performance', 'p' ,false);
