import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RegisterButton = () => {
  const navigate = useNavigate();

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <Button
      variant="text"
      sx={{ color: 'white', marginLeft: '8px' }}
      onClick={handleRegisterRedirect}
    >
      Registracija
    </Button>
  );
};

export default RegisterButton;
