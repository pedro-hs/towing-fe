import React from 'react';
import { Redirect } from '@reach/router';

const Home = () => {
  if (localStorage.getItem('token')) {
    return <Redirect to="/towing" noThrow />;
  }
  return <Redirect to="/auth/login" noThrow />;
};

export default Home;
