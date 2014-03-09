/*
 * Some basic files
 */

CREATE DATABASE schnippets;

USE schnippets;

CREATE TABLE USERS(
  id      INT AUTO_INCREMENT ,
  name    VARCHAR(100),
  email   VARCHAR(100),
  primary key (id)
) ENGINE = InnoDB;

CREATE TABLE SCHNIPPETS(
  id         INT AUTO_INCREMENT ,
  dte        TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
  content    MEDIUMTEXT,
  user_id    INT REFERENCES USERS(id),
  PRIMARY KEY (id)
) ENGINE = InnoDB;

CREATE TABLE FOLLOW_USERS(
  user_id         INT REFERENCES USERS(id),
  follow_id       INT REFERENCES USERS(id),
  PRIMARY KEY(user_id, follow_id)
) ENGINE = InnoDB;

CREATE TABLE FOLLOW_TAGS(
  user_id        INT REFERENCES USERS(id),
  tag            VARCHAR(100),
  PRIMARY KEY(user_id, tag)
) ENGINE = InnoDB;
