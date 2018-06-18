-- This isn't used anymore and not accurate - kept around for reference
-- clear tables if they exist
DROP TABLE IF EXISTS performances;
DROP TABLE IF EXISTS audience;
-- create new tables
CREATE TABLE performances (
  id serial PRIMARY KEY,
  name VARCHAR,
  votes INTEGER,
  imageName VARCHAR
);
CREATE TABLE audience (
  id serial PRIMARY KEY,
  admin BOOLEAN,
  username VARCHAR,
  performances VARCHAR
)
-- finish table initialization and feed into Postgres
