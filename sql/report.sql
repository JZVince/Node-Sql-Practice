--

-- PostgreSQL database dump

--

SET statement_timeout = 0;

SET client_encoding = 'UTF8';

SET standard_conforming_strings = on;

SET check_function_bodies = false;

SET client_min_messages = warning;




SET search_path = public, pg_catalog;




SET default_tablespace = '';


CREATE TABLE IF NOT EXISTS courses (
  id int NOT NULL,
  cname varchar(100),
  teacher varchar(100),
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS marks (
  test_id varchar(100) NOT NULL,
  student_id varchar(100) NOT NULL,
  mark int NOT NULL,
  PRIMARY KEY (test_id, student_id)
);

CREATE TABLE IF NOT EXISTS students (
  id int NOT NULL,
  sname varchar(100),
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS tests (
  id int NOT NULL,
  course_id varchar(100) NOT NULL,
  sweight int NOT NULL,
  PRIMARY KEY (id)
);
