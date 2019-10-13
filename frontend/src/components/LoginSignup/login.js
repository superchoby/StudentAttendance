import React from 'react';
import './login.css'
import axios from 'axios'
import ForgotPassPopUp from './ForgotPassPopUp.js'
import { NavLink } from 'react-router-dom';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
class Login extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
     email: '',
     password: '',
     isStudent: true,
     isTeacher: false,

   }

   this.handleEmailChange = this.handleEmailChange.bind(this);
   this.handleMenuChange = this.handleMenuChange.bind(this);
   this.handlePasswordChange = this.handlePasswordChange.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
 }




handleEmailChange(e) {
  this.setState({
    email : e.target.value
  })
}

handlePasswordChange(e) {
  this.setState({
    password: e.target.value
  })

}

handleMenuChange(e) {
  e.preventDefault();
  this.setState(prevState => ({
  isStudent: !prevState.isStudent,
  isTeacher: prevState.isStudent
}));

console.log(this.state.isStudent + " " + this.state.isTeacher);
console.log(this.state.active)
}
 handleSubmit(e) {
   e.preventDefault();
   if(this.state.isStudent) {
     axios.post('http://127.0.0.1:8080/users/getStudent', {
      email: this.state.email,
      password: this.state.password
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
    else  {
      axios.post('http://127.0.0.1:8080/users/getTeacher', {
       email: this.state.email,
       password: this.state.password
     })
     .then(function (response) {
       console.log(response);
     })
     .catch(function (error) {
       console.log(error);
     });
    }
}

render() {
  const styles = {
  root: {
    '&$disabled': {
      color: 'white',
    },
  },
  disabled: {},
};
  return (

  <div className="Login">
  <form className = "loginForm" onSubmit={this.handleSubmit} >
    <div className = "loginHeader" >
    <ToggleButtonGroup onChange = {this.handleMenuChange}  exclusive = {true}>
    <ToggleButton selected = {this.state.isStudent}> Student</ToggleButton>
    <ToggleButton selected = {this.state.isTeacher}> Teacher</ToggleButton>
    </ToggleButtonGroup >
    </div>
    <div className = "loginBoxes">
      <h4 className = "emailTitle"> Email </h4>
      <input type ="logemail" value={this.state.email}
      class = "test" placeholder = "Enter email" onChange = {this.handleEmailChange}>
      </input>
      <h4 className = "passwordTitle"> Password </h4>
      <input type = "logpassword" value={this.state.password}
           placeholder = "Enter password" onChange = {this.handlePasswordChange}>
      </input>
    </div>
    <a className = "forgotPass"> Forgot Password? </a>
    <h5 className = "needAccount"> Don't have an account? <a><NavLink to = "/SignUp"> Create account</NavLink> </a> </h5>
    <button type = "submitLogin" > Submit </button>
  </form>
</div>
);
}
}

export default Login
