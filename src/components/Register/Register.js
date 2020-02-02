import React, { useState } from 'react';
import './Register.css';
import Input from '../../shared/Input/Input';
import Submit from '../../shared/Submit/Submit';
import axios from '../../axios';
import generateString from '../../utils/generate-string';
import { useHistory } from 'react-router-dom';
import { environment } from '../../env';

const Register = () => {

  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    address: '',
    full_name: '',
    password: '',
    photo: '',
    birth_date: '',
    question1: '',
    question2: '',
    question3: ''
  });
  const [showError, setShowError] = useState(false);
  const history = useHistory();

  function registerUser(event) {
    event.preventDefault();

    for (let key in formData) {
      if (formData[key].length === 0) {
        setShowError(true);
        return false;
      }
    }

    axios.post(`${environment.applicationId}/${environment.restApiKey}/users/register`, {
      ...formData
    }).then(response => {
      history.push('/');
    }, error => {
      console.error(error);
    });
  };

  function handleInput(event) {
    setShowError(false);
    if (event.target.name === 'full_name') {
      setFormData({...formData, ...{full_name: event.target.value}});
    } else if (event.target.name === 'email') {
      setFormData({...formData, ...{email: event.target.value}});
    } else if (event.target.name === 'phone') {
      setFormData({...formData, ...{phone: event.target.value}});
    } else if (event.target.name === 'birth_date') {
      setFormData({...formData, ...{birth_date: event.target.value}});
    } else if (event.target.name === 'address') {
      setFormData({...formData, ...{address: event.target.value}});
    } else if (event.target.name === 'password') {
      setFormData({...formData, ...{password: event.target.value}});
    } else if (event.target.name === 'question1') {
      setFormData({...formData, ...{question1: event.target.value}});
    } else if (event.target.name === 'question2') {
      setFormData({...formData, ...{question2: event.target.value}});
    } else if (event.target.name === 'question3') {
      setFormData({...formData, ...{question3: event.target.value}});
    } else if (event.target.name === 'photo') {
      const fileFormData = new FormData();
      fileFormData.append("file", event.target.files[0]);
      const fileName = generateString(6) + '.' + event.target.files[0].name.split('.')[1];
      axios.post(`${environment.applicationId}/${environment.restApiKey}/files/uploads/${fileName}?overwrite=true`, 
        fileFormData, { 
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
      ).then(response => {
        setFormData({...formData, ...{photo: response.data.fileURL}});
      }, error => {
        console.log(error);
      });
    }
  };

  return (
    <section className="Register">
      <h1>Register</h1>
      <div className={showError ? "message error show" : "hide"}>
        All fields should be fill
      </div>
      <form>
        <div className="form-container">
          <div>
            <Input type="text" name="full_name" placeholder="Full name" onChange={handleInput}></Input>
            <Input type="email" name="email" placeholder="Email" onChange={handleInput}></Input>
            <Input type="text" name="phone" placeholder="Phone" onChange={handleInput}></Input>
          </div>
          <div>
            <Input type="text" name="birth_date" placeholder="Birth date" onChange={handleInput}></Input>
            <Input type="text" name="address" placeholder="Address" onChange={handleInput}></Input>
            <Input type="password" name="password" placeholder="Password" onChange={handleInput}></Input>
          </div>
        </div>
        <Input fullWidth type="file" name="photo" placeholder="Photo" onChange={handleInput}></Input>
        <Input fullWidth name="question1" placeholder="First secret question" onChange={handleInput}></Input>
        <Input fullWidth name="question2" placeholder="Second secret question" onChange={handleInput}></Input>
        <Input fullWidth name="question3" placeholder="Third secret question" onChange={handleInput}></Input>
        <Submit value="REGISTER" onClick={registerUser}></Submit>
      </form>
    </section>
  )
};

export default Register;