import React from 'react';
import Banner from './Banner';
import ClassRow from './ClassRow';
import './styles/ClassDashboard.css';
import AttendanceCode from './AttendanceCode';

class ClassDashboard extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
             NeedToShowAttendanceCode: false,
             currentAttendanceCode: '',
             goalTime: 0,
        }
        this.startAttendance = this.startAttendance.bind(this);
        this.stopShowAttendanceCode = this.stopShowAttendanceCode.bind(this);
        this.generateAttendanceCode = this.generateAttendanceCode.bind(this);
    }

    generateAttendanceCode = () =>{
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        this.code = '';
        for (let i=0; i<6; i++){
            this.code += characters.charAt(Math.floor(Math.random() * characters.length))
        }
    }

    startAttendance = () =>{
        this.generateAttendanceCode();
        this.setState({
            NeedToShowAttendanceCode: true,
            goalTime: 5,
        })
        setTimeout(function(){
            document.getElementById('attendance-code').style.visibility = 'visible';
        }, 900)
    }
                                       
    stopShowAttendanceCode = () =>{
        this.setState({NeedToShowAttendanceCode: false}) 
    }

    render(){
        let AttendanceCodeBox = this.state.NeedToShowAttendanceCode ? <AttendanceCode code={this.code} handleClose={this.stopShowAttendanceCode} /> : <p style={{'display': 'none'}}></p>
        return(
            <React.Fragment>
                <div>
                    <Banner /> 
                    <table>
                        <tbody>
                            <ClassRow code={this.code} goalTime={this.state.goalTime} startAttendance={this.startAttendance} />
                        </tbody>
                    </table>
                </div>
                {AttendanceCodeBox}
            </React.Fragment>
        )
    }
}

export default ClassDashboard;