-- liquibase formatted sql

-- changeset guardiankiller:1
-- Added users table
create table user_info
(
    username          varchar(15)                    not null,
    email             varchar(20)                    not null,
    first_name        varchar(15)                    not null,
    last_name         varchar(20)                    not null,
    date_of_birth     date                           not null,
    gender            enum ('FEMALE','MALE','OTHER') not null,
    created_date_time datetime(6)                    not null,
    updated_date_time datetime(6)                    not null,
    primary key (username)
) engine = InnoDB;

-- changeset guardiankiller:2
-- Made username and email columns Unique
ALTER TABLE user_info ADD CONSTRAINT UNIQUE (username);
ALTER TABLE user_info ADD CONSTRAINT UNIQUE (email);

-- changeset jitzerttok51:3
-- Increase email length
ALTER TABLE user_info MODIFY email varchar(35);

-- changeset jitzerttok51:4
-- Add user hash password
ALTER TABLE user_info ADD COLUMN hash varchar(80);

