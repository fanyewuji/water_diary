import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [ user, setUser ] = useState({
    email: '',
    password: '',
  });

  const {email, password} = user;

  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const navigate = useNavigate();

  const { isAuthenticated, error, loginUser, clearErrors } = authContext;
  const { setAlert } = alertContext;

  const onChange = e => setUser({...user, [e.target.name]: e.target.value});

  const onSubmit = e => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please enter all fields!', 'danger');
    } else {
      loginUser({
        email,
        password
      })
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
    if (!! error) {
      setAlert(error, 'danger');
      clearErrors();
    }
  }, [isAuthenticated, error, setAlert, clearErrors, navigate])
  

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Login</span> 
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' value={email} onChange={onChange} required/>
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' value={password} onChange={onChange} required/>
        </div>
        <input type='submit' value='Login' className='btn btn-primary btn-block'/>
      </form>
    </div>
  )
}

export default Login