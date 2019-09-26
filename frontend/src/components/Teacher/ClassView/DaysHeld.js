import React, { Component } from 'react'
import './styles/DaysHeld.css';

export default class DaysHeld extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        return (
            <div className='classes-held'>
                <span>Class Sessions Held:</span>
                <div>10</div>
            </div>
        )
    }
}
