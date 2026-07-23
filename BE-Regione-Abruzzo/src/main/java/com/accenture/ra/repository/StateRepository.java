package com.accenture.ra.repository;

import com.accenture.ra.entity.StateEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StateRepository extends JpaRepository<StateEntity, Long> {

    Optional<StateEntity> findByStateName(String stateName);
}
