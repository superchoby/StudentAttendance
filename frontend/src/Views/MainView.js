import React from 'react'
import Login from '../components/LoginSignup/login.js'
import SignUp from '../components/LoginSignup/signup.js'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class MainView extends React.Component {
  render() {
    return (
    <BrowserRouter>
        <div>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/signup' component={SignUp}/>
          </Switch>
        </div>
      </BrowserRouter>
  )
}
};
export default MainView
