import React from 'react';
import './Input.css';

const Input = ({type, name, placeholder, fullWidth, onChange, value}) => (
  <input 
    className={"Input " + ( fullWidth ? 'width-100' : '')} 
    type={type} 
    name={name} 
    placeholder={placeholder} 
    onChange={onChange}
    value={value}/>
);

export default Input;