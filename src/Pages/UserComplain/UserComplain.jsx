import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserComplain.css';
import CommentsTop from '../../Components/CommentsTop/CommentsTop';
import Complain from '../../Components/Complain/Complain';

const UserComplain = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/');
    }
  }, []);
  return (
    <>
      <CommentsTop />
      <Complain />
    </>
  );
};

export default UserComplain;
