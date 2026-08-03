package com.accenture.ra.repository;

import com.accenture.ra.entity.RequestServiceEntity;
import com.accenture.ra.entity.RequestServiceParamEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RequestServiceRepository extends JpaRepository<RequestServiceEntity, Long> {

    List<RequestServiceEntity> findByRequestRequestId(String requestId);
}
