import React from 'react';
import Banner from './Banner';
import StudentRow from './StudentRow';
import './styles/ClassView.css';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return { 
        students: state.students,
    };
}

class ClassViewComponent extends React.Component{

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
        let student = this.props.students[this.props.match.params.class_id]
        let studentRows = this.generateStudentRows(student.studentInfo)
        this.setState({
            studentRowsList: studentRows,
            Name: student.ClassName,
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

const ClassView = connect(mapStateToProps)(ClassViewComponent)

export default ClassView;