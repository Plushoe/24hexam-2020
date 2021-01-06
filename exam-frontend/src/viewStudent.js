import React, {Component} from 'react';
import ManageStudent from "./manageStudent";

class ViewStudent extends Component {

    constructor(props) {
        super(props);

        this.state = {
        };
    }


    async fetchStudentList() {
        //Fetch list of students
        const responseStudents = await fetch("http://localhost:8080/students");
        const studentsList = await responseStudents.json();

        this.setState({students : studentsList})
    }

    async componentDidMount() {
        await this.fetchStudentList();
    }

    loadStudents() {
        if (this.state.students !== undefined && this.state.students !== null) {
            return this.state.students.map(student => this.mapStudentRow(student));
        } else {
            return "loading...";
        }
    }

    mapStudentRow(student) {

        return (
            <tr key={student}>
                <td >{student.id}</td>
                <td>{student.fullName}</td>
                <td>{student.supervisorEmail}</td>
                <td>{student.studyField}</td>
                <td>
                    <ManageStudent student={student}/>
                </td>
            </tr>
        )
    }

    createStudentTable() {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Full Name</th>
                        <th>Supervisor</th>
                        <th>Major</th>
                    </tr>
                </thead>
                <tbody>
                    {this.loadStudents()}
                </tbody>
        </table>)
    }

    render() {
        return (
            <div>
                <h1>Students enrolled</h1>
                {this.createStudentTable()}
            </div>
        );
    }
}

export default ViewStudent;