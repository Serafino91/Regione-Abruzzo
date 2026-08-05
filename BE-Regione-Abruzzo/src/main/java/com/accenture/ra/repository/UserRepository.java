package com.accenture.ra.repository;

import com.accenture.ra.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {

    Optional<UserEntity> findByFiscalCodeAndEmail(String fiscalCode, String email);

    Optional<UserEntity> findByFiscalCode(String fiscalCode);

    Optional<UserEntity> findByEmail(String email);

    boolean existsByFiscalCode(String fiscalCode);
}