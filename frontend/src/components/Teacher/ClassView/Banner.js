import React from 'react';
import './styles/Banner.css';
import DaysHeld from './DaysHeld';

/**
 * The top area of the dashboard that 
 * lets the teacher know they are in the dashboard 
 * section
 */
class Banner extends React.Component{

    render(){
        return(
            <div id='banner-div'>
                <div id='classname-header' className='dashboard-header'>{this.props.name}</div>
                <DaysHeld />
            </div>
        )
    }
}

export default Banner;