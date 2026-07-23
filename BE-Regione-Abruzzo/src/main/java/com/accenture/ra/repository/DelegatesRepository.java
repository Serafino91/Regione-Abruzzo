package com.accenture.ra.repository;

import com.accenture.ra.entity.Delegates;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DelegatesRepository extends JpaRepository<Delegates, Long> {

    List<Delegates> findByUserId(Long userId);
}