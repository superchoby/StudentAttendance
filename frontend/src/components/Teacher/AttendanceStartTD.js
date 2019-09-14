import React from 'react';
import Timer from './Timer';
import './styles/AttendanceStartTD.css';

class AttendanceStartTD extends React.Component{
    render(){
        return(
            <React.Fragment>
                <td className='attendance-td' id='attendance-code-td'>
                    {this.props.code}
                </td>
                <Timer goalTime={this.props.goalTime} />
                <td className='attendance-td'>
                    10/16
                </td>
            </React.Fragment>
        )
    }
}

export default AttendanceStartTD;