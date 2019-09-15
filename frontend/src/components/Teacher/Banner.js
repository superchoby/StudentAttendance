import React from 'react';
import './styles/Banner.css';

/**
 * The top area of the dashboard that 
 * lets the teacher know they are in the dashboard 
 * section
 */
class Banner extends React.Component{

    render(){
        return(
            <div id='banner-div'>
                <p>Classes</p>
            </div>
        )
    }
}

export default Banner;