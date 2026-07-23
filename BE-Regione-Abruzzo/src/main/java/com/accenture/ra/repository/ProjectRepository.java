package com.accenture.ra.repository;

import com.accenture.ra.entity.ProjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends JpaRepository<ProjectEntity, Long> {

	boolean existsByName(String name);

	// Verifica se esiste un progetto che abbia contemporaneamente lo stesso nome
	// e lo stesso destinationLink
	boolean existsByNameAndDestinationLink(String name, String destinationLink);
}
