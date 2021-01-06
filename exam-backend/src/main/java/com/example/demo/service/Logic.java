package com.example.demo.service;

import com.example.demo.model.Major;
import com.example.demo.model.Student;
import com.example.demo.model.Supervisor;
import com.example.demo.model.view.FullStudent;
import com.example.demo.repository.FullStudentRepository;
import com.example.demo.repository.MajorRepository;
import com.example.demo.repository.StudentRepository;
import com.example.demo.repository.SupervisorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class Logic {

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    FullStudentRepository fullStudentRepository;

    @Autowired
    SupervisorRepository supervisorRepository;
    @Autowired
    MajorRepository majorRepository;

    public ResponseEntity<Student> createStudent(FullStudent newStudent) {
        try {
            return new ResponseEntity<>(studentRepository.save(convertViewToStudent(newStudent)), HttpStatus.CREATED);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private Student convertViewToStudent(FullStudent view) {
        Student student = new Student();

        student.setFullName(view.getFullName());

        int majorId = majorRepository.findByStudyField(view.getStudyField()).get().getId();
        student.setMajorId(majorId);

        int supervisorId = supervisorRepository.findByEmail(view.getSupervisorEmail()).get().getId();
        student.setSupervisorId(supervisorId);
        return student;
    }

    public ResponseEntity<Student> updateStudent(FullStudent fromWeb) {
        //Search for Student by its id
        Optional<Student> existingStudent = studentRepository.findById(fromWeb.getId());

        //Check if the query found a match
        if (existingStudent.isPresent()) {
            Student updatedStudent = existingStudent.get();
            Student formerView = convertViewToStudent(fromWeb);

            //Overwrite fields
            updatedStudent.setFullName(formerView.getFullName());
            updatedStudent.setMajorId(formerView.getMajorId());
            updatedStudent.setSupervisorId(formerView.getSupervisorId());

            //Update student in database thru .save() method
            return new ResponseEntity<>(studentRepository.save(updatedStudent), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<Student> deleteStudent(int id) {
        try {
            studentRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.GONE);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<List<FullStudent>> listAllStudents() {
        try {
            return new ResponseEntity<List<FullStudent>>(fullStudentRepository.findAll(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<List<Major>> listAllMajors() {
        try {
            return new ResponseEntity<>(majorRepository.findAll(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<List<Supervisor>> listAllSupervisors() {
        try {
            return new ResponseEntity<>(supervisorRepository.findAll(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
