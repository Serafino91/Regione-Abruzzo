package com.accenture.ra.repository;

import com.accenture.ra.entity.Delegates;
import com.accenture.ra.enums.DelegateType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DelegatesRepository extends JpaRepository<Delegates, Long> {

    @Query("SELECT DISTINCT d FROM Delegates d " +
            "LEFT JOIN FETCH d.projects " +
            "WHERE d.user.fiscalCode = :fiscalCode " +
            "AND d.delegateType = :delegateType " +
            "AND d.active = true")
    List<Delegates> findActiveDelegationsByFiscalCodeAndRole(
            @Param("fiscalCode") String fiscalCode,
            @Param("delegateType") DelegateType delegateType
    );
}