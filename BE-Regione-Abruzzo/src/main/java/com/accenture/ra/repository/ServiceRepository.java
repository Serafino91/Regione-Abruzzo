package com.accenture.ra.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.accenture.ra.entity.ServiceEntity;

@Repository
public interface ServiceRepository extends JpaRepository<ServiceEntity, String>, JpaSpecificationExecutor<ServiceEntity> {

    List<ServiceEntity> findAllByServiceTypeId(Long serviceTypeId);

}
