import React, { Component } from 'react';
import './styles/ReportStudentName.css';

class ReportStudentName extends Component {

    constructor(props){
        super(props)
        this.state = {
            isPresent: this.props
        }
        this.handleTransfer = this.handleTransfer.bind(this);
        this.changePresentStatus = this.changePresentStatus.bind(this);
    }

    changePresentStatus = presentStatus =>{
        this.setState({
            isPresent: presentStatus,
        })
    }

    handleTransfer = () =>{
        this.props.transfer(this.props.name, !this.props.isPresent)
    }

    render() {
        let nameReportSpan;
        if (this.props.shouldBeGreen){
            nameReportSpan = 
                <span style={{'color': '#17C61A'}} className='student-report-name' onClick={this.handleTransfer}>
                    {this.props.name}
                </span>
        }else{
            nameReportSpan = 
                <span style={{'color': '#FF0000'}} className='student-report-name' onClick={this.handleTransfer}>
                    {this.props.name}
                </span>
        }
        return (
            <React.Fragment>
                {nameReportSpan}
            </React.Fragment>
        );
    }
}

export default ReportStudentName;