-- Disable checks
SET FOREIGN_KEY_CHECKS = 0;

-- ------------------------------------------------------
-- Table structure and data for table `users`
-- ------------------------------------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`
(
    id                   BIGINT AUTO_INCREMENT PRIMARY KEY,
    codice_fiscale       VARCHAR(16)  NOT NULL,
    nome                 VARCHAR(50)  NOT NULL,
    cognome              VARCHAR(50)  NOT NULL,
    email                VARCHAR(255) NOT NULL,
    pec                  VARCHAR(255) NULL,
    partita_iva          VARCHAR(11)  NULL,
    ruolo_aziendale      VARCHAR(100) NULL,
    stato_accreditamento VARCHAR(50)  NOT NULL,
    signup_date          DATETIME(6)  NULL,
    role                 VARCHAR(50)  NULL,
    is_active            BOOLEAN      NOT NULL DEFAULT TRUE,

    -- Unique Indexes
    CONSTRAINT idx_users_codice_fiscale UNIQUE (codice_fiscale),
    CONSTRAINT idx_users_email UNIQUE (email),

    -- Format Check Constraints
    CONSTRAINT chk_codice_fiscale_format
        CHECK (codice_fiscale REGEXP '^[A-Za-z]{6}[0-9]{2}[A-Za-z]{1}[0-9]{2}[A-Za-z]{1}[0-9]{3}[A-Za-z]{1}$'),
    CONSTRAINT chk_partita_iva
        CHECK (partita_iva IS NULL OR partita_iva REGEXP '^[0-9]{11}$'),
    CONSTRAINT chk_pec_format
        CHECK (pec IS NULL OR pec REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

-- ------------------------------------------------------
-- Table structure and data for table `state`
-- ------------------------------------------------------
DROP TABLE IF EXISTS `state`;
CREATE TABLE `state`
(
    `id`         bigint(20) NOT NULL AUTO_INCREMENT,
    `state_name` varchar(55) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

-- ------------------------------------------------------
-- Table structure and data for table `service_type`
-- ------------------------------------------------------
DROP TABLE IF EXISTS `service_type`;
CREATE TABLE `service_type`
(
    `id`          bigint(20)   NOT NULL AUTO_INCREMENT,
    `name`        varchar(255) NOT NULL,
    `description` text DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

-- ------------------------------------------------------
-- Table structure and data for table `service`
-- ------------------------------------------------------
DROP TABLE IF EXISTS `service`;
CREATE TABLE `service`
(
    `id`              bigint(20)   NOT NULL AUTO_INCREMENT,
    `service_type_id` bigint(20)   NOT NULL,
    `name`            varchar(255) NOT NULL,
    `is_base`         tinyint(1)   NOT NULL DEFAULT 0,
    `is_optional`     tinyint(1)   NOT NULL DEFAULT 0,
    `created_at`      timestamp    NOT NULL DEFAULT current_timestamp(),
    `updated_at`      timestamp    NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    PRIMARY KEY (`id`),
    KEY `fk_service_service_type` (`service_type_id`),
    CONSTRAINT `fk_service_service_type` FOREIGN KEY (`service_type_id`) REFERENCES `service_type` (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

-- ------------------------------------------------------
-- Table structure and data for table `param`
-- ------------------------------------------------------
DROP TABLE IF EXISTS `param`;
CREATE TABLE `param`
(
    `id`            bigint(20)   NOT NULL AUTO_INCREMENT,
    `service_id`    bigint(20)   NOT NULL,
    `name`          varchar(255) NOT NULL,
    `param_type`    varchar(100) NOT NULL,
    `min_value`     int(11)               DEFAULT NULL,
    `max_value`     int(11)               DEFAULT NULL,
    `is_required`   tinyint(1)   NOT NULL DEFAULT 0,
    `default_value` varchar(255)          DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `fk_param_service` (`service_id`),
    CONSTRAINT `fk_param_service` FOREIGN KEY (`service_id`) REFERENCES `service` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

-- ------------------------------------------------------
-- Table structure and data for table `inner_param`
-- ------------------------------------------------------
DROP TABLE IF EXISTS `inner_param`;
CREATE TABLE `inner_param`
(
    `id`        bigint(20)   NOT NULL AUTO_INCREMENT,
    `name`      varchar(255) NOT NULL,
    `param_id`  bigint(20)   NOT NULL,
    `parent_id` bigint(20) DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `fk_inner_param_param` (`param_id`),
    KEY `fk_inner_param_parent` (`parent_id`),
    CONSTRAINT `fk_inner_param_param` FOREIGN KEY (`param_id`) REFERENCES `param` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `fk_inner_param_parent` FOREIGN KEY (`parent_id`) REFERENCES `inner_param` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

-- ------------------------------------------------------
-- Table structure and data for table `project`
-- ------------------------------------------------------
DROP TABLE IF EXISTS `project`;
CREATE TABLE `project`
(
    `id`               bigint(20)   NOT NULL AUTO_INCREMENT,
    `name`             varchar(255) NOT NULL,
    `destination_link` varchar(500)          DEFAULT NULL,
    `description`      text                  DEFAULT NULL,
    `created_at`       timestamp    NOT NULL DEFAULT current_timestamp(),
    `updated_at`       timestamp    NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    `created_by`       BIGINT       NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_project_created_by` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

