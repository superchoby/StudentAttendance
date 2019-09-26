import React, { Component } from 'react'
import './styles/EditBox.css'
import axios from 'axios'

export default class EditBox extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            classNameText: this.props.name,
            deleteClassText: '',
            deleteDisabled: true,
        }

        this.handleClassNameChange = this.handleClassNameChange.bind(this);
        this.deleteChange = this.deleteChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.updateClassName = this.updateClassName.bind(this);
    }

    updateClassName = e =>{
        e.preventDefault();
        this.props.update(this.props.name, this.state.classNameText);
        let url = 'http://127.0.0.1:8080/users/updateclassname/' + this.props.classID;
        axios.post(url, {name: this.state.classNameText})
        .then(res =>{
            console.log(res)
        })
        .catch(err =>{
            console.log(err)
        })
    }

    handleDelete = e =>{
        e.preventDefault();
        let url = 'http://127.0.0.1:8080/users/deleteclass/' + this.props.classID;
        this.props.delete(this.props.name)
        axios.delete(url)
        .then(res =>{
            console.log(res)
        })
        .catch(err =>{
            console.log(err)
        })
    }

    handleClassNameChange = e =>{
        this.setState({
            classNameText: e.target.value,
        })
    }

    handleClose = () =>{
        this.props.handleEditCancel();
    }

    deleteChange = e =>{
        if (e.target.value === this.props.name){
            this.setState({
                deleteClassText: e.target.value,
                deleteDisabled: false,
            })
        }else{
            this.setState({
                deleteClassText: e.target.value,
                deleteDisabled: true,
            })
        }
    }
    
    render() {
        setTimeout(function(){
            if(document.getElementById('visibility') !== null)
                document.getElementById('visibility').style.visibility = 'visible';
        }, 900)
        
        let deleteText = this.state.deleteDisabled ? 'Type the Class Name First' : 'Delete'
        return (
            <div className='gray-cover'>
                <div id='edit-div'>

                    <div id='visibility'>
                        <span id='close-circle' onClick={this.handleClose}>
                            <p>&#10005;</p>
                        </span>
                        <h1 style={{'marginLeft': '25px'}}>Create a Class</h1>
                        <div id='edit-form-div'>
                            <form style={{'marginLeft': '25px'}} onSubmit={this.updateClassName}>
                                <h3>Change Class Name:</h3>
                                <input id='class-name-edit' value={this.state.classNameText} onChange={this.handleClassNameChange} autoComplete="off" />
                            </form>
                            <form style={{'marginLeft': '25px'}} onSubmit={this.handleDelete}>
                                <h3 id='delete-h3'>Delete Class:</h3>
                                <input id='delete-class' value={this.state.deleteClassText} onChange={this.deleteChange} autoComplete="off" />
                                <button type='submit' disabled={this.state.deleteDisabled}>{deleteText}</button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}