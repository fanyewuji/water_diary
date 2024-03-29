import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [ user, setUser ] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const {name, email, password, password2} = user;

  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const { register, error, clearErrors, isAuthenticated } = authContext;
  const { setAlert } = alertContext; 

  const navigate = useNavigate();

  const onChange = e => setUser({...user, [e.target.name]: e.target.value});

  const onSubmit = e => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      setAlert('Please enter all fields!', 'danger');
    } else if (password !== password2) {
      setAlert('Passwords should match', 'danger');
    } else {
      register({
        name,
        email,
        password
      })
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
    if (error === 'User already exists') {
      setAlert(error, 'danger');
      clearErrors();
    }
  }, [error, setAlert, clearErrors, isAuthenticated, navigate]);

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Register</span> 
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input type='text' name='name' value={name} onChange={onChange} required/>
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' value={email} onChange={onChange} required/>
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' value={password} onChange={onChange} required/>
        </div>
        <div className='form-group'>
          <label htmlFor='password2'>Confirm Password</label>
          <input type='password' name='password2' value={password2} onChange={onChange} required/>
        </div>
        <input type='submit' value='Register' className='btn btn-primary btn-block'/>
      </form>
    </div>
  )
}

export default Register