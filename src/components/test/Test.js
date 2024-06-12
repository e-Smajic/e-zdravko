import React, { useState } from 'react';
import { CssBaseline, Container, Typography, TextField, Button, Grid, Paper } from '@mui/material';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

const PREFIX = 'Test';
const classes = {
  container: `${PREFIX}-container`,
  title: `${PREFIX}-title`,
  paper: `${PREFIX}-paper`,
  form: `${PREFIX}-form`,
  testItem: `${PREFIX}-testItem`,
};

const StyledTest = styled('div')(({ theme }) => ({
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
  [`& .${classes.testItem}`]: {
    marginBottom: theme.spacing(2),
  },
}));

const Test = () => {
  const [tests, setTests] = useState([]);
  const [newTest, setNewTest] = useState({
    patientId: '',
    testName: '',
    items: [{ type: '', referenceValue: '', result: '' }],
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const [key, index] = name.split('-');
    if (index !== undefined) {
      const updatedItems = [...newTest.items];
      updatedItems[index][key] = value;
      setNewTest({ ...newTest, items: updatedItems });
    } else {
      setNewTest({ ...newTest, [name]: value });
    }
  };

  const handleAddItem = () => {
    setNewTest({
      ...newTest,
      items: [...newTest.items, { type: '', referenceValue: '', result: '' }],
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setTests([...tests, { id: Date.now(), ...newTest }]);
    setNewTest({
      patientId: '',
      testName: '',
      items: [{ type: '', referenceValue: '', result: '' }],
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <StyledTest>
        <CssBaseline />
        <Container maxWidth="md" className={classes.container}>
          <Typography variant="h4" align="center" color="textPrimary" className={classes.title}>
            Tests
          </Typography>
          <Paper className={classes.paper} elevation={3}>
            <form className={classes.form} onSubmit={handleSubmit}>
              <TextField
                label="Patient ID"
                variant="outlined"
                name="patientId"
                value={newTest.patientId}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                label="Test Name"
                variant="outlined"
                name="testName"
                value={newTest.testName}
                onChange={handleInputChange}
                fullWidth
              />
              {newTest.items.map((item, index) => (
                <Paper key={index} className={classes.testItem} elevation={1}>
                  <TextField
                    label="Type"
                    variant="outlined"
                    name={`type-${index}`}
                    value={item.type}
                    onChange={handleInputChange}
                    fullWidth
                  />
                  <TextField
                    label="Reference Value"
                    variant="outlined"
                    name={`referenceValue-${index}`}
                    value={item.referenceValue}
                    onChange={handleInputChange}
                    fullWidth
                  />
                  <TextField
                    label="Result"
                    variant="outlined"
                    name={`result-${index}`}
                    value={item.result}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Paper>
              ))}
              <Button variant="contained" color="primary" onClick={handleAddItem}>
                Add Item
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Save Test
              </Button>
            </form>
          </Paper>
          <Grid container spacing={2}>
            {tests.map((test) => (
              <Grid item xs={12} key={test.id}>
                <Paper className={classes.paper} elevation={1}>
                  <Typography variant="h6">
                    Test Name: {test.testName}
                  </Typography>
                  <Typography variant="body1">
                    Patient ID: {test.patientId}
                  </Typography>
                  {test.items.map((item, index) => (
                    <Typography key={index} variant="body2">
                      Type: {item.type}, Reference Value: {item.referenceValue}, Result: {item.result}
                    </Typography>
                  ))}
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </StyledTest>
    </ThemeProvider>
  );
};

export default Test;