-- ------------------------------------------------------
-- Table structure and data for table `project_service`
-- ------------------------------------------------------
DROP TABLE IF EXISTS `project_service`;
CREATE TABLE `project_service`
(
    `project_id` bigint(20) NOT NULL,
    `service_id` bigint(20) NOT NULL,
    PRIMARY KEY (`project_id`, `service_id`),
    KEY `fk_project_service_service` (`service_id`),
    CONSTRAINT `fk_project_service_project` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `fk_project_service_service` FOREIGN KEY (`service_id`) REFERENCES `service` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

-- ------------------------------------------------------
-- Table structure and data for table `request`
-- ------------------------------------------------------
DROP TABLE IF EXISTS `request`;
CREATE TABLE `request`
(
    `request_id`       varchar(55) NOT NULL,
    `send_from`        timestamp   NOT NULL           DEFAULT current_timestamp(),
    `send_to`          timestamp   NOT NULL           DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    `created_at`       timestamp   NOT NULL           DEFAULT current_timestamp(),
    `updated_at`       timestamp   NOT NULL           DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    `project_id`       bigint(20)  NOT NULL,
    `request_state_id` bigint(20)  NOT NULL,
    `note`             text                           DEFAULT NULL,
    `request_payload`  longtext DEFAULT NULL,
    PRIMARY KEY (`request_id`),
    KEY `fk_request_project` (`project_id`),
    KEY `fk_request_state` (`request_state_id`),
    CONSTRAINT `fk_request_project` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `fk_request_state` FOREIGN KEY (`request_state_id`) REFERENCES `state` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

-- ------------------------------------------------------
-- Table structure and data for table `request_service`
-- ------------------------------------------------------
DROP TABLE IF EXISTS `request_service`;
CREATE TABLE `request_service`
(
    `id`         bigint(20)   NOT NULL AUTO_INCREMENT,
    `request_id` varchar(100) NOT NULL,
    `service_id` bigint(20)   NOT NULL,
    PRIMARY KEY (`id`),
    KEY `idx_request_service_request_id` (`request_id`),
    KEY `idx_request_service_service_id` (`service_id`),
    CONSTRAINT `fk_request_service_request` FOREIGN KEY (`request_id`) REFERENCES `request` (`request_id`),
    CONSTRAINT `fk_request_service_service` FOREIGN KEY (`service_id`) REFERENCES `service` (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

-- ------------------------------------------------------
-- Table structure and data for table `request_service_param`
-- ------------------------------------------------------
DROP TABLE IF EXISTS `request_service_param`;
CREATE TABLE `request_service_param`
(
    `id`                 bigint(20) NOT NULL AUTO_INCREMENT,
    `request_service_id` bigint(20) NOT NULL,
    `param_id`           bigint(20) NOT NULL,
    `created_at`         timestamp  NOT NULL DEFAULT current_timestamp(),
    `updated_at`         timestamp  NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    PRIMARY KEY (`id`),
    KEY `fk_request_service_param_request_service` (`request_service_id`),
    KEY `fk_request_service_param_param` (`param_id`),
    CONSTRAINT `fk_request_service_param_param` FOREIGN KEY (`param_id`) REFERENCES `param` (`id`),
    CONSTRAINT `fk_request_service_param_request_service` FOREIGN KEY (`request_service_id`) REFERENCES `request_service` (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

-- ------------------------------------------------------
-- Table structure and data for table `ticket_state`
-- ------------------------------------------------------
DROP TABLE IF EXISTS `ticket_state`;
CREATE TABLE `ticket_state`
(
    `id`         bigint(20)   NOT NULL AUTO_INCREMENT,
    `state_name` varchar(100) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

-- ------------------------------------------------------
-- Table structure and data for table `ticket`
-- ------------------------------------------------------
DROP TABLE IF EXISTS `ticket`;
CREATE TABLE `ticket`
(
    `id`           bigint(20)  NOT NULL AUTO_INCREMENT,
    `code`         varchar(50) NOT NULL,
    `state_id`     bigint(20)  NOT NULL,
    `category`     varchar(255) DEFAULT NULL,
    `subcategory`  varchar(255) DEFAULT NULL,
    `opening_date` date         DEFAULT NULL,
    `applicant`    varchar(255) DEFAULT NULL,
    `created_at`   datetime    NOT NULL,
    `updated_at`   datetime     DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `code` (`code`),
    KEY `fk_ticket_state` (`state_id`),
    CONSTRAINT `fk_ticket_state` FOREIGN KEY (`state_id`) REFERENCES `ticket_state` (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

-- ------------------------------------------------------
-- Table structure and data for table `delegations`
-- ------------------------------------------------------
DROP TABLE IF EXISTS `delegations`;
CREATE TABLE `delegations`
(
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    delegation_date DATETIME(6)                    NULL,
    delegation_type VARCHAR(50)                    NOT NULL,
    status          VARCHAR(50) DEFAULT 'INATTIVA' NOT NULL,
    user_id         BIGINT                         NOT NULL,
    delegated_by    BIGINT                         NOT NULL,

    -- Foreign Keys
    CONSTRAINT fk_delegates_user
        FOREIGN KEY (user_id) REFERENCES users (id)
            ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_delegates_delegated_by
        FOREIGN KEY (delegated_by) REFERENCES users (id)
            ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

-- ------------------------------------------------------
-- Table structure and data for table `project_delegations`
-- ------------------------------------------------------
DROP TABLE IF EXISTS `project_delegations`;
CREATE TABLE `project_delegations`
(
    `delegation_id` BIGINT NOT NULL,
    `project_id`    BIGINT NOT NULL,
    PRIMARY KEY (`delegation_id`, `project_id`),
    CONSTRAINT `fk_project_delegations_delegation`
        FOREIGN KEY (`delegation_id`) REFERENCES `delegations` (`id`)
            ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `fk_project_delegations_project`
        FOREIGN KEY (`project_id`) REFERENCES `project` (`id`)
            ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

-- Re-enable checks
SET FOREIGN_KEY_CHECKS = 1;