import React from 'react';
import Signup from './signup.js'
import axios from 'axios'
import './signup.css'
import { NavLink } from 'react-router-dom';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';



class SignUp extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
     email: '',
     password: '',
     confirmPassword: '',
     isStudent: true,
     isTeacher: false
   }
   this.handleEmailChange = this.handleEmailChange.bind(this);
   this.handlePasswordChange = this.handlePasswordChange.bind(this);
   this.handleMenuChange = this.handleMenuChange.bind(this);
   this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
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
 }), function(){
   console.log(this.state.isStudent + " " + this.state.isTeacher);
 });


 }

 handleConfirmPasswordChange(e) {
   this.setState({
     confirmPassword: e.target.value
   })
 }

 handleSubmit(e) {
   e.preventDefault();

   // perform all neccassary validations
   if (this.state.password !== this.state.confirmPassword) {
     alert("Passwords don't match");
 } else if(this.state.isTeacher) {
        axios.post('http://127.0.0.1:8080/users/getInstructor', {
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
    else {
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
  }


 render() {
   return (
   <div className="SignUp">

   <form className = "signupForm" onSubmit={this.handleSubmit} >
     <div className = "signupHeader" >
     <ToggleButtonGroup onChange = {this.handleMenuChange}  exclusive = {true}>
     <ToggleButton selected = {this.state.isStudent}> Student</ToggleButton>
     <ToggleButton selected = {this.state.isTeacher}> Teacher</ToggleButton>
     </ToggleButtonGroup >
     </div>
      <h2 className = "accHeader"> Account Creation </h2>


     <div className = "signupBoxes">
       <h4 className = "emailTitle"> Email </h4>
       <input type ="email" value={this.state.email}
       class = "test" placeholder = "Enter email" onChange = {this.handleEmailChange}>
       </input>

       <h4 className = "passwordTitle"> Password </h4>
       <input type = "password" value={this.state.password}
            placeholder = "Enter password" onChange = {this.handlePasswordChange}>
       </input>

       <h4 className = "passwordConfirmTitle"> Confirm Password </h4>
       <input type = "confirmPassword" value={this.state.confirmPassword}
            placeholder = "Confirm password" onChange = {this.handleConfirmPasswordChange}>
       </input>
     </div>

     <button type = "createAccount" > Create account </button>
      <h5 className = "haveAccount"> Already have an account? <a><NavLink to = "/"> Login</NavLink> </a> </h5>
   </form>
 </div>
 );
 }
}

export default SignUp
