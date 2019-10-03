import React from 'react';
import './styles/AddClass.css';
import axios from 'axios';

class AddClass extends React.Component{
    constructor(props) {
        super(props)
    
        this.state = {
             addingClass: false,
             className: '',
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClassNameChange = this.handleClassNameChange.bind(this);
    }

    handleClassNameChange = e =>{
        this.setState({
            className: e.target.value,
        })
    }

    handleSubmit = e =>{
        let global = this
        e.preventDefault()
        axios.post('http://127.0.0.1:8080/users/v1/createclassroom', {
            "name": this.state.className,
            "email": "teacher@teacher.com"
        })
        .then(function (response) {
            global.props.addClass({
                name: global.state.className,
                id: response.data.id
            })
        })
        .catch(function (error) {
            console.log(error);
        });
        this.setState({
            addingClass: false,
        })
          
    }

    handleClose = () =>{
        this.setState({
            addingClass: false,
        })
    }

    handleClick = () =>{
        this.setState({
            addingClass: true,
        })
    }
    
    render(){
        let addClass;
        if(this.state.addingClass){
            addClass =  <div className='gray-cover'>
                            <div id='add-class-div'>
                                <span id='close-circle' onClick={this.handleClose}>
                                    <p>&#10005;</p>
                                </span>
                                <div id='class-form-div'>
                                    <h1 style={{'marginLeft': '25px'}}>Create a Class</h1>
                                    <form style={{'marginLeft': '25px'}} onSubmit={this.handleSubmit}>
                                        <input id='class-name-input' placeholder='Class Name' onChange={this.handleClassNameChange} autoComplete="off" />
                                    </form>
                                </div>
                            </div>
                        </div>
        }else{
            addClass = <div id='add-class-button' onClick={this.handleClick}>Add Class</div>
        }
        return(
            <React.Fragment>
                {addClass}
            </React.Fragment>
        )
    }
}

export default AddClass;