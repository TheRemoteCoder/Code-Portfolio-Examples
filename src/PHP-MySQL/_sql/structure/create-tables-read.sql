-- DEV env
-- USE example_db;


-- -----------------------------------------------------------------------------------------------------------------------------------------

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
SET FOREIGN_KEY_CHECKS = 1;

START TRANSACTION;

SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;


-- --------------------------------------------------------------------------------------------------------------------------------- Content

-- ENUM
DROP TABLE IF EXISTS `example_1`;
CREATE TABLE `example_1` (
  `id` SERIAL,
  `category` ENUM ("A", "B") NOT NULL,
  `title` TINYTEXT NOT NULL,
  `name` VARCHAR(128) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- FOREIGN KEYS
DROP TABLE IF EXISTS `example_2`;
CREATE TABLE `example_2` (
  `id` SERIAL,
  `id_a` BIGINT UNSIGNED NOT NULL,
  `is_special` TINYINT NOT NULL,
  `time_from` TIME,
  `time_to` TIME,
  `description` TEXT NOT NULL,
  UNIQUE(id_a, is_special, time_from, time_to),
  FOREIGN KEY (`id_a`) REFERENCES example_999(`id`),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- CONSTRAINTS
DROP TABLE IF EXISTS `example_3`;
CREATE TABLE `example_3` (
  `id` SERIAL,
  `id_a` BIGINT UNSIGNED NOT NULL,
  `is_a` TINYINT NOT NULL,
  `is_b` TINYINT NOT NULL,
  `name` TINYTEXT NOT NULL,
  CONSTRAINT constraint_states CHECK (
    (is_a=1 AND is_b=0) OR
    (is_a=0 AND is_b IN(0, 1))
  ),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- -----------------------------------------------------------------------------------------------------------------------------------------

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

COMMIT;
