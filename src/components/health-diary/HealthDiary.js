import React, { useState } from 'react';
import { CssBaseline, Container, Typography, TextField, Button, Grid, Paper, Divider } from '@mui/material';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { getUserWithMail, validateToken, postDiaryEntry } from '../../services/UserService';
import { jwtDecode } from 'jwt-decode';

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
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const [newEntry, setNewEntry] = useState({
    user_uid: "string",
    datum: "2024-06-12",
    visina: 300,
    tezina: 300,
    bmi: 70,
    puls: 300,
    unos_vode: 30,
    broj_koraka: 100000,
    id: 0
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewEntry({ ...newEntry, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const authToken = localStorage.getItem('authToken');

      if (authToken) {
        
        validateToken({token: authToken}).then(res => {
          const decodedToken = jwtDecode(authToken);
          const mail = decodedToken.sub;
          
          getUserWithMail(mail).then(res => {
            console.log(res.data);
            setUser(res.data);
            newEntry.user_uid = res.data.uid;
          }).then(() => {
            postDiaryEntry(newEntry).then(res => {
              console.log('DIARY', res);
              navigate('/diary-entries');
            }).catch(err => {
              console.log(err);
            });
          })     
          .catch(error => {
            console.log(error);
          });
        }).catch(err => {
          navigate('/login');
        });
    
      }
      else {
        navigate('/login');
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
                label="Težina (kg)"
                variant="outlined"
                name="tezina"
                value={newEntry.tezina}
                onChange={handleInputChange}
              />
              <TextField
                label="Visina (cm)"
                variant="outlined"
                name="visina"
                value={newEntry.visina}
                onChange={handleInputChange}
              />
              <TextField
                label="BMI"
                variant="outlined"
                name="bmi"
                value={newEntry.bmi}
                onChange={handleInputChange}
              />
              <TextField
                label="Puls"
                variant="outlined"
                name="puls"
                value={newEntry.puls}
                onChange={handleInputChange}
              />
              <TextField
                label="Broj koraka"
                variant="outlined"
                name="broj_koraka"
                value={newEntry.broj_koraka}
                onChange={handleInputChange}
              />
              <TextField
                label="Unos vode (l)"
                variant="outlined"
                name="unos_vode"
                value={newEntry.unos_vode}
                onChange={handleInputChange}
              />
              <Button variant="contained" color="primary" type="submit">
                Add Entry
              </Button>
            </form>
          </Paper>
        </Container>
      </StyledHealthDiary>
    </ThemeProvider>
  );
};

export default HealthDiary;

