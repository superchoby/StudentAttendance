import React from 'react';
import './styles/AttendanceCode.css';

class AttendanceCode extends React.Component{

    render(){
        console.log(this.props.code)
        return(
            <div id='gray-cover'>
                <div id='attendance-code-div'>
                    <span id='close-circle' onClick={this.props.handleClose}>
                        <p>&#10005;</p>
                    </span>
                    <div id='attendance-code'>
                        <h2>Attendance Code:</h2>
                        <span>
                            {this.props.code}
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

export default AttendanceCode;