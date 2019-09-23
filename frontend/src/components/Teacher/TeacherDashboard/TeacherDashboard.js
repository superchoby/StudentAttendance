import React from 'react';
import Banner from './Banner';
import ClassRow from './ClassRow';
import './styles/ClassDashboard.css';
import AttendanceCode from './AttendanceCode';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles/TeacherDashboard.css';
import AddClass from './AddClass';

/**
 * The parent component that contains the entire page
 * for the teacher's dashboard
 */
class ClassDashboard extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
             NeedToShowAttendanceCode: false,
             currentAttendanceCode: '',
             goalTime: 500,
        }
        this.startAttendance = this.startAttendance.bind(this);
        this.stopShowAttendanceCode = this.stopShowAttendanceCode.bind(this);
        this.generateAttendanceCode = this.generateAttendanceCode.bind(this);
        this.attendanceTimeUp = this.attendanceTimeUp.bind(this);
        this.generateDefaultClassRows = this.generateDefaultClassRows.bind(this);
        this.resetRows = this.resetRows.bind(this);
        this.changeTime = this.changeTime.bind(this);
        this.createNewClass = this.createNewClass.bind(this);
    }

    createNewClass = classData =>{
        let currentClassRows = this.state.classRowList
        console.log('wutup')
        let newRow = <ClassRow key={classData.name} data={classData} startAttendance={this.startAttendance} />
        this.setState({
            classRowList: [...currentClassRows, newRow]
        })
    }

    changeTime = newTime =>{
        this.setState({
            goalTime: newTime
        })
    }

    /**
     * creates an array of ClassRow components containing the data in the
     * normal, default format
     * 
     * @param {array} class_array the array containing all the classes
     * information from the database
     * 
     * @return {array} The array containing the ClassRow components
     */
    generateDefaultClassRows = class_array =>{
        return class_array.map(class_info =>{
            return <ClassRow key={class_info.name} data={class_info} startAttendance={this.startAttendance} />
        })
    }

    /**
     * After attendance is finished, this function resets the rows to
     * how they originally were
     */
    resetRows = () =>{
        let classArray = this.generateDefaultClassRows(this.state.classInfo);
        this.setState({
            classRowList: classArray,
        })
    }

    /**
     * This function is called when attendance is over,
     * gives the class that had the attendance going on to have the 
     * option to end it
     * 
     * @param {string} name the name of the class having the
     * attendance going on so it can be identified
     */
    attendanceTimeUp = name =>{
        let classArray = this.state.classRowList.slice()
        for (let i=0; i<classArray.length; i++){
            if (classArray[i].props.name === name){
                classArray[i] = <ClassRow 
                    key={classArray[i].props.name} 
                    attendanceEnded={true} 
                    resetRows={this.resetRows} 
                    data={classArray[i].props.data}
                    code={this.code} 
                    goalTime={this.state.goalTime} 
                    startAttendance={this.startAttendance} 
                />
            }
        }
        this.setState({
            classRowList: classArray,
        })
    }

    /**
     * Generates the attendance code for the class
     */
    generateAttendanceCode = () =>{
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        this.code = '';
        for (let i=0; i<4; i++){
            this.code += characters.charAt(Math.floor(Math.random() * characters.length))
        }
    }

    /**
     * Starts the attendance session for the class
     * 
     * @param {string} name the name of the class that is starting
     * attendance and the name is used to identify it
     * @param {bool} notRepeatingAttendance An optional parameter where
     * it generates a code if this is the classes first time doing attendance,
     * and if it's a repeat, a new code is not generated
     */
    startAttendance = (name, notRepeatingAttendance=true) =>{
        if (notRepeatingAttendance){
            this.generateAttendanceCode();
        }
        let classArray = this.state.classRowList.slice()
        for (let i=0; i<classArray.length; i++){
            if (classArray[i].props.data.name === name){
                classArray[i] = <ClassRow key={classArray[i].props.data.name} data={classArray[i].props.data} timesUp={this.attendanceTimeUp} code={this.code} goalTime={this.state.goalTime} startAttendance={this.startAttendance} />
            }else{
                classArray[i] = <ClassRow key={classArray[i].props.data.name} data={classArray[i].props.data} otherRowStartAttendance={true} />
            }
        }
        this.setState({
            NeedToShowAttendanceCode: true,
            classRowList: classArray,
        })
        setTimeout(function(){
            document.getElementById('attendance-code').style.visibility = 'visible';
        }, 900)
    }
     
    /**
     * Stops showing the user the attendance code, 
     * meant to be passed as props to ClassRow component
     */
    stopShowAttendanceCode = () =>{
        this.setState({NeedToShowAttendanceCode: false}) 
    }

    /**
     * Sends a request to the database for the instructors information as well
     * as the information of it's classes
     */
    componentDidMount(){
        axios.get('http://127.0.0.1:8080/users/getinstructor/5d79d7b12c301d1816288737')
        .then(res =>{
            let classRowList = this.generateDefaultClassRows(res.data.class_info)
            this.setState({
                classInfo: res.data.class_info,
                classRowList: classRowList,
                instructorInfo: res.data.instructor_info,
            })
        })
        .catch(err =>{
            console.log(err)
        })
    }

    render(){
        let AttendanceCodeBox = this.state.NeedToShowAttendanceCode ? <AttendanceCode code={this.code} handleClose={this.stopShowAttendanceCode} /> : <p style={{'display': 'none'}}></p>
        return(
            <React.Fragment>
                <div>
                    <Banner changeTime={this.changeTime} goalTime={this.state.goalTime} /> 
                    <table>
                        <tbody>
                            {this.state.classRowList}
                        </tbody>
                    </table>
                    <AddClass addClass={this.createNewClass} />
                </div>
                {AttendanceCodeBox}
            </React.Fragment>
        )
    }
}

export default ClassDashboard;