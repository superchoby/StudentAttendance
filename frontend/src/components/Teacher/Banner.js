import React from 'react';
import './styles/Banner.css';
import DefaultTime from './DefaultTime';

/**
 * The top area of the dashboard that 
 * lets the teacher know they are in the dashboard 
 * section
 */
class Banner extends React.Component{

    render(){
        return(
            <div id='banner-div'>
                <div id='classes-header'>Classes</div>
                <DefaultTime changeTime={this.props.changeTime}  goalTime={this.props.goalTime}/>
            </div>
        )
    }
}

export default Banner;