import React, { useState } from 'react';
import { CssBaseline, Container, Typography, TextField, Button, Grid, Paper } from '@mui/material';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

const PREFIX = 'Examination';
const classes = {
  container: `${PREFIX}-container`,
  title: `${PREFIX}-title`,
  paper: `${PREFIX}-paper`,
  form: `${PREFIX}-form`,
};

const StyledExamination = styled('div')(({ theme }) => ({
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

const Examination = () => {
  const [data, setData] = useState({
    patientId: '',
    weight: '',
    height: '',
    bloodPressure: '',
    notes: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Examination Data:', data);
    // Add logic to save examination data
    setData({
      patientId: '',
      weight: '',
      height: '',
      bloodPressure: '',
      notes: '',
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <StyledExamination>
        <CssBaseline />
        <Container maxWidth="md" className={classes.container}>
          <Typography variant="h4" align="center" color="textPrimary" className={classes.title}>
            Examination
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
                label="Weight (kg)"
                variant="outlined"
                name="weight"
                value={data.weight}
                onChange={handleChange}
              />
              <TextField
                label="Height (cm)"
                variant="outlined"
                name="height"
                value={data.height}
                onChange={handleChange}
              />
              <TextField
                label="Blood Pressure"
                variant="outlined"
                name="bloodPressure"
                value={data.bloodPressure}
                onChange={handleChange}
              />
              <TextField
                label="Notes"
                variant="outlined"
                name="notes"
                multiline
                rows={4}
                value={data.notes}
                onChange={handleChange}
              />
              <Button variant="contained" color="primary" type="submit">
                Save Examination
              </Button>
            </form>
          </Paper>
        </Container>
      </StyledExamination>
    </ThemeProvider>
  );
};

export default Examination;