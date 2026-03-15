import React, { useEffect } from 'react';
import RajeshApp from '../rajesh/App';
import '../rajesh/index.css';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <RajeshApp />;
};

export default Home;
