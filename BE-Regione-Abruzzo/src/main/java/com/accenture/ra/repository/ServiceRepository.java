package com.accenture.ra.repository;

import com.accenture.ra.entity.ServiceEntity;
import com.accenture.ra.entity.ServiceTypeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceRepository extends JpaRepository<ServiceEntity, String> {

    List<ServiceEntity> findAllByServiceTypeId(Long serviceTypeId);

}
