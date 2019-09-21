import React from 'react';
import './App.css';
import ClassDashboard from './components/Teacher/TeacherDashboard/TeacherDashboard';
import ClassView from './components/Teacher/ClassView/ClassView';
import { BrowserRouter, Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
        <Route exact path='/' component={ClassDashboard} />
        <Route path='/viewclassinfo/:class_id' component={ClassView} />
    </BrowserRouter>
  );
}


export default App;
