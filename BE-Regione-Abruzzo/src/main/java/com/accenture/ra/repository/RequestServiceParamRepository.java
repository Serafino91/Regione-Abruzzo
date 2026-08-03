package com.accenture.ra.repository;

import com.accenture.ra.entity.RequestServiceParamEntity;
import com.accenture.ra.entity.TicketEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RequestServiceParamRepository extends JpaRepository<RequestServiceParamEntity, Long> {

    List<RequestServiceParamEntity> findByRequestServiceId(Long requestServiceId);

    Optional<RequestServiceParamEntity> findByRequestServiceIdAndParamId(
            Long requestServiceId,
            Integer paramId
    );
}