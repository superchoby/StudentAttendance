import React from 'react';
import Banner from './Banner';
import ClassRow from './ClassRow';
import './styles/ClassDashboard.css';
import AttendanceCode from './AttendanceCode';
import axios from 'axios';
import { connect } from 'react-redux';
import './styles/TeacherDashboard.css';
import AddClass from './AddClass';
import { storeStudents, storeDefaultTime, storeInstructorId } from '../../../actions/index';

function mapDispatchToProps(dispatch) {
    return {
        storeStudents: students => dispatch(storeStudents(students)),
        changeTime: time => dispatch(storeDefaultTime(time)),
        storeInstructorId: id => dispatch(storeInstructorId(id)),
    }
}

/**
 * The parent component that contaiandns the entire page
 * for the teacher's dashboard
 */
class ClassDashboardComponent extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
             NeedToShowAttendanceCode: false,
             currentAttendanceCode: '',
        }
        this.startAttendance = this.startAttendance.bind(this);
        this.stopShowAttendanceCode = this.stopShowAttendanceCode.bind(this);
        this.generateAttendanceCode = this.generateAttendanceCode.bind(this);
        this.attendanceTimeUp = this.attendanceTimeUp.bind(this);
        this.generateDefaultClassRows = this.generateDefaultClassRows.bind(this);
        this.resetRows = this.resetRows.bind(this);
        this.createNewClass = this.createNewClass.bind(this);
        this.deleteClass = this.deleteClass.bind(this);
        this.updateClassName = this.updateClassName.bind(this);
    }

    updateClassName = (classNameOriginal, classNameNew) =>{
        for (let i=0; i<this.state.classRowList.length; i++){
            if (this.state.classRowList[i].props.data.name === classNameOriginal){
                let classRowCopy = [...this.state.classRowList]
                classRowCopy[i].props.data.name = classNameNew;
                this.setState({
                    classRowList: classRowCopy,
                })
                break;
            }
        }
    }

    deleteClass = className =>{
        for (let i=0; i<this.state.classRowList.length; i++){
            if (this.state.classRowList[i].props.data.name === className){
                let classRowCopy = [...this.state.classRowList]
                classRowCopy.splice(i, 1)
                this.setState({
                    classRowList: classRowCopy,
                })
                break;
            }
        }
    }

    createNewClass = classData =>{
        let currentClassRows = this.state.classRowList
        console.log('wutup')
        let newRow = <ClassRow update={this.updateClassName} delete={this.deleteClass} key={classData.name} data={classData} startAttendance={this.startAttendance} />
        this.setState({
            classRowList: [...currentClassRows, newRow]
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
            return <ClassRow key={class_info.name} update={this.updateClassName} data={class_info} delete={this.deleteClass} startAttendance={this.startAttendance} />
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
            if (classArray[i].props.data.name === name){
                classArray[i] = <ClassRow 
                    cancelAttendance={this.resetRows}
                    key={classArray[i].props.data.name} 
                    attendanceEnded={true} 
                    resetRows={this.resetRows} 
                    data={classArray[i].props.data}
                    code={this.code} 
                    goalTime={this.state.goalTime} 
                    update={this.updateClassName}
                    delete={this.deleteClass}
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
        const badWords4Letters = ['fuck','shit','nigg','damn','hell','cunt','twat','slut']
        // badWords3Letters = ['ass','cum']
        while(true){
            for (let i=0; i<4; i++){
                this.code += characters.charAt(Math.floor(Math.random() * characters.length))
            }
            if(badWords4Letters.includes(this.code.toUpperCase())){
                this.code = ''
            }else if(this.code.includes('ass') || this.code.includes('cum')){
                this.code = ''
            }else{
                break
            }
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
                classArray[i] = <ClassRow key={classArray[i].props.data.name} cancelAttendance={this.resetRows} data={classArray[i].props.data} timesUp={this.attendanceTimeUp} code={this.code} goalTime={this.state.goalTime} startAttendance={this.startAttendance} />
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
        axios.post('http://127.0.0.1:8080/users/v1/getinstructor', {email: 'teacher@teacher.com'})
        .then(res =>{
            let classRowList = this.generateDefaultClassRows(res.data.class_info)
            this.props.changeTime(res.data.instructor_info.AttendanceTime)
            this.setState({
                classInfo: res.data.class_info,
                classRowList: classRowList,
                instructorInfo: res.data.instructor_info,
            })
            this.props.storeInstructorId(res.data.instructor_info._id)
            let classesAndStudents = {}
            let axiosRequests = []
            for (let clss of res.data.class_info){
                let url = 'http://127.0.0.1:8080/users/v1/getclassinfo/' + clss.id;
                axiosRequests.push(axios.get(url))
            }
            axios.all(axiosRequests)
            .then(res =>{
                for(let i=0; i<res.length; i++){
                    classesAndStudents[res[i].data.class_info._id] = {
                        ClassName: res[i].data.class_info.Name,
                        studentInfo: res[i].data.student_info,
                    }
                }
                this.props.storeStudents(classesAndStudents)
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
                    <Banner goalTime={this.state.goalTime} /> 
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

const ClassDashboard = connect(null, mapDispatchToProps)(ClassDashboardComponent)

export default ClassDashboard;