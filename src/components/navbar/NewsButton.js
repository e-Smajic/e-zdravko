// NewsButton.js
import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NewsButton = () => {
  const navigate = useNavigate();

  const handleNewsRedirect = () => {
    navigate('/news');
  };

  return (
    <Button
      variant="text"
      sx={{ color: 'white', marginLeft: '8px' }}
      onClick={handleNewsRedirect}
    >
      Novosti
    </Button>
  );
};

export default NewsButton;
