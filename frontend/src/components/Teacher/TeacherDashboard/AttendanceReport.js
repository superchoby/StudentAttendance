import React, { Component } from 'react'
import './styles/AttendanceReport.css';
import './ReportStudentName';
import ReportStudentName from './ReportStudentName';

export default class AttendanceReport extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             absentList: [],
             presentList: [],
        }
        this.handleClose = this.handleClose.bind(this);
        this.handleTransfer = this.handleTransfer.bind(this);
    }

    handleTransfer = 

    handleClose = e =>{
        this.props.close();
    }

    componentDidMount(){
        const testList = ['Tommy Trinh', 'miyuki shirogane','chika fujiwara', 'kaguya shinomiya','Tommy Trinh', 'miyuki shirogane','chika fujiwara', 'kaguya shinomiya','Tommy Trinh', 'miyuki shirogane','chika fujiwara', 'kaguya shinomiya','Tommy Trinh', 'miyuki shirogane','chika fujiwara', 'kaguya shinomiya','Tommy Trinh', 'miyuki shirogane','chika fujiwara', 'kaguya shinomiya','Tommy Trinh', 'miyuki shirogane','chika fujiwara', 'kaguya shinomiya','Tommy Trinh', 'miyuki shirogane','chika fujiwara', 'kaguya shinomiya','Tommy Trinh', 'miyuki shirogane','chika fujiwara', 'kaguya shinomiya','Tommy Trinh', 'miyuki shirogane','chika fujiwara', 'kaguya shinomiya','Tommy Trinh', 'miyuki shirogane','chika fujiwara', 'kaguya shinomiya','Tommy Trinh', 'miyuki shirogane','chika fujiwara', 'kaguya shinomiya','Tommy Trinh', 'miyuki shirogane','chika fujiwara', 'kaguya shinomiya','Tommy Trinh', 'miyuki shirogane','chika fujiwara', 'kaguya shinomiya']
        let copyList = testList.map(studentName =>{
            return <ReportStudentName key={studentName} transfer={this.handleTransfer} name={studentName} />
        })
        this.setState({
            absentList: copyList,
        })
    }
    
    render() {
        return (
            <div className='gray-cover'>
                <div id='report-div'>
                    <span id='close-circle' onClick={this.handleClose}>
                        <p>&#10005;</p>
                    </span>
                    <h2>&nbsp;&nbsp;Present</h2>
                    <div className='present-absent-div' id='present-div'>
                        <div className='attendance-name-status'>
                            {this.state.absentList}
                        </div>
                    </div>
                    <span id='report-divider-line'></span>
                    <h2>Absent</h2>
                    <div className='present-absent-div' id='absent-div'>
                        <div className='attendance-name-status'>

                        </div>
                    </div>
                </div>
            </div> 
        )
    }
}
