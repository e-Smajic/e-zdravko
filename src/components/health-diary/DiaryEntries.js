import React from 'react';
import { Typography, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const PREFIX = 'DiaryEntries';
const classes = {
  paper: `${PREFIX}-paper`,
};

const StyledDiaryEntries = styled('div')(({ theme }) => ({
  [`& .${classes.paper}`]: {
    padding: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
}));

const DiaryEntries = () => {
  const entries = [
    {
      id: 1,
      weight: 70,
      height: 175,
      age: 30,
      calories: 2000,
      steps: 10000,
      distance: 8,
    },
    // Add more entries here
  ];

  return (
    <StyledDiaryEntries>
      <Typography variant="h5" align="center" gutterBottom>
        Diary Entries
      </Typography>
      <Grid container spacing={2}>
        {entries.map((entry) => (
          <Grid item xs={12} key={entry.id}>
            <Paper className={classes.paper} elevation={1}>
              <Typography variant="body1">
                Weight: {entry.weight} kg, Height: {entry.height} cm, Age: {entry.age}, Calories: {entry.calories}, Steps: {entry.steps}, Distance: {entry.distance} km
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </StyledDiaryEntries>
  );
};

export default DiaryEntries;