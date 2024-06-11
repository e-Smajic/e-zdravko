import React, { useState } from 'react';
import { CssBaseline, Container, Typography, TextField, Button, Grid, Paper, Divider } from '@mui/material';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

const PREFIX = 'HealthDiary';
const classes = {
  container: `${PREFIX}-container`,
  title: `${PREFIX}-title`,
  paper: `${PREFIX}-paper`,
  form: `${PREFIX}-form`,
  section: `${PREFIX}-section`,
};

const StyledHealthDiary = styled('div')(({ theme }) => ({
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
  [`& .${classes.section}`]: {
    marginBottom: theme.spacing(4),
  },
  [`& .${classes.form}`]: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
}));

const HealthDiary = () => {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({
    note: '',
    weight: '',
    height: '',
    age: '',
    calories: '',
    steps: '',
    distance: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewEntry({ ...newEntry, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newEntry.note.trim() !== '') {
      setEntries([...entries, { id: Date.now(), ...newEntry }]);
      setNewEntry({
        note: '',
        weight: '',
        height: '',
        age: '',
        calories: '',
        steps: '',
        distance: '',
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <StyledHealthDiary>
        <CssBaseline />
        <Container maxWidth="md" className={classes.container}>
          <Typography variant="h4" align="center" color="textPrimary" className={classes.title}>
            Health Diary
          </Typography>
          <Paper className={classes.paper} elevation={3}>
            <Typography variant="h5" align="center" gutterBottom>
              New Entry
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
              <TextField
                label="Note"
                variant="outlined"
                name="note"
                fullWidth
                multiline
                rows={4}
                value={newEntry.note}
                onChange={handleInputChange}
              />
              <TextField
                label="Weight (kg)"
                variant="outlined"
                name="weight"
                value={newEntry.weight}
                onChange={handleInputChange}
              />
              <TextField
                label="Height (cm)"
                variant="outlined"
                name="height"
                value={newEntry.height}
                onChange={handleInputChange}
              />
              <TextField
                label="Age"
                variant="outlined"
                name="age"
                value={newEntry.age}
                onChange={handleInputChange}
              />
              <TextField
                label="Calories Intake"
                variant="outlined"
                name="calories"
                value={newEntry.calories}
                onChange={handleInputChange}
              />
              <TextField
                label="Steps"
                variant="outlined"
                name="steps"
                value={newEntry.steps}
                onChange={handleInputChange}
              />
              <TextField
                label="Distance Travelled (km)"
                variant="outlined"
                name="distance"
                value={newEntry.distance}
                onChange={handleInputChange}
              />
              <Button variant="contained" color="primary" type="submit">
                Add Entry
              </Button>
            </form>
          </Paper>
          <Divider />
          <Paper className={classes.paper} elevation={3}>
            <Typography variant="h5" align="center" gutterBottom>
              Diary Entries
            </Typography>
            <Grid container spacing={2}>
              {entries.map((entry) => (
                <Grid item xs={12} key={entry.id}>
                  <Paper className={classes.paper} elevation={1}>
                    <Typography variant="body1">
                      {entry.note}
                      <br />
                      Weight: {entry.weight} kg, Height: {entry.height} cm, Age: {entry.age}, Calories: {entry.calories}, Steps: {entry.steps}, Distance: {entry.distance} km
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Container>
      </StyledHealthDiary>
    </ThemeProvider>
  );
};

export default HealthDiary;