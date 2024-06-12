import React, { useState, useEffect } from 'react';
import { CssBaseline, Container, Typography, AppBar, Toolbar, Box, Grid, Paper, Card, CardContent, CardMedia } from '@mui/material';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

const PREFIX = 'Notifications';
const classes = {
  container: `${PREFIX}-container`,
  title: `${PREFIX}-title`,
  card: `${PREFIX}-card`,
  cardMedia: `${PREFIX}-cardMedia`,
  cardContent: `${PREFIX}-cardContent`,
};

const StyledNotifications = styled('div')(({ theme }) => ({
  [`& .${classes.container}`]: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  [`& .${classes.title}`]: {
    marginBottom: theme.spacing(4),
  },
  [`& .${classes.card}`]: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '200px', // Fixed height
    width: '100%', // Full width of grid item
    marginBottom: theme.spacing(2),
  },
  [`& .${classes.cardMedia}`]: {
    height: '100px', // Fixed height for the image
    objectFit: 'cover',
  },
  [`& .${classes.cardContent}`]: {
    flexGrow: 1,
    overflow: 'hidden', // Ensure text doesn't overflow card
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}));

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Placeholder for fetch logic
    setNotifications([
      { id: 1, message: 'You have a new appointment' },
      { id: 2, message: 'Your test results are available' },
    ]);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <StyledNotifications>
        <CssBaseline />
        <Container maxWidth="md" className={classes.container}>
          <Typography variant="h4" align="center" color="textPrimary" className={classes.title}>
            Notifications
          </Typography>
          <Grid container spacing={4}>
            {notifications.map(notification => (
              <Grid item xs={12} key={notification.id}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography variant="h6" gutterBottom>
                      {notification.message}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </StyledNotifications>
    </ThemeProvider>
  );
};

export default Notifications;