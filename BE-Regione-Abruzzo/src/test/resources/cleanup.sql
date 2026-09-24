SET FOREIGN_KEY_CHECKS = 0;

DELETE FROM project_delegations;
DELETE FROM delegations;
DELETE FROM request_service_param;
DELETE FROM request_service;
DELETE FROM request;
DELETE FROM project_service;
DELETE FROM project;
DELETE FROM inner_param;
DELETE FROM param;
DELETE FROM service;
DELETE FROM service_type;
DELETE FROM state;
DELETE FROM users;
DELETE FROM ticket;
DELETE FROM ticket_state;
DELETE FROM category;

SET FOREIGN_KEY_CHECKS = 1;
