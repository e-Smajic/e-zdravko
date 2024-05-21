import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import logo from './img/navbarlogo.png';

const AppLogo = () => {
  const navigate = useNavigate();

  const handleHomeRedirect = () => {
    navigate('/');
  };

  return (
    <Grid item xs={3} onClick={handleHomeRedirect}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img 
                src={logo} 
                alt='logo'
                style={{height: '40px', marginRight: '0.5rem'}} 
            />
        <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
        >
            e-Zdravko
        </Typography>
        </Box>
    </Grid>
  );
};

export default AppLogo;