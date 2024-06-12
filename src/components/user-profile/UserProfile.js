import React from 'react';
import { Container, Typography, Box, Paper, Avatar, Button, List, ListItem, ListItemText } from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import diaryLogo from './img/diary-logo.png';
import resultsLogo from './img/results-logo.png';
import therapyLogo from './img/therapy-logo.png';
import { jwtDecode } from 'jwt-decode';
import { getUserWithMail, validateToken } from '../../services/UserService';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const authToken = localStorage.getItem('authToken');

      if (authToken) {

        validateToken({token: authToken}).then(res => {
          const decodedToken = jwtDecode(authToken);
          const mail = decodedToken.sub;
          
          getUserWithMail(mail).then(res => {
            console.log(res.data);
            setUser(res.data);
          }).catch(error => {
            console.log(error);
          });
        }).catch(err => {
          navigate('/login');
        });
    
      }
      else {
        navigate('/login');
      }

      
    };

    fetchData();
  }, []);

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Korisnički profil
      </Typography>
      <Box display="flex" justifyContent="space-between" mb={4}>
        <Paper elevation={3} style={{ padding: '2rem', textAlign: 'center', flex: 1, marginRight: '1rem' }}>
          <Avatar style={{ width: '100px', height: '100px', margin: '0 auto' }}>{user ? user.ime.charAt(0) : ' '}</Avatar>
          <Typography variant="h5" component="h2" gutterBottom>
            {user ? user.ime + ' ' + user.prezime : ' '}
          </Typography>
          <Typography variant="body1">Datum rođenja: {user ? user.datum_rodjenja : ' '}</Typography>
          <Typography variant="body1">Spol: {user ? user.spol : ' '}</Typography>
          <Typography variant="body1">Uloga: {user ? user.rola.nazivRole : ' '}</Typography>
        </Paper>
        <Paper elevation={3} style={{ padding: '2rem', flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Calendar />
        </Paper>
      </Box>
      <Box mb={4}>
        <Typography variant="h6" component="h3" gutterBottom>
          Nadolazeći termini:
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="01/07/24: Pregled kod Dr. Smajić." />
          </ListItem>
          <ListItem>
            <ListItemText primary="15/07/24: Redovna kontrola kod Dr. Karaman." />
          </ListItem>
        </List>
      </Box>
      <Box display="flex" justifyContent="space-between" mb={4}>
        <Button
          variant="outlined"
          color="secondary"
          style={{
            width: '30%',
            height: '150px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img src={diaryLogo} style={{width: '100px'}}/>
          <Typography variant="h6" component="div">
            Dnevnik zdravlja
          </Typography>
        </Button>
        <Button
          variant="outlined"
          color="primary"
          style={{
            width: '30%',
            height: '150px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img src={therapyLogo} style={{width: '100px'}}/>
          <Typography variant="h6" component="div">
            Naruči terapiju
          </Typography>
        </Button>
        <Button
          variant="outlined"
          color="error"
          style={{
            width: '30%',
            height: '150px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img src={resultsLogo} style={{width: '100px'}}/>
          <Typography
            variant="h6"
            component="div"
          >
            Nalazi
          </Typography>
        </Button>
      </Box>
    </Container>
  );
};

export default ProfilePage;
