CREATE SCHEMA IF NOT EXISTS bank;
-- CREATE SCHEMA IF NOT EXISTS banktest;

-- CREATE DATABASE IF NOT EXISTS bank;
-- CREATE DATABASE IF NOT EXISTS banktest;

USE bank;

CREATE TABLE IF NOT EXISTS `bank`.`customer` (
  `id` VARCHAR(100) NOT NULL,
  `emailAddress` VARCHAR(250) NOT NULL DEFAULT 0,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `firstName` VARCHAR(200) NOT NULL,
  `lastName` VARCHAR(200) NOT NULL,
  `middleName` VARCHAR(100) NULL,
  `address` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `bank`.`account` (
  `id` VARCHAR(100) NOT NULL,
  `balance` DOUBLE NOT NULL DEFAULT 0,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ownerId` VARCHAR(100) NOT NULL,
  `status` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `bank`.`transaction` (
  `id` VARCHAR(100) NOT NULL,
  `amount` DOUBLE NOT NULL DEFAULT 0,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `accountId` VARCHAR(100) NOT NULL,
  `status` INT NOT NULL,
  `channel` INT NOT NULL,
  `type` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE
) ENGINE=InnoDB;

ALTER TABLE `bank`.`account` 
ADD INDEX `ownerId_idx` (`ownerId` ASC) VISIBLE;

ALTER TABLE `bank`.`account` 
ADD CONSTRAINT `ownerId`
  FOREIGN KEY (`ownerId`)
  REFERENCES `bank`.`customer` (`id`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE `bank`.`transaction` 
ADD INDEX `accountId_idx` (`accountId` ASC) VISIBLE;

ALTER TABLE `bank`.`transaction` 
ADD CONSTRAINT `accountId`
  FOREIGN KEY (`accountId`)
  REFERENCES `bank`.`account` (`id`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;


-- Seed Database
INSERT INTO `bank`.`customer` (`id`, `emailAddress`, `firstName`, `lastName`, `middleName`, `address`) VALUES ("53878cbc-3ac8-4877-981d-0ae900228655", "WesDKincaid@jourrapide.com", "Wes", "Kincaid", "d", "Nil");
INSERT INTO `bank`.`customer` (`id`, `emailAddress`, `firstName`, `lastName`, `middleName`, `address`) VALUES ("bbc522ae-a8b6-4573-8b47-ba77d8be3cd1", "JosephSNichols@rhyta.com", "Joseph", "Nichols", "s", "Yaba");

INSERT INTO `bank`.`account` (`id`, `balance`, `ownerId`, `status`) VALUES ("2718c2bc-2ff5-48ef-be55-5e85f8e74d9d", 200000, "53878cbc-3ac8-4877-981d-0ae900228655", 1);
INSERT INTO `bank`.`account` (`id`, `balance`, `ownerId`, `status`) VALUES ("7da99933-4ee9-47cb-82dc-c2b8ee52a93b", 50000, "bbc522ae-a8b6-4573-8b47-ba77d8be3cd1", 0);
