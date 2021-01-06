package com.example.demo.controller;


import com.example.demo.model.Major;
import com.example.demo.model.Student;
import com.example.demo.model.Supervisor;
import com.example.demo.model.view.FullStudent;
import com.example.demo.service.Logic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class RestAPI {
    //Autowiring services
    @Autowired
    Logic logic;

    //Student methods
    @PostMapping("/create")
    public ResponseEntity<Student> createStudent(@RequestBody FullStudent student) {
        return logic.createStudent(student);
    }

    @PutMapping("/update")
    public ResponseEntity<Student> updateStudent(@RequestBody FullStudent studentInfo) {
        System.out.println("Update!");
        return logic.updateStudent(studentInfo);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Student> deleteStudent(@PathVariable("id") int id) {
        System.out.println("Delete!");
        return logic.deleteStudent(id);
    }

    @GetMapping("/students")
    public ResponseEntity<List<FullStudent>> listAllStudents() {
        return logic.listAllStudents();
    }

    @GetMapping("/majors")
    public ResponseEntity<List<Major>> listAllMajors() {
        return logic.listAllMajors();
    }

    @GetMapping("/supervisors")
    public ResponseEntity<List<Supervisor>> listAllSupervisors() {
        return logic.listAllSupervisors();
    }
}
