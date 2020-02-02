import React from 'react';
import TopBar from './components/TopBar/TopBar';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import PrivateRoute from './shared/PrivateRoute/PrivateRoute';
import Profile from './components/Profile/Profile';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <TopBar></TopBar>
        <div className="container">
          <Route exact path='/' component={Home} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <PrivateRoute path='/profile' component={Profile}></PrivateRoute>
        </div>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
