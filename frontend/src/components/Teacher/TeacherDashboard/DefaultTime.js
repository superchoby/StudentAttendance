import React from 'react';
import './styles/DefaultTime.css';

/**
 * Shows the attendance time set by the teacher
 */
class DefaultTime extends React.Component{

    constructor(props) {
        super(props)
    
        this.state = {
             defaultTime: this.props.goalTime,
             wantToChangeTime: false,
             goalTime: this.props.goalTime,
        }
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.test = this.test.bind(this);
    }

    test = e =>{
        e.preventDefault()
        let timeValues = document.getElementsByClassName('time-change-inputs')
        let minutes = parseInt(timeValues[0].value !== '' ? timeValues[0].value : '0')
        let seconds = parseInt(timeValues[2].value !== '' ? timeValues[2].value : '0')
        let timeConverted = minutes * 60 + seconds;
        this.setState({
            goalTime: timeConverted,
            wantToChangeTime: false,
        })
        this.props.changeTime(timeConverted)
    }

    handleTimeChange = e =>{
        this.setState({
            wantToChangeTime: true,
        })
    }
    
    
    render(){
        let minutes = (Math.floor(this.state.goalTime/60)).toString()
        let seconds = (this.state.goalTime % 60).toString()
        let secondsAdjusted = seconds.length === 2 ? seconds : '0' + seconds;
        let timeDisplay = this.state.wantToChangeTime ? 
        <form onSubmit={this.test}>
            <input defaultValue={minutes} className='time-change-inputs' />
                <p className='time-change-inputs' style={{'textDecoration':'none'}}>{':'}</p>
            <input defaultValue={secondsAdjusted} className='time-change-inputs' />
            <input style={{'display': 'none'}} type='submit' value='set' />
        </form> 
        : 
        (minutes + ':' + secondsAdjusted);
        let changeButton = this.state.wantToChangeTime ? <p style={{'display':'none'}}></p> : <p onClick={this.handleTimeChange}>change</p>;
        return(
            <div className='default-time-div'>
                <span>Default Attendance Time:</span>
                <div>{timeDisplay}</div>
                {changeButton}
            </div>
        )
    }
}

export default DefaultTime;