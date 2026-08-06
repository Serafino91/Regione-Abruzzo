-- Disable foreign key checks for clean execution
SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS;
SET FOREIGN_KEY_CHECKS = 0;
SET @OLD_UNIQUE_CHECKS = @@UNIQUE_CHECKS;
SET UNIQUE_CHECKS = 0;

-- ------------------------------------------------------
-- Table structure and data for table `users`
-- ------------------------------------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE 'users'
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

    -- Simple Case-Insensitive Check Constraints
    CONSTRAINT chk_codice_fiscale_format
        CHECK (codice_fiscale REGEXP '^[A-Za-z]{6}[0-9]{2}[A-Za-z]{1}[0-9]{2}[A-Za-z]{1}[0-9]{3}[A-Za-z]{1}$'),
    CONSTRAINT chk_partita_iva
        CHECK (partita_iva IS NULL OR partita_iva REGEXP '^[0-9]{11}$'),
    CONSTRAINT chk_pec_format
        CHECK (pec IS NULL OR pec REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

INSERT INTO users (codice_fiscale, email, stato_accreditamento, signup_date, `role`, is_active, nome,
                                   cognome, pec, partita_iva, ruolo_aziendale)
VALUES ('RSSMRA80A01H501U', 'mario.rossi@example.com', 'APPROVATO', '2026-07-01 12:49:16.000000', 'ROLE_USER', 1,
        'Mario', 'Rossi', 'mario.pec@poste.it', '10482937108', 'Direttore Esecutivo'),
       ('BNCGNN75T10L219Z', 'giovanni.bianchi@accenture.com', 'APPROVATO', '2026-07-01 12:49:16.000000', 'ROLE_USER', 1,
        'Giovanni', 'Bianchi', 'givanni.pec@ramail.it', '05739124831', 'Manager'),
       ('GDSGDS89G10C789U', 'gianluca.verdi@gmai.com', 'IN_ATTESA', '2026-07-23 12:49:16.000000', 'ROLE_USER', 1,
        'GIanluca', 'Verdi', 'gianburrasca@ra2go.com', '09124835674', 'Responsabile'),
       ('GDSGLC86G30C786N', 'gianluca@testing.it', 'APPROVATO', '2026-07-23 12:49:16.000000', 'ROLE_ADMIN', 1,
        'Gianluca', 'Tester', 'gian@accenture.com', '03847291052', 'Amministratore');

-- ------------------------------------------------------
-- Table structure and data for table `state`
-- ------------------------------------------------------
DROP TABLE IF EXISTS `state`;
CREATE TABLE `state` (
 `id` bigint(20) NOT NULL AUTO_INCREMENT,
 `state_name` varchar(55) DEFAULT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `state` VALUES
(1,'In elaborazione'),
(2,'In valutazione'),
(3,'Rifiutata'),
(4,'Completata'),
(5,'Incompleta'),
(6,'Inviate');

-- ------------------------------------------------------
-- Table structure and data for table `service_type`
-- ------------------------------------------------------
DROP TABLE IF EXISTS `service_type`;
CREATE TABLE `service_type` (
 `id` bigint(20) NOT NULL AUTO_INCREMENT,
 `name` varchar(255) NOT NULL,
 `description` text DEFAULT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `service_type` VALUES
(1,'IaaS standard','Servizi IaaS standard'),
(2,'IaaS standard - Storage','Storage aggiuntivo per servizi IaaS standard'),
(3,'IaaS (HA)','Servizi IaaS in alta affidabilità'),
(4,'IaaS (HA) - Storage','Storage aggiuntivo per servizi IaaS in alta affidabilità'),
(5,'Sistemi operativi','Licenze sistemi operativi'),
(6,'Pubblicazione su Internet del servizio informatico','Servizio di pubblicazione su internet');

-- ------------------------------------------------------
-- Table structure and data for table `service`
-- ------------------------------------------------------
DROP TABLE IF EXISTS `service`;
CREATE TABLE `service` (
 `id` bigint(20) NOT NULL AUTO_INCREMENT,
 `service_type_id` int(11) NOT NULL,
 `name` varchar(255) NOT NULL,
 `is_base` tinyint(1) NOT NULL DEFAULT 0,
 `is_optional` tinyint(1) NOT NULL DEFAULT 0,
 `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
 `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
 PRIMARY KEY (`id`),
 KEY `fk_service_service_type` (`service_type_id`),
 CONSTRAINT `fk_service_service_type` FOREIGN KEY (`service_type_id`) REFERENCES `service_type` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `service` VALUES
(1,1,'VM Small',1,0,'2026-06-22 15:45:00','2026-06-22 15:45:00'),
(2,1,'VM Medium',1,0,'2026-06-22 15:45:00','2026-06-22 15:45:00'),
(3,1,'VM Large',1,0,'2026-06-22 15:45:00','2026-06-22 15:45:00'),
(4,2,'Storage Standard Performance',0,1,'2026-06-22 15:45:00','2026-06-22 15:45:00'),
(5,3,'VM Small',1,0,'2026-06-22 15:45:00','2026-06-22 15:45:00'),
(6,3,'VM Medium',1,0,'2026-06-22 15:45:00','2026-06-22 15:45:00'),
(7,3,'VM Large',1,0,'2026-06-22 15:45:00','2026-06-22 15:45:00'),
(8,4,'Storage Standard Performance',0,1,'2026-06-22 15:45:00','2026-06-22 15:45:00'),
(9,5,'Windows Server STD CORE (2 core)',1,0,'2026-06-22 15:45:00','2026-06-22 15:45:00'),
(10,5,'Red Hat per VM',1,0,'2026-06-22 15:45:00','2026-06-22 15:45:00'),
(11,6,'Pubblicazione su internet del servizio informatico',0,1,'2026-06-22 15:45:00','2026-06-22 15:45:00');

-- ------------------------------------------------------
-- Table structure and data for table `param`
-- ------------------------------------------------------
DROP TABLE IF EXISTS `param`;
CREATE TABLE `param` (
 `id` bigint(20) NOT NULL AUTO_INCREMENT,
 `service_id` bigint(20) NOT NULL,
 `name` varchar(255) NOT NULL,
 `param_type` varchar(100) NOT NULL,
 `min_value` int(11) DEFAULT NULL,
 `max_value` int(11) DEFAULT NULL,
 `is_required` tinyint(1) NOT NULL DEFAULT 0,
 `default_value` varchar(255) DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `fk_param_service` (`service_id`),
CONSTRAINT `fk_param_service` FOREIGN KEY (`service_id`) REFERENCES `service` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `param` VALUES
(1,1,'vcpu','integer',1,NULL,1,NULL),
(2,1,'vramGb','integer',4,NULL,1,NULL),
(3,1,'storageGb','integer',100,NULL,1,NULL),
(4,2,'vcpu','integer',4,NULL,1,NULL),
(5,2,'vramGb','integer',8,NULL,1,NULL),
(6,2,'storageGb','integer',200,NULL,1,NULL),
(7,3,'vcpu','integer',8,NULL,1,NULL),
(8,3,'vramGb','integer',16,NULL,1,NULL),
(9,3,'storageGb','integer',250,NULL,1,NULL),
(10,4,'storageGb','integer',100,NULL,1,NULL),
(11,5,'vcpu','integer',1,NULL,1,NULL),
(12,5,'vramGb','integer',4,NULL,1,NULL),
(13,5,'storageGb','integer',100,NULL,1,NULL),
(14,6,'vcpu','integer',4,NULL,1,NULL),
(15,6,'vramGb','integer',8,NULL,1,NULL),
(16,6,'storageGb','integer',200,NULL,1,NULL),
(17,7,'vcpu','integer',8,NULL,1,NULL),
(18,7,'vramGb','integer',16,NULL,1,NULL),
(19,7,'storageGb','integer',250,NULL,1,NULL),
(20,8,'storageGb','integer',100,NULL,1,NULL);

-- ------------------------------------------------------
-- Table structure and data for table `inner_param`
-- ------------------------------------------------------
DROP TABLE IF EXISTS `inner_param`;
CREATE TABLE `inner_param` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`name` varchar(255) NOT NULL,
`param_id` bigint(20) NOT NULL,
`parent_id` bigint(20) DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `fk_inner_param_param` (`param_id`),
KEY `fk_inner_param_parent` (`parent_id`),
CONSTRAINT `fk_inner_param_param` FOREIGN KEY (`param_id`) REFERENCES `param` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT `fk_inner_param_parent` FOREIGN KEY (`parent_id`) REFERENCES `inner_param` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ------------------------------------------------------
-- Table structure and data for table `project`
-- ------------------------------------------------------
DROP TABLE IF EXISTS `project`;
CREATE TABLE `project` (
`id` bigint(20) NOT NULL AUTO_INCREMENT,
`name` varchar(255) NOT NULL,
`destination_link` varchar(500) DEFAULT NULL,
`description` text DEFAULT NULL,
`created_at` timestamp NOT NULL DEFAULT current_timestamp(),
`updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
`created_by` BIGINT NOT NULL,

CONSTRAINT `fk_project_created_by`
    FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
        ON DELETE RESTRICT ON UPDATE CASCADE,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `project` (
    `id`,
    `name`,
    `destination_link`,
    `description`,
    `created_at`,
    `updated_at`,
    `created_by`
) VALUES
(1, 'Progetto Artigiani', 'ArtigianiAbruzzo.it', 'Progetti artigianato locale', '2026-06-17 11:06:18.000000', '2026-07-17 10:24:08.000000', 1),
(2, 'Link 2 Abruzzo', 'Link2Abruzzo.it', 'Abruzzo info', '2026-06-17 11:06:18.000000', '2026-07-17 10:24:08.000000', 1),
(3, 'Abruzzo Trek Mountains', 'ABMountains.it', 'Esplora le altezze Abruzzesi', '2026-06-17 11:06:18.000000', '2026-07-17 10:24:08.000000', 2),
(4, 'Music & Festivals', 'AbruzzoFestivals.it', 'Abruzzo Music & Festivals', '2026-06-17 11:06:18.000000', '2026-07-17 10:24:08.000000', 2),
(12, 'Progetto Scuola1', 'scuola1.it', 'Descrizione scuola1', '2026-07-20 14:44:17.000000', '2026-07-28 15:59:09.000000', 1),
(13, 'Progetto Scuola2', 'scuola2.it', 'Descrizione scuola2', '2026-07-20 14:44:17.000000', '2026-07-28 15:59:09.000000', 1),
(14, 'Progetto Scuola3', 'scuola3.it', 'Descrizione scuola3', '2026-07-20 14:44:17.000000', '2026-07-28 15:59:09.000000', 1),
(15, 'Progetto Scuola4', 'scuola4.it', 'Descrizione scuola4', '2026-07-20 14:44:17.000000', '2026-07-28 15:59:09.000000', 1),
(16, 'Progetto1', 'Descrizione scuola1', 'Desc', '2026-07-29 07:39:32.000000', '2026-07-29 07:39:32.000000', 1),
(17, 'Gino', 'Pro', 'Pro', '2026-07-29 08:24:32.000000', '2026-07-29 15:42:40.000000', 1),
(18, 'Pro1', 'Pro1', 'Pro', '2026-07-29 09:12:24.000000', '2026-07-29 09:12:24.000000', 1);

-- ------------------------------------------------------
-- Table structure and data for table `project_service`
-- ------------------------------------------------------
DROP TABLE IF EXISTS `project_service`;
CREATE TABLE `project_service` (
 `project_id` bigint(20) NOT NULL,
 `service_id` bigint(20) NOT NULL,
 PRIMARY KEY (`project_id`,`service_id`),
 KEY `fk_project_service_service` (`service_id`),
 CONSTRAINT `fk_project_service_project` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
 CONSTRAINT `fk_project_service_service` FOREIGN KEY (`service_id`) REFERENCES `service` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `project_service` VALUES
(1,1),
(2,1),
(1,2),
(2,2),
(4,3);

-- ------------------------------------------------------
-- Table structure and data for table `request`
-- ------------------------------------------------------
DROP TABLE IF EXISTS `request`;
CREATE TABLE `request` (
`request_id` varchar(55) NOT NULL,
`send_from` timestamp NOT NULL DEFAULT current_timestamp(),
`send_to` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
`created_at` timestamp NOT NULL DEFAULT current_timestamp(),
`updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
`project_id` bigint(20) NOT NULL,
`request_state_id` bigint(20) NOT NULL,
`note` text DEFAULT NULL,
`request_payload` longtext CHARACTER SET utf8mb4 DEFAULT NULL CHECK (json_valid(`request_payload`)),
PRIMARY KEY (`request_id`),
KEY `fk_request_project` (`project_id`),
KEY `fk_request_state` (`request_state_id`),
CONSTRAINT `fk_request_project` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT `fk_request_state` FOREIGN KEY (`request_state_id`) REFERENCES `state` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `request` VALUES
('req_1234005670089','2026-06-17 09:16:31','2026-06-17 09:16:31','2026-06-17 09:16:31','2026-06-17 09:16:31',1,1,NULL,NULL),
('req_1234005670090','2026-06-17 09:16:31','2026-06-17 09:16:31','2026-06-17 09:16:31','2026-06-17 09:16:31',2,2,NULL,NULL),
('req_1234005670091','2026-06-17 09:16:31','2026-06-17 09:16:31','2026-06-17 09:16:31','2026-06-17 09:16:31',3,3,NULL,NULL),
('req_1234005670092','2026-06-17 09:16:31','2026-06-24 10:29:04','2026-06-17 09:16:31','2026-06-24 10:29:04',2,4,NULL,NULL),
('req_1234005670093','2026-06-17 09:16:31','2026-07-09 09:58:30','2026-06-17 09:16:31','2026-07-09 09:58:30',2,6,NULL,NULL),
('req_1234005670094','2026-06-17 09:16:31','2026-06-17 09:16:31','2026-06-17 09:16:31','2026-06-17 09:16:31',1,3,NULL,NULL),
('req_1234005670095','2026-06-17 09:16:31','2026-06-17 09:16:31','2026-06-17 09:16:31','2026-06-17 09:16:31',1,2,NULL,NULL),
('req_212c5b56502d4fb9aeb98af7d372fcf5','2026-07-28 22:00:00','2026-07-28 22:00:00','2026-07-29 09:11:22','2026-07-29 09:11:22',17,1,NULL,NULL),
('req_2169404104','2026-07-21 22:00:00','2026-07-21 22:00:00','2026-07-22 09:34:42','2026-07-22 09:34:42',12,1,NULL,NULL),
('req_2194e14025b245098ddec559883ad889','2026-07-28 22:00:00','2026-07-28 22:00:00','2026-07-29 08:31:52','2026-07-29 08:31:52',17,1,NULL,NULL),
('req_2c7e02bea3274242b7eecfca770704f5','2026-07-29 09:12:24','2026-07-29 09:12:24','2026-07-29 09:12:24','2026-07-29 09:12:24',18,1,NULL,NULL),
('req_34abb0b30a0a4d8985aba6a1bb0091cc','2026-08-03 22:00:00','2026-08-03 22:00:00','2026-08-04 09:03:22','2026-08-04 09:03:22',17,1,'bjkbjk','{\"project\":{\"id\":17,\"name\":\"Gino\",\"destinationLink\":\"Pro\",\"description\":\"Pro\",\"createAt\":\"2026-07-29T10:24:32\",\"updateAt\":\"2026-07-29T17:42:40\",\"services\":null},\"state\":\"In elaborazione\",\"note\":\"bjkbjk\",\"requestPayload\":null,\"services\":[{\"id\":4,\"name\":null,\"type\":{\"id\":2,\"name\":\"IaaS standard - Storage\",\"description\":\"Storage aggiuntivo per servizi IaaS standard\"},\"item\":\"Storage Standard Performance\",\"base\":false,\"optional\":false,\"params\":[{\"id\":4,\"name\":\"storageGb\",\"value\":\"700\",\"paramType\":null,\"paramValue\":null,\"minValue\":null,\"maxValue\":null,\"isRequired\":null,\"serviceId\":null}]}],\"sendFrom\":\"2026-08-04T00:00:00\",\"sendTo\":\"2026-08-04T00:00:00\"}'),
('req_4573988953','2026-07-20 14:44:17','2026-07-20 14:44:17','2026-07-20 14:44:17','2026-07-20 14:44:17',12,1,NULL,NULL),
('req_4f3eee72e4b34af3a819b3d745584948','2026-07-28 22:00:00','2026-07-28 22:00:00','2026-07-29 10:07:48','2026-07-29 10:07:48',1,1,NULL,NULL),
('req_5462315783','2026-07-21 22:00:00','2026-07-21 22:00:00','2026-07-22 09:02:31','2026-07-22 09:02:31',12,1,NULL,NULL),
('req_7132186052','2026-07-21 22:00:00','2026-07-21 22:00:00','2026-07-22 09:02:34','2026-07-22 09:02:34',12,1,NULL,NULL),
('req_9097235601','2026-07-21 22:00:00','2026-07-21 22:00:00','2026-07-22 09:35:26','2026-07-22 09:35:26',12,1,NULL,NULL),
('req_9125515380','2026-07-20 22:00:00','2026-07-20 22:00:00','2026-07-21 08:40:17','2026-07-21 08:40:17',1,1,NULL,NULL),
('req_9e064168e76046008f3fec4a46eb54de','2026-07-29 08:24:32','2026-07-29 08:24:32','2026-07-29 08:24:32','2026-07-29 08:24:32',17,1,NULL,NULL),
('req_d3aecc0551e143c0b364004b018b5638','2026-07-28 22:00:00','2026-07-28 22:00:00','2026-07-29 08:22:07','2026-07-29 08:22:07',1,1,NULL,NULL),
('req_e2d13b158e00411a808391f85c130ec7','2026-08-03 22:00:00','2026-08-03 22:00:00','2026-08-04 08:58:37','2026-08-04 08:58:37',17,1,'poiii','{\"project\":{\"id\":17,\"name\":\"Gino\",\"destinationLink\":\"Pro\",\"description\":\"Pro\",\"createAt\":\"2026-07-29T10:24:32\",\"updateAt\":\"2026-07-29T17:42:40\",\"services\":null},\"state\":\"In elaborazione\",\"note\":\"poiii\",\"requestPayload\":null,\"services\":[{\"id\":5,\"name\":null,\"type\":{\"id\":3,\"name\":\"IaaS (HA)\",\"description\":\"Servizi IaaS in alta affidabilità\"},\"item\":\"VM Small\",\"base\":false,\"optional\":false,\"params\":[{\"id\":5,\"name\":\"vcpu\",\"paramType\":null,\"paramValue\":null,\"minValue\":null,\"maxValue\":null,\"isRequired\":null,\"serviceId\":null},{\"id\":5,\"name\":\"vramGb\",\"paramType\":null,\"paramValue\":null,\"minValue\":null,\"maxValue\":null,\"isRequired\":null,\"serviceId\":null},{\"id\":5,\"name\":\"storageGb\",\"paramType\":null,\"paramValue\":null,\"minValue\":null,\"maxValue\":null,\"isRequired\":null,\"serviceId\":null}]}],\"sendFrom\":\"2026-08-04T00:00:00\",\"sendTo\":\"2026-08-04T00:00:00\"}'),
('req_fc8baf2fca0d4297963f3249bc4a492f','2026-08-03 22:00:00','2026-08-03 22:00:00','2026-08-04 07:16:30','2026-08-04 07:16:30',17,1,'Note per richiesta Gino','{\"project\":{\"id\":17,\"name\":\"Gino\",\"destinationLink\":\"Pro\",\"description\":\"Pro\",\"createAt\":\"2026-07-29T10:24:32\",\"updateAt\":\"2026-07-29T17:42:40\",\"services\":null},\"state\":\"In elaborazione\",\"note\":\"Note per richiesta Gino\",\"requestPayload\":null,\"services\":[{\"id\":1,\"name\":null,\"type\":{\"id\":1,\"name\":\"IaaS standard\",\"description\":\"Servizi IaaS standard\"},\"item\":\"VM Small\",\"base\":false,\"optional\":false,\"params\":[{\"id\":1,\"name\":\"vcpu\",\"paramType\":null,\"paramValue\":null,\"minValue\":null,\"maxValue\":null,\"isRequired\":null,\"serviceId\":null},{\"id\":1,\"name\":\"vramGb\",\"paramType\":null,\"paramValue\":null,\"minValue\":null,\"maxValue\":null,\"isRequired\":null,\"serviceId\":null},{\"id\":1,\"name\":\"storageGb\",\"paramType\":null,\"paramValue\":null,\"minValue\":null,\"maxValue\":null,\"isRequired\":null,\"serviceId\":null}]}],\"sendFrom\":\"2026-08-04T00:00:00\",\"sendTo\":\"2026-08-04T00:00:00\"}');

-- ------------------------------------------------------
-- Table structure and data for table `request_service`
-- ------------------------------------------------------
DROP TABLE IF EXISTS `request_service`;
CREATE TABLE `request_service` (
 `id` bigint(20) NOT NULL AUTO_INCREMENT,
 `request_id` varchar(100) NOT NULL,
 `service_id` bigint(20) NOT NULL,
 PRIMARY KEY (`id`),
 KEY `idx_request_service_request_id` (`request_id`),
 KEY `idx_request_service_service_id` (`service_id`),
 CONSTRAINT `fk_request_service_request` FOREIGN KEY (`request_id`) REFERENCES `request` (`request_id`),
 CONSTRAINT `fk_request_service_service` FOREIGN KEY (`service_id`) REFERENCES `service` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `request_service` VALUES
(1,'req_1234005670089',1),
(2,'req_1234005670090',1),
(3,'req_2169404104',1),
(4,'req_5462315783',1),
(5,'req_7132186052',1),
(6,'req_9097235601',1),
(7,'req_9e064168e76046008f3fec4a46eb54de',1),
(8,'req_d3aecc0551e143c0b364004b018b5638',1),
(9,'req_1234005670089',2),
(10,'req_1234005670091',2),
(11,'req_2c7e02bea3274242b7eecfca770704f5',2),
(12,'req_4f3eee72e4b34af3a819b3d745584948',2),
(13,'req_9125515380',2),
(14,'req_1234005670092',3),
(15,'req_1234005670089',4),
(16,'req_212c5b56502d4fb9aeb98af7d372fcf5',4),
(17,'req_2194e14025b245098ddec559883ad889',5),
(18,'req_4573988953',5),
(19,'req_fc8baf2fca0d4297963f3249bc4a492f',1),
(20,'req_e2d13b158e00411a808391f85c130ec7',5),
(21,'req_34abb0b30a0a4d8985aba6a1bb0091cc',4);

-- ------------------------------------------------------
-- Table structure and data for table `request_service_param`
-- ------------------------------------------------------
DROP TABLE IF EXISTS `request_service_param`;
CREATE TABLE `request_service_param` (
 `id` bigint(20) NOT NULL AUTO_INCREMENT,
 `request_service_id` bigint(20) NOT NULL,
 `param_id` bigint(20) NOT NULL,
 `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
 `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
 PRIMARY KEY (`id`),
 KEY `fk_request_service_param_request_service` (`request_service_id`),
 KEY `fk_request_service_param_param` (`param_id`),
 CONSTRAINT `fk_request_service_param_param` FOREIGN KEY (`param_id`) REFERENCES `param` (`id`),
 CONSTRAINT `fk_request_service_param_request_service` FOREIGN KEY (`request_service_id`) REFERENCES `request_service` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `request_service_param` VALUES
(1,19,1,'2026-08-04 07:16:30','2026-08-04 07:16:30'),
(2,19,1,'2026-08-04 07:16:30','2026-08-04 07:16:30'),
(3,19,1,'2026-08-04 07:16:30','2026-08-04 07:16:30'),
(4,20,5,'2026-08-04 08:58:37','2026-08-04 08:58:37'),
(5,20,5,'2026-08-04 08:58:37','2026-08-04 08:58:37'),
(6,20,5,'2026-08-04 08:58:37','2026-08-04 08:58:37'),
(7,21,4,'2026-08-04 09:03:22','2026-08-04 09:03:22');

-- ------------------------------------------------------
-- Table structure and data for table `ticket_state`
-- ------------------------------------------------------
DROP TABLE IF EXISTS `ticket_state`;
CREATE TABLE `ticket_state` (
 `id` bigint(20) NOT NULL AUTO_INCREMENT,
 `state_name` varchar(100) NOT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `ticket_state` VALUES
(1,'Aperto'),
(2,'In lavorazione'),
(3,'Chiuso');

-- ------------------------------------------------------
-- Table structure and data for table `ticket`
-- ------------------------------------------------------
DROP TABLE IF EXISTS `ticket`;
CREATE TABLE `ticket` (
 `id` bigint(20) NOT NULL AUTO_INCREMENT,
 `code` varchar(50) NOT NULL,
 `state_id` bigint(20) NOT NULL,
 `category` varchar(255) DEFAULT NULL,
 `subcategory` varchar(255) DEFAULT NULL,
 `opening_date` date DEFAULT NULL,
 `applicant` varchar(255) DEFAULT NULL,
 `created_at` datetime NOT NULL,
 `updated_at` datetime DEFAULT NULL,
PRIMARY KEY (`id`),
UNIQUE KEY `code` (`code`),
KEY `fk_ticket_state` (`state_id`),
CONSTRAINT `fk_ticket_state` FOREIGN KEY (`state_id`) REFERENCES `ticket_state` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `ticket` VALUES
 (1,'T1781595972077168',1,'Lorem ipsum dolor sit amet','Lorem ipsum dolor sit amet','2026-01-22','Lorem ipsum','2026-01-22 09:00:00','2026-01-22 09:00:00'),
 (2,'T1781595972077167',1,'Lorem ipsum dolor sit amet','Lorem ipsum dolor sit amet','2026-01-22','Lorem ipsum','2026-01-22 09:05:00','2026-01-22 09:05:00'),
 (3,'T1781595972077166',2,'Lorem ipsum dolor sit amet','Lorem ipsum dolor sit amet','2026-01-22','Lorem ipsum','2026-01-22 09:10:00','2026-01-22 10:00:00'),
 (4,'T1781595972077165',2,'Lorem ipsum dolor sit amet','Lorem ipsum dolor sit amet','2026-01-22','Lorem ipsum','2026-01-22 09:15:00','2026-01-22 10:10:00'),
 (5,'T1781595972077164',3,'Lorem ipsum dolor sit amet','Lorem ipsum dolor sit amet','2026-01-22','Lorem ipsum','2026-01-22 09:20:00','2026-01-23 11:00:00'),
 (6,'T1781595972077163',3,'Lorem ipsum dolor sit amet','Lorem ipsum dolor sit amet','2026-01-22','Lorem ipsum','2026-01-22 09:25:00','2026-01-23 11:05:00'),
 (7,'T1781595972077162',3,'Lorem ipsum dolor sit amet','Lorem ipsum dolor sit amet','2026-01-22','Lorem ipsum','2026-01-22 09:30:00','2026-01-23 11:10:00'),
 (8,'T1781595972077161',3,'Lorem ipsum dolor sit amet','Lorem ipsum dolor sit amet','2026-01-22','Lorem ipsum','2026-01-22 09:35:00','2026-01-23 11:15:00'),
 (9,'T1781595972077160',3,'Lorem ipsum dolor sit amet','Lorem ipsum dolor sit amet','2026-01-22','Lorem ipsum','2026-01-22 09:40:00','2026-01-23 11:20:00'),
 (10,'T1781595972077159',3,'Lorem ipsum dolor sit amet','Lorem ipsum dolor sit amet','2026-01-22','Lorem ipsum','2026-01-22 09:45:00','2026-01-23 11:25:00'),
 (11,'T1781595972077158',1,'Lorem ipsum dolor sit amet','Lorem ipsum dolor sit amet','2026-01-22','Lorem ipsum','2026-01-22 09:50:00','2026-01-22 09:50:00'),
 (12,'T1781595972077157',2,'Lorem ipsum dolor sit amet','Lorem ipsum dolor sit amet','2026-01-22','Lorem ipsum','2026-01-22 09:55:00','2026-01-22 10:30:00');

-- ------------------------------------------------------
-- Table structure and data for table `delegations`
-- ------------------------------------------------------
DROP TABLE IF EXISTS `delegations`;
CREATE TABLE `delegations` (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    delegation_date DATETIME(6) NULL,
    delegation_type VARCHAR(50) NOT NULL,
    status VARCHAR(50) DEFAULT 'INATTIVA' NOT NULL,
    user_id BIGINT NOT NULL,
    delegated_by BIGINT NOT NULL,

    -- Foreign Keys
    CONSTRAINT fk_delegates_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_delegates_delegated_by
        FOREIGN KEY (delegated_by) REFERENCES users(id)
        ON DELETE CASCADE ON UPDATE CASCADE,

    -- Self-Delegation Prevention
    CONSTRAINT chk_no_self_delegation
        CHECK (user_id <> delegated_by)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT into 'delegations' (delegation_date,delegation_type,status,user_id,delegated_by) VALUES
	 ('2026-07-03 10:30:00.000000','ROLE_DELEGATE_MASTER','ATTIVA',2,1),
	 ('2026-07-23 16:31:05.193801','ROLE_DELEGATE_CREATOR','ATTIVA',2,1),
	 ('2026-07-23 16:32:16.984807','ROLE_DELEGATE_VIEWER','INATTIVA',2,1),
	 ('2026-07-28 12:05:57.732423','ROLE_DELEGATE_MASTER','ATTIVA',1,6);

-- ------------------------------------------------------
-- Table structure and data for table `project_delegations`
-- ------------------------------------------------------
DROP TABLE IF EXISTS `project_delegations`;
CREATE TABLE `project_delegations` (
    `delegation_id` BIGINT NOT NULL,
    `project_id` BIGINT NOT NULL,
    PRIMARY KEY (`delegation_id`, `project_id`),
    CONSTRAINT `fk_project_delegations_delegation`
        FOREIGN KEY (`delegation_id`) REFERENCES `delegations` (`id`)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `fk_project_delegations_project`
        FOREIGN KEY (`project_id`) REFERENCES `project` (`id`)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `project_delegations` (`delegation_id`, `project_id`) VALUES
(2, 1),
(5, 1),
(3, 2),
(5, 2),
(4, 3),
(4, 4);

-- Restore original environment settings
SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS;