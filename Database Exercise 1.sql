##Create and select database
CREATE SCHEMA programming_exam_2020;


##Make tables related to student
CREATE TABLE major (
	id INT PRIMARY KEY AUTO_INCREMENT,
    study_field VARCHAR (10)
);

CREATE TABLE student (
	id 	INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(30) NOT NULL,
    major_id INT,
    
    FOREIGN KEY (major_id) REFERENCES major(id)
);

##Make supervisor table and alter student to incorporate one-to-many relationship with supervisor
CREATE TABLE supervisor (
	id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(30)
);

ALTER TABLE student
	ADD supervisor_id INT;

ALTER TABLE student
	ADD FOREIGN KEY (supervisor_id)
    REFERENCES supervisor(id);
    
    
##Populate the tables with sample data
INSERT INTO major(study_field) VALUES
	("Physics"),
    ("Math"),
    ("Fitness"),
    ("Literature");
    
INSERT INTO supervisor(email) VALUES
	("bigbrain@teachers.dk"),
    ("smartguy@teachers.dk"),
    ("verystrict@teachers.dk"),
    ("superloose@teacher.dk");
    
INSERT INTO student(full_name, major_id, supervisor_id) VALUES
	("Svend Olsen", 1, 3),
	("Thor Munch", 4, 1),
	("Anna Nymark", 3, 4),
	("Clara Berg", 2, 2);   
    
##Create the view
CREATE VIEW full_student AS
SELECT s.id, s.full_name,
m.study_field,
sp.email AS supervisor_email
FROM student s
JOIN major m ON s.major_id = m.id
JOIN supervisor sp ON s.supervisor_id = sp.id;
