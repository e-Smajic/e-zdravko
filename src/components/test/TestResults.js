import React, { useState, useEffect } from 'react';
import { CssBaseline, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

const PREFIX = 'TestResults';
const classes = {
  container: `${PREFIX}-container`,
  title: `${PREFIX}-title`,
  card: `${PREFIX}-card`,
  cardContent: `${PREFIX}-cardContent`,
};

const StyledTestResults = styled('div')(({ theme }) => ({
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

const TestResults = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Placeholder for fetch logic
    setResults([
      { id: 1, result: 'Positive' },
      { id: 2, result: 'Negative' },
      { id: 3, result: 'Positive' },
    ]);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <StyledTestResults>
        <CssBaseline />
        <Container maxWidth="md" className={classes.container}>
          <Typography variant="h4" align="center" color="textPrimary" className={classes.title}>
            Test Results
          </Typography>
          <Grid container spacing={4}>
            {results.map(item => (
              <Grid item xs={12} key={item.id}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography variant="body1">
                      Test Result: {item.result}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </StyledTestResults>
    </ThemeProvider>
  );
};

export default TestResults;