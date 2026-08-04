package com.accenture.ra.repository;

import com.accenture.ra.entity.Delegates;
import com.accenture.ra.enums.DelegateType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DelegatesRepository extends JpaRepository<Delegates, Long> {

    @Query("""
        SELECT d FROM Delegates d 
        JOIN d.user u 
        WHERE u.fiscalCode = :fiscalCode 
          AND d.delegateType = :delegateType 
          AND d.active = true
    """)
    List<Delegates> findActiveDelegationsByFiscalCodeAndRole(
            @Param("fiscalCode") String fiscalCode,
            @Param("delegateType") DelegateType delegateType
    );

    @Query("""
        SELECT d FROM Delegates d 
        JOIN d.projects p 
        WHERE d.user.id = :userId 
          AND p.id = :projectId 
          AND d.active = true
    """)
    Optional<Delegates> findActiveDelegationByUserIdAndProjectId(
            @Param("userId") Long userId,
            @Param("projectId") Long projectId
    );
}