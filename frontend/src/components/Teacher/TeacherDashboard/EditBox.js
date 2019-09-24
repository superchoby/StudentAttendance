import React, { Component } from 'react'

export default class EditBox extends Component {
    render() {
        return (
            <div className='gray-cover'>
                <div id='edit-div'>
                    <span id='close-circle' onClick={this.props.handleClose}>
                        <p>&#10005;</p>
                    </span>
                    <div id='edit-form-div'>
                        <h1 style={{'marginLeft': '25px'}}>Create a Class</h1>
                        <form style={{'marginLeft': '25px'}} onSubmit={this.handleSubmit}>
                            <input id='class-name-edit' defaultValue={this.props.name} onChange={this.handleClassNameChange} autoComplete="off" />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
