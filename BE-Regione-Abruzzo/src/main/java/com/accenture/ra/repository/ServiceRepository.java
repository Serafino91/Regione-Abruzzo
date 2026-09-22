package com.accenture.ra.repository;

import com.accenture.ra.entity.RequestEntity;
import com.accenture.ra.entity.ServiceEntity;
import com.accenture.ra.entity.ServiceTypeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceRepository extends JpaRepository<ServiceEntity, String>, JpaSpecificationExecutor<ServiceEntity> {

    List<ServiceEntity> findAllByServiceTypeId(Long serviceTypeId);

}
