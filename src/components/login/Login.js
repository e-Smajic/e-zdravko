import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Container,
  Link,
  Alert
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { login, getUserWithMail } from '../../services/UserService';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get authToken from localStorage
    const authToken = localStorage.getItem('authToken');
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login logic here
    const data = {
      email: email,
      password: password
    }
    login(data)
      .then(res => {
        console.log(res);
        const token = res.data;
        localStorage.setItem('authToken', token);
        setError(null);
        navigate('/');
        window.location.reload();
      })
      .catch(error => {
        setError("Podaci za prijavu nisu ispravni!");
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#007bff' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Prijava
          </Typography>
          
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {error != null ? (
              <Alert severity='error' variant='filled'>
                {error}
              </Alert>
            ) : null}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Prijavi se
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login;
