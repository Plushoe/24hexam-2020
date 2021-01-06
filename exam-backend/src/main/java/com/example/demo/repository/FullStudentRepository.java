package com.example.demo.repository;

import com.example.demo.model.view.FullStudent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FullStudentRepository extends JpaRepository<FullStudent, Integer> {
}
