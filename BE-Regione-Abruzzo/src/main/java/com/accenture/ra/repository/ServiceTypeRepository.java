package com.accenture.ra.repository;

import com.accenture.ra.entity.ServiceTypeEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceTypeRepository extends JpaRepository<ServiceTypeEntity, String> {

}
