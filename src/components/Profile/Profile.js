import React, { useState, useEffect } from 'react';
import './Profile.css';
import Input from '../../shared/Input/Input';
import Submit from '../../shared/Submit/Submit';
import axios from '../../axios';
import generateString from '../../utils/generate-string';
import environment from '../../env';

const Profile = () => {

  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    address: '',
    full_name: '',
    photo: '',
    birth_date: '',
    question1: '',
    question2: '',
    question3: ''
  });
  const [showError, setShowError] = useState(false);
  const [updateField, setUpdateField] = useState(0);
  const [imgSRC, setImgSRC] = useState('');

  useEffect(() => {
    console.log('Go to use effect');
    axios.get(`${environment.applicationId}/${environment.restApiKey}/users/${localStorage.getItem('userId')}`, { }, {
      headers: {
        'user-token': localStorage.getItem('userToken')
      }
    }).then(response => {
      setFormData({...response.data});
      setImgSRC(response.data.photo);
    }, error => {
      console.error(error);
    });
  }, [updateField]);

  function updateUser(event) {
    event.preventDefault(formData);

    for (let key in formData) {
      if (formData[key] && formData[key].length === 0) {
        setShowError(true);
        return false;
      }
    }

    axios.put(`${environment.applicationId}/${environment.restApiKey}/users/${localStorage.getItem('userId')}`, {
      ...formData
    }, {
      headers: {
        'user-token': localStorage.getItem('userToken')
      }
    }).then(response => {
      let counter = updateField;
      setImgSRC(response.data.photo);
      setUpdateField(counter++);
    }, error => {
      console.error(error);
    })

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
            'user-token': localStorage.getItem('userToken')
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
    <section className="Profile">
      <h1>Profile</h1>
      <div className={showError ? "message error show" : "hide"}>
        All fields should be fill
      </div>
      <form>
        <div className="image-container">
          <img src={imgSRC} alt="Profile image"/>
        </div>
        <div className="form-container">
          <div>
            <Input type="text" name="full_name" placeholder="Full name" value={formData.full_name} onChange={handleInput}></Input>
            <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInput}></Input>
            <Input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleInput}></Input>
          </div>
          <div>
            <Input type="text" name="birth_date" placeholder="Birth date" value={formData.birth_date} onChange={handleInput}></Input>
            <Input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleInput}></Input>
            <Input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInput}></Input>
          </div>
        </div>
        <Input fullWidth type="file" name="photo" placeholder="Photo" onChange={handleInput}></Input>
        <Input fullWidth name="question1" placeholder="First secret question" value={formData.question1} onChange={handleInput}></Input>
        <Input fullWidth name="question2" placeholder="Second secret question" value={formData.question2} onChange={handleInput}></Input>
        <Input fullWidth name="question3" placeholder="Third secret question" value={formData.question3} onChange={handleInput}></Input>
        <Submit value="UPDATE" onClick={updateUser}></Submit>
      </form>
    </section>
  )
};

export default Profile;