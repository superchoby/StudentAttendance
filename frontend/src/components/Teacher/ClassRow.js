import React from 'react';
import './styles/ClassRow.css';
import AttendanceStartTD from './AttendanceStartTD';

class ClassRow extends React.Component{
    constructor(props) {
        super(props)
    
        this.state = {
            attendanceGoingOn: false,
        }
        this.handleClick = this.handleClick.bind(this);        
    }

    handleClick = () =>{
        console.log('hows life')
        this.props.startAttendance()
        this.setState({
            attendanceGoingOn: true,
        })
    }

    render(){
        let attendanceTD =  this.state.attendanceGoingOn ? 
        <AttendanceStartTD code={this.props.code} goalTime={this.props.goalTime} /> 
        :
        <td className='start-attendence-td' onClick={this.handleClick}>Start Attendence</td>

        return(
            <React.Fragment>
                <tr className='anime-info-row'>
                    <td className='blank-td'></td>
                    <td id='class-name-td'>osu</td>
                    {attendanceTD}
                </tr>
            </React.Fragment>
        )
    }
}

export default ClassRow;