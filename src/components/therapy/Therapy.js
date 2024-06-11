import React, { useState, useEffect } from 'react';
import { CssBaseline, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

const PREFIX = 'Therapy';
const classes = {
  container: `${PREFIX}-container`,
  title: `${PREFIX}-title`,
  card: `${PREFIX}-card`,
  cardContent: `${PREFIX}-cardContent`,
};

const StyledTherapy = styled('div')(({ theme }) => ({
  [`& .${classes.container}`]: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  [`& .${classes.title}`]: {
    marginBottom: theme.spacing(4),
  },
  [`& .${classes.card}`]: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  [`& .${classes.cardContent}`]: {
    flexGrow: 1,
  },
}));

const Therapy = () => {
  const [therapy, setTherapy] = useState([]);

  useEffect(() => {
    // Placeholder for fetch logic
    setTherapy([
      { id: 1, description: 'Therapy A - Take one pill daily' },
      { id: 2, description: 'Therapy B - Apply ointment twice a day' },
    ]);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <StyledTherapy>
        <CssBaseline />
        <Container maxWidth="md" className={classes.container}>
          <Typography variant="h4" align="center" color="textPrimary" className={classes.title}>
            Therapy
          </Typography>
          <Grid container spacing={4}>
            {therapy.map(item => (
              <Grid item xs={12} key={item.id}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography variant="body1">
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </StyledTherapy>
    </ThemeProvider>
  );
};

export default Therapy;