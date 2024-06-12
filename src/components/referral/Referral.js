import React, { useState } from 'react';
import { CssBaseline, Container, Typography, TextField, Button, Paper } from '@mui/material';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

const PREFIX = 'Referral';
const classes = {
  container: `${PREFIX}-container`,
  title: `${PREFIX}-title`,
  paper: `${PREFIX}-paper`,
  form: `${PREFIX}-form`,
};

const StyledReferral = styled('div')(({ theme }) => ({
  [`& .${classes.container}`]: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  [`& .${classes.title}`]: {
    marginBottom: theme.spacing(4),
  },
  [`& .${classes.paper}`]: {
    padding: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  [`& .${classes.form}`]: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
}));

const Referral = () => {
  const [data, setData] = useState({
    patientId: '',
    doctorName: '',
    referralReason: '',
    referralDetails: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Referral Data:', data);
    // Add logic to save referral data
    setData({
      patientId: '',
      doctorName: '',
      referralReason: '',
      referralDetails: '',
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <StyledReferral>
        <CssBaseline />
        <Container maxWidth="md" className={classes.container}>
          <Typography variant="h4" align="center" color="textPrimary" className={classes.title}>
            Referral
          </Typography>
          <Paper className={classes.paper} elevation={3}>
            <form className={classes.form} onSubmit={handleSubmit}>
              <TextField
                label="Patient ID"
                variant="outlined"
                name="patientId"
                value={data.patientId}
                onChange={handleChange}
              />
              <TextField
                label="Doctor Name"
                variant="outlined"
                name="doctorName"
                value={data.doctorName}
                onChange={handleChange}
              />
              <TextField
                label="Referral Reason"
                variant="outlined"
                name="referralReason"
                value={data.referralReason}
                onChange={handleChange}
              />
              <TextField
                label="Referral Details"
                variant="outlined"
                name="referralDetails"
                multiline
                rows={4}
                value={data.referralDetails}
                onChange={handleChange}
              />
              <Button variant="contained" color="primary" type="submit">
                Save Referral
              </Button>
            </form>
          </Paper>
        </Container>
      </StyledReferral>
    </ThemeProvider>
  );
};

export default Referral;