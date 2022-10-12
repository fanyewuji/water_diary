import React, { useEffect, useContext } from 'react';
import Water from '../water/Water';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);
  const { loadUser } = authContext;
  
  useEffect(() => {
    loadUser();
  });

  return (
    <Water />
  )
}

export default Home;