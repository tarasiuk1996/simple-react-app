import React, { useState } from 'react';
import './Login.css';
import Input from '../../shared/Input/Input';
import Submit from '../../shared/Submit/Submit';
import axios from '../../axios';
import { useHistory } from 'react-router-dom';
import { environment } from '../../env';

const Register = () => {

  const [formData, setFormData] = useState({
    login: '',
    password: ''
  });
  const [showError, setShowError] = useState(false);
  const history = useHistory();

  function loginUser(event) {
    event.preventDefault();

    for (let key in formData) {
      if (formData[key].length === 0) {
        setShowError(true);
        return false;
      }
    }

    axios.post(`${environment.applicationId}/${environment.restApiKey}/users/login`, {
      ...formData
    }).then(response => {
      localStorage.setItem('userToken', response.data['user-token']);
      localStorage.setItem('userId', response.data['objectId']);
      history.push('/');
    }, error => {
      console.error(error);
    });
  };

  function handleInput(event) {
    setShowError(false);
    if (event.target.name === 'email') {
      setFormData({...formData, ...{login: event.target.value}});
    } else if (event.target.name === 'password') {
      setFormData({...formData, ...{password: event.target.value}});
    }
  };

  return (
    <section className="Login">
      <h1>Login</h1>
      <div className={showError ? "message error show" : "hide"}>
        All fields should be fill
      </div>
      <form>
        <Input type="email" name="email" placeholder="Email" onChange={handleInput}></Input>
        <Input type="password" name="password" placeholder="Password" onChange={handleInput}></Input>
        <Submit value="LOGIN" onClick={loginUser}></Submit>
      </form>
    </section>
  )
};

export default Register;