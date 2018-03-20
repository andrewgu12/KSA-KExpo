DROP DATABASE IF EXISTS ksakexpo;
CREATE DATABASE ksakexpo;

\c ksakexpo;

CREATE TABLE performance (
  id serial PRIMARY KEY,
  name VARCHAR,
  approval DECIMAL,
  enabled BOOLEAN
);

CREATE TABLE member (
  id serial PRIMARY KEY,
  admin BOOLEAN,
  username VARCHAR,
  performances BOOLEAN []
);
