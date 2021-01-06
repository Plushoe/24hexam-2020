import React, {Component} from 'react';
import ReactModal from 'react-modal';
import axios from "axios";

class AddStudent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fillForm : false,
            supervisorEmail : "bigbrain@teachers.dk",
            studyField : "Physics"
        };

        this.updateMajor = this.updateMajor.bind(this);
        this.updateSupervisor = this.updateSupervisor.bind(this);
        this.updateFullName = this.updateFullName.bind(this);
    }

    enterForm() {
        this.setState({ fillForm: true});
    }

    exitForm() {
        this.setState({ fillForm: false});
    }

    async componentDidMount() {
        const responseMajors = await fetch("http://localhost:8080/majors");
        const majors = await responseMajors.json();

        const responseSupervisors = await fetch("http://localhost:8080/supervisors");
        const supervisors = await responseSupervisors.json();

        this.setState({majorsList : majors, supervisorsList : supervisors})
    }

    updateMajor(studyField) {
        this.setState({studyField : studyField.target.value})
    }

    updateSupervisor(supervisor) {
        this.setState({supervisorEmail : supervisor.target.value});
    }

    updateFullName(fullName) {
        this.setState({fullName : fullName.target.value})
    }

    loadMajors() {
        if (this.state.majorsList !== undefined) {
            return (
                <select name="studyField" value={this.state.studyField} onChange={this.updateMajor}>
                    {this.state.majorsList.map((majors) => this.getMajor(majors))}
                </select>
            );
        } else {
            return "loading..."
        }
    }

    getMajor(major) {
        return (<option value={major.studyField}>
                {major.studyField}
            </option>
        )
    }

    loadSupervisors() {
        if (this.state.supervisorsList !== undefined) {
            return (
                <select name="supervisorEmail" value={this.state.supervisorEmail} onChange={this.updateSupervisor}>
                    {this.state.supervisorsList.map((supervisor) => this.getSupervisor(supervisor))}
                </select>
            );
        } else {
            return "loading..."
        }
    }

    getSupervisor(supervisor) {
        return (<option value={supervisor.email}>
                {supervisor.email}
            </option>
        )
    }

    addStudent = () => {
        const newStudent = {
            supervisorEmail : this.state.supervisorEmail,
            studyField : this.state.studyField,
            fullName : this.state.fullName
        };
        axios.post("http://localhost:8080/create", newStudent)
            .then(() => {
                alert("New student has been added");
            })
            .catch(() => console.log("RIP"));
        this.exitForm();
    }

    createStudentForm() {
        return (
            <form onSubmit={this.addStudent}>
                <input type="text" name="fullName" placeholder="Your full name" onChange={this.updateFullName} required/>
                {this.loadMajors()}
                {this.loadSupervisors()}
                <input type="submit" value="Add"/>
            </form>
        )
    }

    render() {
        return (
            <div>
                <button onClick={this.enterForm.bind(this)}>Create Student</button>
                <ReactModal isOpen={this.state.fillForm}>
                    {this.createStudentForm()}
                    <button onClick={this.exitForm.bind(this)}>Cancel</button>
                </ReactModal>
            </div>
        );
    }
}

export default AddStudent;