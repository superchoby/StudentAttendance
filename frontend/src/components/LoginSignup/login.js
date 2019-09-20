import React from 'react';
import './login.css'
import ForgotPassPopUp from './ForgotPassPopUp.js'
import { NavLink } from 'react-router-dom';

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

   console.log(this.state.email + " " + this.state.password)

 }

render() {

  return (

  <div className="Login">
  <form className = "loginForm" onSubmit={this.handleSubmit} >

      <ul id = "header">

      <li id = "Students"  onClick = {this.handleMenuChange} ><NavLink> Students</NavLink></li>
      <li id = "Teachers" onClick = {this.handleMenuChange}><NavLink >Teachers </NavLink></li>
      </ul>
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
    <button type = "submit" > Submit </button>
  </form>
</div>
);
}
}

export default Login
