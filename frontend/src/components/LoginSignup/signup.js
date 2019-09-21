import React from 'react';
import './signup.css'
import { NavLink } from 'react-router-dom';

class SignUp extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
     email: '',
     password: '',
     confirmPassword: ''
   }
   this.handleEmailChange = this.handleEmailChange.bind(this);
   this.handlePasswordChange = this.handlePasswordChange.bind(this);
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
 } else {
     // make API call
 }
 }

 render() {
   return (
   <div className="SignUp">

   <form className = "signupForm" onSubmit={this.handleSubmit} >
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
