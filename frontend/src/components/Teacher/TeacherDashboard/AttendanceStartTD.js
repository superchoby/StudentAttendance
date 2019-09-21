import React from 'react';
import Timer from './Timer';
import './styles/AttendanceStartTD.css';
import PropTypes from 'prop-types';

/**
 * These are 3 tds that provide information on the 
 * attendance session, they tell the code, the amount
 * of time left for the attendance session, and the 
 * amount of students that have recorded themselves as
 * present
 */
class AttendanceStartTD extends React.Component{
    render(){
        return(
            <React.Fragment>
                <td className='attendance-td'>
                    {this.props.code}
                </td>
                <Timer name={this.props.name} timesUp={this.props.timesUp} goalTime={this.props.goalTime} />
                <td className='attendance-td'>
                    10/16
                </td>
            </React.Fragment>
        )
    }
}

AttendanceStartTD.propTypes = {
    /** The attendance code */
    code: PropTypes.string.isRequired,
    /** The name of the classroom */
    name: PropTypes.string.isRequired,
    /** 
     * Function that occurs when time is up,
     * meant to be passed down as props to the
     * **Timer** component 
     */
    timesUp: PropTypes.func.isRequired,
    /** 
     * The time in seconds, of the attendance duration
     * Meant to be passed down as props to the
     * **Timer** component 
     */
    goalTime: PropTypes.number.isRequired,
}

export default AttendanceStartTD;