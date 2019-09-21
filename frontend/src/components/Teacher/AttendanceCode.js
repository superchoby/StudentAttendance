import React from 'react';
import './styles/AttendanceCode.css';
import PropTypes from 'prop-types';

/**
 * The box that displays the attendance code to the
 * instructor in an easy to read format
 */
class AttendanceCode extends React.Component{
    render(){
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


AttendanceCode.propTypes = {
    /** Has the box close when clicked */
    handleClose: PropTypes.func.isRequired,
    /** The attendance code to be displayed */
    code: PropTypes.string.isRequired,
}
export default AttendanceCode;