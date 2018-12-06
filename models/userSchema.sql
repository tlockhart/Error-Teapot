USE avant_db;

DROP TABLE IF EXISTS Users;

CREATE TABLE Users
(
	id int NOT NULL AUTO_INCREMENT,
	email varchar(150) NOT NULL UNIQUE,
    username varchar(100) NOT NULL UNIQUE,
    password varchar(100) NOT NULL,
	PRIMARY KEY (id)
);