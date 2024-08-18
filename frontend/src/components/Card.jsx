import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Card.css';

const Card = ({ topic}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/topic/${topic._id}`,{ state: { topicName: topic.topicName,createdBy:topic._user.name } });
  };

  return (
    <div className='card' onClick={handleClick}>
      <h2>{topic.topicName}</h2>
      <p className='text-gray-500 pl-2'>by: <span className='text-gray-400'>{topic._user.name}</span></p>
    </div>
  );
};

export default Card;
