-- liquibase formatted sql

-- changeset francoisdagostini:1653881240171-1
CREATE TABLE tasks (id int IDENTITY (1, 1) NOT NULL, complete bit CONSTRAINT DF__tasks__complete__4BAC3F29 DEFAULT 'false', title varchar(200) NOT NULL, CONSTRAINT PK__tasks__3213E83F864C9722 PRIMARY KEY (id));

