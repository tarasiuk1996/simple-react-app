import React, { useState, useEffect } from 'react';
import './TopBar.css';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import axios from '../../axios';
import { environment } from '../../env';
const logo = require('../../assets/logo.png');

const TopBar = () => {
  const history = useHistory();
  const [showMobileMenuButton, setShowMobileMenuButton] = useState(false);
  const [displayMenu, setDisaplayMenu] = useState(false);

  const userToken = localStorage.getItem('userToken');
  const isLoggedIn = !!userToken;

  useEffect(() => {
    if (window.outerWidth < 769) {
      setShowMobileMenuButton(true);
    }
  }, []);

  history.listen(() => {
    setDisaplayMenu(false)
  });

  function logout() {
    axios.get(`${environment.applicationId}/${environment.restApiKey}/users/logout`, {
      headers: {
        'user-token': userToken
      }
    }).then((response) => {
      localStorage.removeItem('userToken');
      localStorage.removeItem('userId');
      history.push('/');
    }, (error) => {
      console.error(error);
    })
  }

  function toggleClass() {
    setDisaplayMenu(!displayMenu);
  }
  
  return (
    <header className="TopBar">
      <div className="logo">
        <img src={logo} className="Logo" alt="logo" /> 
      </div>
      {showMobileMenuButton ? (
        <div className="mobile-button">
          <button onClick={toggleClass}>≡</button>
        </div>
      ) : ''}
      <nav className={displayMenu ? 'show-menu' : ''}>
        <ul>
          <li>
            <Link to="/">HOME</Link>
          </li>
          { !isLoggedIn ? (
            <>
              <li>
                <Link to="/register">REGISTER</Link>
              </li>
              <li>
                <Link to="/login">LOGIN</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/profile">PROFILE</Link>
              </li>
              <li>
                <a href="#" onClick={logout}>LOGOUT</a>
              </li>
            </>
          )}

        </ul>
      </nav>
    </header>
  )
};

export default TopBar;