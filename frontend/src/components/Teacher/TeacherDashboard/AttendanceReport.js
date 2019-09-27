import React, { Component } from 'react'
import './styles/AttendanceReport.css';

export default class AttendanceReport extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        return (
            <div className='gray-cover'>
                <div id='report-div'>
                    <span id='close-circle' onClick={this.handleClose}>
                        <p>&#10005;</p>
                    </span>
                    <h2 style={{'marginBottom':'0'}}>Present</h2>
                    <div className='present-absent-div' id='present-div'>
                        <div className='attendance-name-status'></div>
                        <div className='attendance-name-status'></div>
                        <div className='attendance-name-status'></div>
                    </div>
                    <span id='report-divider-line'></span>
                    <h2>Absent</h2>
                    <div className='present-absent-div' id='absent-div'>
                        <div className='attendance-name-status'></div>
                        <div className='attendance-name-status'></div>
                        <div className='attendance-name-status'></div>
                    </div>
                </div>
            </div> 
        )
    }
}
