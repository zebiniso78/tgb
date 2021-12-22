import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Main.css';
import CommentsTop from '../../Components/CommentsTop/CommentsTop';
import CommentsFilter from '../../Components/CommentsFilter/CommentsFilter';

const Main = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/');
    }
  }, []);
  return (
    <>
      <CommentsTop />
      <CommentsFilter />
    </>
  );
};

export default Main;
