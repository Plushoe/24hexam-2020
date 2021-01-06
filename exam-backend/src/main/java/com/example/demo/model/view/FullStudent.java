package com.example.demo.model.view;


import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "full_student")
public class FullStudent {
    @Id
    private Integer id;
    private String fullName;
    private String studyField;
    private String supervisorEmail;

    public FullStudent() {
    }

    public FullStudent(Integer id, String fullName, String studyField, String supervisorEmail) {
        this.id = id;
        this.fullName = fullName;
        this.studyField = studyField;
        this.supervisorEmail = supervisorEmail;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getStudyField() {
        return studyField;
    }

    public void setStudyField(String studyField) {
        this.studyField = studyField;
    }

    public String getSupervisorEmail() {
        return supervisorEmail;
    }

    public void setSupervisorEmail(String supervisorEmail) {
        this.supervisorEmail = supervisorEmail;
    }

    @Override
    public String toString() {
        return "FullStudent{" +
                "id=" + id +
                ", fullName='" + fullName + '\'' +
                ", studyField='" + studyField + '\'' +
                ", supervisorEmail='" + supervisorEmail + '\'' +
                '}';
    }
}
