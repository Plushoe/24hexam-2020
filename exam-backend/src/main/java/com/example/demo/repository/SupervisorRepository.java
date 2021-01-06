package com.example.demo.repository;

import com.example.demo.model.Supervisor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SupervisorRepository extends JpaRepository<Supervisor, Integer> {
    Optional<Supervisor> findByEmail(String email);
}
