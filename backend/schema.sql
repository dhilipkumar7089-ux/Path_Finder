-- Path-Finder Database Schema

CREATE DATABASE IF NOT EXISTS path_finder;
USE path_finder;

-- Students table
CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  cutoff_mark DECIMAL(5,2) NOT NULL,
  category ENUM('OC', 'BC', 'BCM', 'MBC', 'SC', 'SCA', 'ST') NOT NULL,
  district VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Quiz questions table
CREATE TABLE IF NOT EXISTS quiz_questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question TEXT NOT NULL,
  domain ENUM('engineering', 'medical', 'commerce', 'arts') NOT NULL,
  option_a VARCHAR(255) NOT NULL,
  option_b VARCHAR(255) NOT NULL,
  option_c VARCHAR(255) NOT NULL,
  option_d VARCHAR(255) NOT NULL,
  correct_answer ENUM('A', 'B', 'C', 'D') NOT NULL
);

-- Quiz responses table
CREATE TABLE IF NOT EXISTS quiz_responses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  question_id INT NOT NULL,
  selected_answer ENUM('A', 'B', 'C', 'D') NOT NULL,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY (question_id) REFERENCES quiz_questions(id) ON DELETE CASCADE
);

-- Colleges table
CREATE TABLE IF NOT EXISTS colleges (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  district VARCHAR(50) NOT NULL,
  state VARCHAR(50) NOT NULL,
  description TEXT,
  infrastructure TEXT,
  website VARCHAR(255),
  image1 VARCHAR(255),
  image2 VARCHAR(255),
  image3 VARCHAR(255)
);

-- Courses table
CREATE TABLE IF NOT EXISTS courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  college_id INT NOT NULL,
  name VARCHAR(200) NOT NULL,
  domain ENUM('engineering', 'medical', 'commerce', 'arts') NOT NULL,
  duration VARCHAR(50) NOT NULL,
  description TEXT,
  FOREIGN KEY (college_id) REFERENCES colleges(id) ON DELETE CASCADE
);

-- Course cutoffs table
CREATE TABLE IF NOT EXISTS course_cutoffs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  course_id INT NOT NULL,
  category ENUM('OC', 'BC', 'BCM', 'MBC', 'SC', 'SCA', 'ST') NOT NULL,
  cutoff_mark DECIMAL(5,2) NOT NULL,
  seat_count INT NOT NULL,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- Bookmarks table
CREATE TABLE IF NOT EXISTS bookmarks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  college_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY (college_id) REFERENCES colleges(id) ON DELETE CASCADE,
  UNIQUE KEY unique_bookmark (student_id, college_id)
);

-- Career roadmaps table
CREATE TABLE IF NOT EXISTS career_roadmaps (
  id INT AUTO_INCREMENT PRIMARY KEY,
  course_id INT NOT NULL,
  step_number INT NOT NULL,
  step_title VARCHAR(200) NOT NULL,
  step_description TEXT NOT NULL,
  duration VARCHAR(100),
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);
