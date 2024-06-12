import React from 'react';
import { Container, Typography, Box, Paper, Avatar } from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useLocation } from 'react-router-dom';

const OtherProfilePage = () => {
  const location = useLocation();
  const { user } = location.state || {};

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
    </Container>
  );
};

export default OtherProfilePage;
