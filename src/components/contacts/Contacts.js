import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import { Phone, Email, LocationOn } from '@mui/icons-material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix marker icon issue with Leaflet and Webpack
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const ContactPage = () => {
  const position = [43.85712093101019, 18.39803773493484];

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Kontakt
      </Typography>
      <Box display="flex" justifyContent="space-between" mb={4}>
        <Paper elevation={3} style={{ padding: '1rem', textAlign: 'center', flex: 1, marginRight: '1rem' }}>
          <Phone fontSize="large" />
          <Typography variant="h6" component="div" gutterBottom>
            Telefon
          </Typography>
          <Typography variant="body1">+387 33 123 456</Typography>
        </Paper>
        <Paper elevation={3} style={{ padding: '1rem', textAlign: 'center', flex: 1, marginRight: '1rem' }}>
          <Email fontSize="large" />
          <Typography variant="h6" component="div" gutterBottom>
            E-mail
          </Typography>
          <Typography variant="body1">e-zdravko@mz.ks.gov.ba</Typography>
        </Paper>
        <Paper elevation={3} style={{ padding: '1rem', textAlign: 'center', flex: 1 }}>
          <LocationOn fontSize="large" />
          <Typography variant="h6" component="div" gutterBottom>
            Adresa
          </Typography>
          <Typography variant="body1">Zmaja od Bosne bb, Sarajevo</Typography>
        </Paper>
      </Box>
      <MapContainer center={position} zoom={13} style={{ height: '400px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            123 Sarajevo Street, Sarajevo, Bosnia and Herzegovina
          </Popup>
        </Marker>
      </MapContainer>
    </Container>
  );
};

export default ContactPage;
