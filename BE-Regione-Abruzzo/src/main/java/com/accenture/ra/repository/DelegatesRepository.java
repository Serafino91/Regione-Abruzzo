package com.accenture.ra.repository;

import com.accenture.ra.entity.DelegationEntity;
import com.accenture.ra.enums.DelegateType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DelegatesRepository extends JpaRepository<DelegationEntity, Long> {


    @Query("""
        SELECT d FROM DelegationEntity d 
        JOIN d.projects p 
        WHERE d.delegatedUser.id = :userId 
          AND p.id = :projectId 
          AND d.status = com.accenture.ra.enums.DelegationStatus.ATTIVA
    """)
    Optional<DelegationEntity> findActiveDelegationByUserIdAndProjectId(
            @Param("userId") Long userId,
            @Param("projectId") Long projectId
    );

    @Query("""
        SELECT d FROM DelegationEntity d 
        WHERE d.delegatedBy.id = :userId
    """)
    List<DelegationEntity> findByDelegatedBy(@Param("userId") Long id);
}