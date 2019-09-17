import React from 'react';
import './styles/DefaultTime.css';

class DefaultTime extends React.Component{

    
    render(){
        const defaultTime = '5:00'
        return(
            <div className='default-time-div'>
                <span>Default Attendance Time:</span>
                <div>{defaultTime}</div>
                <p>change</p>
            </div>
        )
    }
}

export default DefaultTime;