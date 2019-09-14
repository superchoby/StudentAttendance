import React from 'react';

class Timer extends React.Component{
    constructor(props) {
        super(props)
    
        this.state = {
            minutes: 0,
            seconds: 0,
            minutesSTR: '',
            secondsSTR: '',
        }
        this.countTime = this.countTime.bind(this);
        this.timerInterval = null;
    }

    countTime = () => {
        if(this.state.seconds === 59){
            this.setState({minutes: this.state.minutes + 1, seconds: -1});
        }
        let currentSeconds = this.state.seconds + 1;
        this.setState({
            minutesSTR: (this.state.minutes.toString()), 
            secondsSTR: ('0' + currentSeconds.toString()).slice(-2),
            seconds: currentSeconds,
        })
        if(this.state.minutes*60 + this.state.seconds === this.props.goalTime){
            clearInterval(this.timerInterval);
        }
    }

    componentDidMount(){
        this.timerInterval = setInterval(() => {
            this.countTime();
        }, 1000);
    }

    render(){
        return(
            <td className='attendance-td'>
                {this.state.minutesSTR}:{this.state.secondsSTR}
            </td>
        )
    }
    
}

export default Timer;