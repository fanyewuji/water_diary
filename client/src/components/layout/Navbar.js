import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import PropTypes from 'prop-types';

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, user, logoutUser } = authContext;

  const onLogout = () => {
    logoutUser();
  }
  
  const authLinks = (
    <>
      <li>Hello {user && user.name}</li>
      <li>
        <a onClick={onLogout} href='#!'>
          <i className='fas fa-sign-out-alt'></i>
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </>
  )

  const guestLinks = (
    <>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </>
  )

  return (
    <div className='navbar bg-primary'>
      <h1>
        <i className={icon} />
        { title }
      </h1>
      <ul>
        { isAuthenticated ? authLinks : guestLinks }
      </ul>
    </div>
  )
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string
}

Navbar.defaultProps = {
    title: 'Water Diary',
    icon: 'fa-solid fa-bottle-droplet'
}

export default Navbar;