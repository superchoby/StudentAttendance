import React from 'react';
import './styles/StudentRow.css';
import ReactTooltip from 'react-tooltip';

class StudentRow extends React.Component{
    constructor(props) {
        super(props)
    
        this.generateDateRows = this.generateDateRows.bind(this);
    }

    generateDateRows = dateList =>{
        return dateList.map(date =>{
            let dateObj = new Date(date)
            let day = dateObj.getDate().length === 2 ? dateObj.getDate() : '0' + dateObj.getDate()
            return dateObj.getMonth() + '/' + day + '/' + dateObj.getFullYear()
        })
    }

    render(){
        let daysPresent = this.generateDateRows(this.props.data.DaysPresent)
        let daysLate = this.generateDateRows(this.props.data.DaysLate)
        let daysExcusedAbsences = this.generateDateRows(this.props.data.DaysExcusedAbsences)
        let daysUnexcusedAbsences = this.generateDateRows(this.props.data.DaysUnexcusedAbsences)

        return(
            <React.Fragment>
                <tr className='info-row'>
                    <td className='blank-td' style={{'width': '10%'}}></td>
                    <td className='student-name-td' style={{'textAlign': 'left'}}>{this.props.data.FullName}</td>
                    {/* <td className='student-name-td'>{this.props.data.DaysPresent.length}</td> */}
                    <td data-tip data-for='daysPresent' className='student-name-td'>{this.props.data.DaysPresent.length}</td>
                    <td data-tip data-for='daysLate' className='student-name-td'>{this.props.data.DaysLate.length}</td>
                    <td data-tip data-for='daysExcusedAbsences' className='student-name-td'>{this.props.data.DaysExcusedAbsences.length}</td>
                    <td data-tip data-for='daysUnexcusedAbsences' className='student-name-td'>{this.props.data.DaysUnexcusedAbsences.length}</td>
                </tr>

                <ReactTooltip id='daysPresent'>
                    <div>{daysPresent}</div>
                </ReactTooltip>

                <ReactTooltip id='daysLate'>
                    <div>{daysLate}</div>
                </ReactTooltip>

                <ReactTooltip id='daysExcusedAbsences'>
                    <div>{daysExcusedAbsences}</div>
                </ReactTooltip>

                <ReactTooltip id='daysUnexcusedAbsences'>
                    <div>{daysUnexcusedAbsences}</div>
                </ReactTooltip>

            </React.Fragment>
        )
    }
    
}

export default StudentRow