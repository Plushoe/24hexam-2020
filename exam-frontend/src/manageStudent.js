import React, {Component} from 'react';
import ReactModal from 'react-modal';
import axios from "axios";

class ManageStudent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isEditable : false,
            id : this.props.student.id,
            fullName : this.props.student.fullName,
            studyField : this.props.student.studyField,
            supervisorEmail : this.props.student.supervisorEmail
        };

        this.enableEditing = this.enableEditing.bind(this);
        this.updateMajor = this.updateMajor.bind(this);
        this.updateSupervisor = this.updateSupervisor.bind(this);
        this.updateFullName = this.updateFullName.bind(this);
    }

    enableEditing() {
        this.setState({ isEditable: true});
    }

    disableEditing() {
        this.setState({ isEditable: false});
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

    async componentDidMount() {
        const responseMajors = await fetch("http://localhost:8080/majors");
        const majors = await responseMajors.json();

        const responseSupervisors = await fetch("http://localhost:8080/supervisors");
        const supervisors = await responseSupervisors.json();

        this.setState({majorsList : majors, supervisorsList : supervisors})
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


    manageMenu() {
        while (this.state.id === undefined) {
            this.manageMenu();
        }

        return (
            <div>
                <input type="number" name="id" value={this.state.id} disabled />
                <input type="text" name="fullName" value={this.state.fullName} onChange={this.updateFullName}/>
                {this.loadMajors()}
                {this.loadSupervisors()}
                <button onClick={this.sendUpdateInfo}>Save info</button>
                <button onClick={this.sendDeleteSignal}>Delete</button>
                <button onClick={this.cancel}>Cancel</button>
            </div>
        )
    }

    sendUpdateInfo = () => {
        const studentInfo = {
            id : this.state.id,
            fullName : this.state.fullName,
            studyField : this.state.studyField,
            supervisorEmail : this.state.supervisorEmail
        };

        axios.put('http://localhost:8080/update', studentInfo)
            .then(() => {
                alert("Student info has been updated");
            })
            .catch(() => console.log("RIP"));
        this.disableEditing();
    }

    sendDeleteSignal = () => {
        const studentId = this.state.id;
        axios.delete('http://localhost:8080/delete/' + studentId)
            .then(() => {
                alert("Student has been deleted");
            })
            .catch(() => console.log("RIP"));
        this.disableEditing();
    }

    cancel = () => {
        this.disableEditing();
    }

    ///REMBA JUST PUSH TO ARRAY AAA??
    render() {
        return(
            <div>
                <button onClick={this.enableEditing}>Update</button>

                <ReactModal isOpen={this.state.isEditable}>
                    {this.manageMenu()}
                </ReactModal>
            </div>
        )
    }
}

export default ManageStudent;