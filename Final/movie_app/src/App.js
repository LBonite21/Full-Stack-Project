import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";

import Login from './components/login';
import SignUp from './components/signUp';
import EditAccount from './components/editAccount';
import Movie from './components/movie';
import Reset from './components/reset';

class App extends Component {

  render() {
    let isLoggedIn = false;
    if (sessionStorage.getItem('user')) {
      isLoggedIn = true;
    }

    return(
      <Router>
        <Route path='/' exact component={Login}/>
      </Router>
    );
  }
}

export default App;