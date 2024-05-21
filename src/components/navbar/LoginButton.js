import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginButton = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <Button
      variant="text"
      sx={{ color: 'white', marginLeft: '8px' }}
      onClick={handleLoginRedirect}
    >
      Prijava
    </Button>
  );
};

export default LoginButton;
