import React from 'react';
import Banner from './Banner';
import axios from 'axios';
import StudentRow from './StudentRow';
import './styles/ClassView.css';
import DateTooltip from './DateTooltip';

class ClassView extends React.Component{

    constructor(props) {
        super(props)
    
        this.state = {
            studentRowsList: [],
            className: '',
        }
        this.generateStudentRows = this.generateStudentRows.bind(this)
    }
    
    generateStudentRows = studentArray =>{
        return studentArray.map(studentInfo =>{
            return <StudentRow key={studentInfo.FullName} data={studentInfo} />
        })
    }

    componentDidMount(){
        let url = 'http://127.0.0.1:8080/users/getclassinfo/' + this.props.match.params.class_id;
        axios.get(url)
        .then(res =>{
            let studentRows = this.generateStudentRows(res.data.student_info)
            this.setState({
                studentRowsList: studentRows,
                Name: res.data.class_info.Name,
            })
        })
        .catch(err =>{
            console.log(err)
        })
    }

    render(){
        return(
            <div className='whole-page-div'>
                <Banner name={this.state.Name} /> 
                {/* <DateTooltip /> */}
                <table>
                    <thead className='info-row'>
                        <tr className='info-row'>
                            <td className='blank-td' style={{'width': '10%'}}></td>
                            <td style={{'textAlign': 'left'}}>Name</td>
                            <td className='attendance-info'>Present</td>
                            <td className='attendance-info'>Late</td>
                            <td className='attendance-info'>Unexcused Absences</td>
                            <td className='attendance-info'>Excused Absences</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.studentRowsList}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ClassView;