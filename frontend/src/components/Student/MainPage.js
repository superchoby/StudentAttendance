import React from 'react';
import axios from 'axios';

class MainPage extends React.Component{
    componentDidMount(){
        axios.get('http://127.0.0.1:8080/users/getstudentinfo/5d79d8ccd1af111886f446c6')
        .then(res =>{
            console.log(res.data)
            console.log(res.data.class_info)
            for (let ClassInfo in res.data.class_info){
                ClassInfo.ClassCode ? alert('yo') : alert('bye')
            }
        })
        .catch(err =>{
            console.log('There was an error')
        })
    }
    render(){
        return(
            <div>
                <p>wutup</p>
            </div>
        )
    }
}

export default MainPage;
