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
ALTER TABLE user_info
    ADD CONSTRAINT UNIQUE (username);
ALTER TABLE user_info
    ADD CONSTRAINT UNIQUE (email);

-- changeset jitzerttok51:3
-- Increase email length
ALTER TABLE user_info
    MODIFY email varchar(35);

-- changeset jitzerttok51:4
-- Add user hash password
ALTER TABLE user_info
    ADD COLUMN hash varchar(80);

-- changeset guardiankiller:5
-- Added user_images table
create table user_images
(
    id                int                                        not null AUTO_INCREMENT,
    file_name         varchar(255)                               not null,
    checksum          varchar(255)                               not null,
    file_size         bigint(19)                                 not null,
    visibility        enum ('PUBLIC', 'FRIENDS_ONLY', 'ME_ONLY') not null,
    username          varchar(15)                                not null,
    created_date_time datetime(6)                                not null,
    updated_date_time datetime(6)                                not null,
    primary key (id),
    FOREIGN KEY (username) REFERENCES user_info (username)
) engine = InnoDB;

-- changeset guardiankiller:6
-- Added comment column to user_images table
ALTER TABLE user_images
    ADD COLUMN comment varchar(255);

-- changeset guardiankiller:7
-- Added profile_image column to user_images table
ALTER TABLE user_images
    ADD COLUMN profile_image BOOLEAN;

-- changeset guardiankiller:8
-- Added new enum value
ALTER TABLE user_images
    MODIFY COLUMN visibility enum ('PUBLIC', 'FRIENDS_ONLY', 'ME_ONLY', 'CURRENT_PROFILE_IMAGE') not null;
