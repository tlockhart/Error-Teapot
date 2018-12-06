USE avant_db;

CREATE TABLE Users
(
	id int NOT NULL AUTO_INCREMENT,
	email varchar(150) NOT NULL,
    username varchar(100) NOT NULL,
    password varchar(100) NOT NULL,
	PRIMARY KEY (id)
);