import React from 'react';
import './styles/ClassRow.css';
import AttendanceStartTD from './AttendanceStartTD';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import EditBox from './EditBox';
import AttendanceReport from './AttendanceReport';
import ConfirmCancel from './ConfirmCancel';

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
            confirmCancel: false,
            absentList: [],
            presentList: [],
        }
        this.handleStart = this.handleStart.bind(this);
        this.timesUp = this.timesUp.bind(this);   
        this.handleRepeat = this.handleRepeat.bind(this);     
        this.handleFinish = this.handleFinish.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.update = this.update.bind(this);
        this.handleReport = this.handleReport.bind(this);
        this.saveAttendanceLists = this.saveAttendanceLists.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.cancelAttendance = this.cancelAttendance.bind(this);
    }

    cancelAttendance = () =>{
        this.props.cancelAttendance();
        this.setState({
            attendanceGoingOn: false,
            confirmCancel: false,
        })
        //backend request to cancel attendance code
    }

    handleCancel = () =>{
        if (this.state.confirmCancel){
            this.setState({
                confirmCancel: false,
            })
        }else{
            this.setState({
                confirmCancel: true,
            })
            setTimeout(function(){
                for (let element of document.getElementsByClassName('visibility')){
                    element.style.visibility = 'visible';
                }
            }, 900)
        }
    }

    saveAttendanceLists = (presentList, absentList) =>{
        const presentListNames = presentList.map(student =>{
            return student.props.name
        })
        presentListNames.sort()
        const absentListNames = absentList.map(student =>{
            return student.props.name
        })
        absentListNames.sort()
        this.setState({
            presentList: presentListNames,
            absentList: absentListNames
        })
    }

    handleReport = () =>{
        if (this.state.viewingReport){
            this.setState({
                viewingReport: false,
            })
        }else{
            //if this is the first time the user is viewing the attendance report
            if (this.state.presentList.length === 0 && this.state.absentList.length === 0){
                let testList = ['tommy Trinh', 'miyuki shirogane','chika fujiwara', 'kaguya shinomiya','Tommy Trinh', 'miyuki shirogane','chika fujiwara', 'kaguya shinomiya','Tommy Trinh', 'miyuki shirogane','chika fujiwara', 'kaguya shinomiya','Tommy Trinh', 'miyuki shirogane','chika fujiwara', 'kaguya shinomiya','Tommy Trinh', 'miyuki shirogane','chika fujiwara', 'kaguya shinomiya','Tommy Trinh', 'miyuki shirogane','chika fujiwara', 'kaguya shinomiya','Tommy Trinh', 'miyuki shirogane','chika fujiwara', 'kaguya shinomiya','Tommy Trinh', 'miyuki shirogane','chika fujiwara', 'kaguya shinomiya','Tommy Trinh', 'miyuki shirogane','chika fujiwara', 'kaguya shinomiya','Tommy Trinh', 'miyuki shirogane','chika fujiwara', 'kaguya shinomiya','Tommy Trinh', 'miyuki shirogane','chika fujiwara', 'kaguya shinomiya','Tommy Trinh', 'miyuki shirogane','chika fujiwara', 'kaguya shinomiya','Tommy Trinh', 'miyuki shirogane','chika fujiwara', 'kaguya shinomiya'].sort();
                let otherList = ['yu ishigami','miko iino','moeha fujiwara']
                
                this.setState({
                    presentList: testList,
                    absentList: otherList,
                    viewingReport: true,
                })
            }else{ // if they have already viewed the attendance report
                this.setState({
                    viewingReport: true,
                })
            }
            
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
    handleFinish = () =>{
        this.props.resetRows();
        this.setState({
            attendanceGoingOn: false,
        })
        //need to do part where data is sent to backend
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
        if (this.state.confirmCancel){
            attendanceTD = <ConfirmCancel cancelAttendance={this.cancelAttendance} closeCancelBox={this.handleCancel} />
        }else if (this.state.viewingReport){
            attendanceTD = 
                <AttendanceReport 
                    save={this.saveAttendanceLists} 
                    absentList={this.state.absentList} 
                    presentList={this.state.presentList} 
                    close={this.handleReport} 
                    classID={this.props.data.id} 
                    name={this.props.data.name} 
                />
        }else if(this.state.editGoingOn){
            attendanceTD = <EditBox update={this.update} delete={this.props.delete} classID={this.props.data.id} handleEditCancel={this.handleEdit} name={this.props.data.name} /> 
        }else if(this.state.attendanceGoingOn){
            attendanceTD = <AttendanceStartTD cancelAttendance={this.cancelAttendance} name={this.props.data.name} code={this.props.code} timesUp={this.timesUp} goalTime={this.props.goalTime} /> 
        }else if(this.props.attendanceEnded){
            attendanceTD = 
            <React.Fragment>
                <td className='continue-end-attendence-td' onClick={this.handleReport}>Report</td>
                <td className='continue-end-attendence-td' onClick={this.handleRepeat}>Repeat</td>
                <td className='continue-end-attendence-td' onClick={this.handleFinish}>Finish</td>
                <td className='continue-end-attendence-td' onClick={this.handleCancel}>Cancel</td>
            </React.Fragment>
        }else if(this.props.otherRowStartAttendance){
            attendanceTD = <React.Fragment><td></td><td></td><td></td><td></td></React.Fragment>
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