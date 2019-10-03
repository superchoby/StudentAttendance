import React, { Component } from 'react';
import './styles/ConfirmCancel.css';

class ConfirmCancel extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            cancelDisabled: true,
            cancelText: '',
        }
        this.handleCancel = this.handleCancel.bind(this)
        this.handleCancelTextChange = this.handleCancelTextChange.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    handleClose = () =>{
        this.props.closeCancelBox()
    }

    handleCancelTextChange = e =>{
        if (e.target.value.toLowerCase() === 'cancel'){
            this.setState({
                cancelText: e.target.value,
                cancelDisabled: false,
            })
        }else{
            this.setState({
                cancelText: e.target.value,
            })
        }
    }

    handleCancel = e =>{
        e.preventDefault();
        this.props.cancelAttendance();
    }

    render() {
        return (
            <div className='gray-cover'>
                <div id='cancel-div'>
                    <span id='close-circle' className='visibility' onClick={this.handleClose}>
                        <p>&#10005;</p>
                    </span>
                    <h1 style={{'marginLeft': '25px', 'marginTop': '15%'}} className='visibility'>Type "cancel" to confirm</h1>
                    <div id='cancel-form-div' className='visibility'>
                        <form style={{'marginLeft': '25px'}} onSubmit={this.handleCancel}>
                            <input id='cancel-attendance' value={this.state.cancelText} onChange={this.handleCancelTextChange} autoComplete="off" />
                            <button type='submit' disabled={this.state.cancelDisabled}>cancel</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default ConfirmCancel;