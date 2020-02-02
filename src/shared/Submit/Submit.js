import React from 'react';
import './Submit.css';

const Submit = ({value, onClick}) => (
  <input className="Submit" type="submit" value={value} onClick={onClick} />
);

export default Submit;