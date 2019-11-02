CREATE DATABASE IF NOT EXISTS `schoolDB`;
USE `schoolDB`;

CREATE TABLE IF NOT EXISTS `courses` (
  `id` int NOT NULL,
  `name` varchar(100),
  `teacher` varchar(100),
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `marks` (
  `test_id` int NOT NULL,
  `student_id` int NOT NULL,
  `mark` int,
  PRIMARY KEY (`test_id`, `student_id`)
);

CREATE TABLE IF NOT EXISTS `students` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `tests` (
  `id` int NOT NULL,
  `course_id` int NOT NULL,
  `weight` int NOT NULL,
  PRIMARY KEY (`id`)
);
