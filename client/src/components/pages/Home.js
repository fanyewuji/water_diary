import React, { useEffect, useContext } from 'react';
import Water from '../water/Water';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);
  const { loadUser, loading } = authContext;
  
  useEffect(() => {
    loadUser();
    //eslint-disable-next-line
  }, []);

  return (
    !loading && <Water />
  )
}

export default Home;