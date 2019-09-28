import React, { Component } from 'react';
import './styles/ReportStudentName.css';

class ReportStudentName extends Component {


    render() {
        return (
            <span className='student-report-name'>
                {this.props.name}
            </span>
        );
    }
}

export default ReportStudentName;