DROP DATABASE IF EXISTS ksakexpo;
CREATE DATABASE ksakexpo;

\c ksakexpo;

CREATE TABLE performance (
  id serial PRIMARY KEY,
  name VARCHAR,
  approval DECIMAL
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
  enabled BOOLEAN
);

-- Uncomment if need seed data
INSERT INTO performance(name, approval) VALUES('first performance', 84);
INSERT INTO performance(name, approval) VALUES('second performance', 34);
INSERT INTO performance(name, approval) VALUES('third performance', 74);
INSERT INTO performance(name, approval) VALUES('forth performance', 66);
INSERT INTO performance(name, approval) VALUES('5th performance', 52);
INSERT INTO performance(name, approval) VALUES('6th performance', 88);

-- Permissions data
INSERT INTO permissions(name, enabled) VALUES('create_user', true);
INSERT INTO permissions(name, enabled) VALUES('final_voting', false);
