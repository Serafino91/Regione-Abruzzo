package com.accenture.ra.repository;

import com.accenture.ra.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByFiscalCodeAndEmail(String fiscalCode, String email);

    Optional<User> findByFiscalCode(String fiscalCode);

    Optional<User> findByEmail(String email);

    boolean existsByFiscalCode(String fiscalCode);
}