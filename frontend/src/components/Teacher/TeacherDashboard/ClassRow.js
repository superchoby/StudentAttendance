import React from 'react';
import './styles/ClassRow.css';
import AttendanceStartTD from './AttendanceStartTD';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import EditBox from './EditBox';
import AttendanceReport from './AttendanceReport';

/**
 * Represents the information of the classes in
 * table row format
 */
class ClassRow extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            attendanceGoingOn: false,
            editGoingOn: false,
            viewingReport: false,
        }
        this.handleStart = this.handleStart.bind(this);
        this.timesUp = this.timesUp.bind(this);   
        this.handleRepeat = this.handleRepeat.bind(this);     
        this.handleStop = this.handleStop.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.update = this.update.bind(this);
        this.handleReport = this.handleReport.bind(this);
    }

    handleReport = () =>{
        if (this.state.viewingReport){
            this.setState({
                viewingReport: false,
            })
        }else{
            this.setState({
                viewingReport: true,
            })
        }
    }

    update = (classNameOriginal, classNameNew) =>{
        this.handleEdit()
        this.props.update(classNameOriginal, classNameNew)
    }

    handleEdit = () =>{
        if (this.state.editGoingOn){
            this.setState({
                editGoingOn: false,
            })
        }else{
            this.setState({
                editGoingOn: true,
            })
        }
    }

    /**
     * Activates when the user wants to stop the attendance
     * after time is up
     */
    handleStop = () =>{
        this.props.resetRows();
        this.setState({
            attendanceGoingOn: false,
        })
    }

    /**
     * Activates when the user wants to repeat the attendance
     * after time is up
     */
    handleRepeat = () =>{
        this.props.startAttendance(this.props.data.name, false)
        this.setState({
            attendanceGoingOn: true,
        })
    }

    /**
     * Function that handles when the attendance session
     * has expired, meant to be passed down as props to
     * AttendanceStartTD component
     */
    timesUp = name =>{
        this.props.timesUp(name)
        this.setState({attendanceGoingOn: false})
    }

    /**
     * Handles when the instructor wants to start the
     * attendance session
     */
    handleStart = () =>{
        this.props.startAttendance(this.props.data.name)
        this.setState({
            attendanceGoingOn: true,
        })
    }

    render(){
        let attendanceTD = null;
        if (this.state.viewingReport){
            attendanceTD = <AttendanceReport close={this.handleReport} classID={this.props.data.id} name={this.props.data.name} />
        }else if(this.state.editGoingOn){
            attendanceTD = <EditBox update={this.update} delete={this.props.delete} classID={this.props.data.id} handleEditCancel={this.handleEdit} name={this.props.data.name} /> 
        }else if(this.state.attendanceGoingOn){
            attendanceTD = <AttendanceStartTD name={this.props.data.name} code={this.props.code} timesUp={this.timesUp} goalTime={this.props.goalTime} /> 
        }else if(this.props.attendanceEnded){
            attendanceTD = 
            <React.Fragment>
                <td className='continue-end-attendence-td' onClick={this.handleReport}>Report</td>
                <td className='continue-end-attendence-td' onClick={this.handleRepeat}>Repeat</td>
                <td className='continue-end-attendence-td' onClick={this.handleStop}>Stop</td>
            </React.Fragment>
        }else if(this.props.otherRowStartAttendance){
            attendanceTD = <React.Fragment><td></td><td></td><td></td></React.Fragment>
        }else{
            let url = '/viewclassinfo/' + this.props.data.id
            attendanceTD = 
            <React.Fragment>
                <td className='no-attendance-td' onClick={this.handleStart}>Start Attendence</td>
                <td className='no-attendance-td'><Link to={url} className="link">View Students</Link></td>
                <td className='no-attendance-td' onClick={this.handleEdit} >Edit</td>
            </React.Fragment>
        }

        return(
            <React.Fragment>
                <tr className='info-row'>
                    <td className='blank-td'></td>
                    <td className='class-name-td'>{this.props.data.name}</td>
                    {attendanceTD}
                </tr>
            </React.Fragment>
        )
    }
}

ClassRow.propTypes = {
    /** Returns all ClassRow components to default */
    resetRows: PropTypes.func,
    /** 
     * Starts attendance for the class
     * 
     * @param {string} name The name used to identify 
     * the class
     */
    startAttendance: PropTypes.func,
    /** Object with class info */
    data: PropTypes.object,
    /** Handles when attendance time is up,
     *  meant to be passed down as props to AttendanceStartTD
    */
    timesUp: PropTypes.func,
    /** Attendance code, meant to be passed
     * down as props to AttendanceStartTD 
     */
    code: PropTypes.string,
    /** Attendance time limit, meant to be passed
     * down as props to AttendanceStartTD 
     */
    goalTime: PropTypes.number,
    /** boolean showing whether or not attendance has ended */
    attendanceEnded: PropTypes.bool,
    /** 
     * boolean to say if that instance of  
     * the ClassRow is not having an attendance session
     * but another ClassRow is
    */
    otherRowStartAttendance: PropTypes.bool,
}

export default ClassRow;