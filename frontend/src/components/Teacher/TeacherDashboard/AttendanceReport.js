import React, { Component } from 'react'
import './styles/AttendanceReport.css';
import ReportStudentName from './ReportStudentName';

export default class AttendanceReport extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             absentList: this.props.absentList,
             presentList: this.props.presentList,
        }
        this.handleClose = this.handleClose.bind(this);
        this.handleTransfer = this.handleTransfer.bind(this);
    }

    handleTransfer = (nameToTransfer, toPresent) =>{
        if (toPresent){
            let copyAbsentList = [...this.state.absentList]
            for (let i=0; i<this.state.absentList.length; i++){
                if (this.state.absentList[i].props.name === nameToTransfer){
                    // let removedStudent = copyAbsentList.splice(i, 1)
                    let removedStudentProps = copyAbsentList.splice(i, 1)[0].props
                    let tempStudent = <ReportStudentName key={removedStudentProps.name} isPresent={true} shouldBeGreen={removedStudentProps.shouldBeGreen} transfer={this.handleTransfer} name={removedStudentProps.name} />
                    let copyPresentList = [...this.state.presentList]
                    copyPresentList.push(tempStudent)
                    this.setState({
                        presentList: copyPresentList,
                        absentList: copyAbsentList,
                    })
                    break
                }
            }
        }else{
            let copyPresentList = [...this.state.presentList]
            for (let i=0; i<this.state.presentList.length; i++){
                if (this.state.presentList[i].props.name === nameToTransfer){
                    let removedStudentProps = copyPresentList.splice(i, 1)[0].props
                    let tempStudent = <ReportStudentName key={removedStudentProps.name} isPresent={false} shouldBeGreen={removedStudentProps.shouldBeGreen} transfer={this.handleTransfer} name={removedStudentProps.name} />
                    let copyAbsentList = [...this.state.absentList]
                    copyAbsentList.push(tempStudent)
                    this.setState({
                        presentList: copyPresentList,
                        absentList: copyAbsentList,
                    })
                    break
                }
            }
        }
    }

    handleClose = e =>{
        this.props.save(this.state.presentList, this.state.absentList);
        this.props.close();
    }

    componentDidMount(){
        let copyList = this.props.presentList.map(studentName =>{
            return <ReportStudentName key={studentName} isPresent={true} shouldBeGreen={true} transfer={this.handleTransfer} name={studentName} />
        })
        let copyOtherList = this.props.absentList.map(studentName =>{
            return <ReportStudentName key={studentName} isPresent={false} shouldBeGreen={false} transfer={this.handleTransfer} name={studentName} />
        })
        this.setState({
            presentList: copyList,
            absentList: copyOtherList,
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
                            {this.state.presentList}
                        </div>
                    </div>
                    <span id='report-divider-line'></span>
                    <h2>Absent</h2>
                    <div className='present-absent-div' id='absent-div'>
                        <div className='attendance-name-status'>
                            {this.state.absentList}
                        </div>
                    </div>
                </div>
            </div> 
        )
    }
}
