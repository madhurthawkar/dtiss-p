/* ================================
   DATABASE SETUP FOR MOVIE REVIEWS
   ================================ */

-- 1️⃣ Create database
CREATE DATABASE IF NOT EXISTS movie_reviews;
USE movie_reviews;

-- =====================
-- 2️⃣ USERS TABLE
-- =====================
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(20),
  last_name VARCHAR(20),
  email VARCHAR(50) UNIQUE,
  password VARCHAR(100),
  mobile VARCHAR(10),
  birth DATE
);

-- =====================
-- 3️⃣ MOVIES TABLE
-- =====================
CREATE TABLE movies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  release_date DATE
);

-- =====================
-- 4️⃣ REVIEWS TABLE
-- =====================
CREATE TABLE reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  movie_id INT,
  review VARCHAR(100),
  rating INT,
  user_id INT,
  modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP
           ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT reviews_ibfk_1 FOREIGN KEY (movie_id)
    REFERENCES movies(id),
  CONSTRAINT reviews_ibfk_2 FOREIGN KEY (user_id)
    REFERENCES users(id)
);

-- =====================
-- 5️⃣ SHARES TABLE
-- =====================
CREATE TABLE shares (
  review_id INT,
  user_id INT,
  CONSTRAINT shares_ibfk_1 FOREIGN KEY (review_id)
    REFERENCES reviews(id),
  CONSTRAINT shares_ibfk_2 FOREIGN KEY (user_id)
    REFERENCES users(id),
  UNIQUE (review_id, user_id)
);

-- =====================
-- 6️⃣ INSERT USERS
-- Password for all users: password123
-- SHA256 hash
-- =====================
INSERT INTO users (first_name, last_name, email, password, mobile, birth) VALUES
('Ninad', 'Deshmukh', 'ninad@gmail.com',
 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f',
 '9876543210', '2000-05-14'),

('Sanket', 'Raut', 'sanket@gmail.com',
 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f',
 '9123456780', '1999-08-22'),

('Swaraj', 'Raut', 'swaraj@gmail.com',
 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f',
 '9988776655', '2001-01-10'),

('Amit', 'Kulkarni', 'amit@gmail.com',
 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f',
 '9090909090', '1998-11-03'),

('Priya', 'Sharma', 'priya@gmail.com',
 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f',
 '9012345678', '2000-02-18');

-- =====================
-- 7️⃣ INSERT MOVIES
-- =====================
INSERT INTO movies (title, release_date) VALUES
('The Shawshank Redemption', '1994-09-23'),
('The Godfather', '1972-03-24'),
('The Dark Knight', '2008-07-18'),
('Pulp Fiction', '1994-10-14'),
('Forrest Gump', '1994-07-06'),
('Inception', '2010-07-16'),
('Fight Club', '1999-10-15'),
('The Matrix', '1999-03-31'),
('Interstellar', '2014-11-07'),
('The Lord of the Rings: The Fellowship of the Ring', '2001-12-19'),
('The Lord of the Rings: The Two Towers', '2002-12-18'),
('The Lord of the Rings: The Return of the King', '2003-12-17'),
('Gladiator', '2000-05-05'),
('Titanic', '1997-12-19'),
('Jurassic Park', '1993-06-11'),
('The Avengers', '2012-05-04'),
('Avengers: Infinity War', '2018-04-27'),
('Avengers: Endgame', '2019-04-26'),
('Iron Man', '2008-05-02'),
('Mission: Impossible', '1996-05-22'),
('Mission: Impossible – Fallout', '2018-07-27'),
('The Social Network', '2010-10-01'),
('Parasite', '2019-05-30'),
('Joker', '2019-10-04'),
('Oppenheimer', '2023-07-21');

-- =====================
-- 8️⃣ INSERT REVIEWS
-- =====================
INSERT INTO reviews (movie_id, review, rating, user_id) VALUES
(14, 'A timeless romantic classic with stunning visuals.', 9, 1),
(6, 'Mind bending concept with brilliant execution.', 9, 1),
(25, 'Powerful storytelling and exceptional performances.', 8, 1),

(3, 'The best superhero movie ever made.', 10, 2),
(8, 'Changed the way I look at reality.', 9, 2),

(1, 'Inspirational and emotionally powerful.', 10, 3),
(5, 'Pure feel good cinema with unforgettable moments.', 9, 3),

(10, 'An epic fantasy adventure, beautifully crafted.', 9, 4),
(12, 'The perfect conclusion to a legendary trilogy.', 10, 4),

(24, 'Dark, disturbing, and brilliantly acted.', 9, 5),
(16, 'An entertaining superhero team-up.', 8, 5);

-- =====================
-- 9️⃣ INSERT SHARES
-- =====================
INSERT INTO shares (review_id, user_id) VALUES
(1, 2),
(1, 5),
(4, 1),
(6, 1),
(6, 4),
(9, 5),
(10, 1),
(10, 3);
