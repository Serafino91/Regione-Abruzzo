package com.accenture.ra.repository;

import com.accenture.ra.entity.ProjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface ProjectRepository extends JpaRepository<ProjectEntity, Long>, JpaSpecificationExecutor<ProjectEntity> {

	boolean existsByName(String name);

	// Verifica se esiste un progetto che abbia contemporaneamente lo stesso nome
	// e lo stesso destinationLink
	boolean existsByNameAndDestinationLink(String name, String destinationLink);

	@Modifying
	@Query("""
UPDATE ProjectEntity p
SET p.deleted = true
WHERE p.deleted = false
AND p.expirationDate IS NOT NULL
AND p.expirationDate < :today
""")
	int softDeleteExpiredProjects(@Param("today") LocalDate today);
}
