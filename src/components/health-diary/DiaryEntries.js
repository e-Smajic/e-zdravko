import React from 'react';
import { Typography, Grid, Paper, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { getUserWithMail, validateToken, getHealthDiaryFromUser } from '../../services/UserService';

const PREFIX = 'DiaryEntries';
const classes = {
  paper: `${PREFIX}-paper`,
  button: `${PREFIX}-button`,
};

const StyledDiaryEntries = styled('div')(({ theme }) => ({
  [`& .${classes.paper}`]: {
    padding: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
  [`& .${classes.button}`]: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
  },
}));

const DiaryEntries = () => {
  const [entries, setEntries] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const authToken = localStorage.getItem('authToken');

      if (authToken) {

        validateToken({token: authToken}).then(res => {
          const decodedToken = jwtDecode(authToken);
          const mail = decodedToken.sub;
          
          getUserWithMail(mail).then(res => {
            console.log(res.data);
            setUser(res.data);

            getHealthDiaryFromUser(res.data.uid).then(res => {
              setEntries(res.data);
            }).catch(err => {
              navigate('/login');
            });

          }).catch(error => {
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

    fetchData();
  }, []);

  const handleAddEntry = () => {
    navigate('/health-diary');
  };

  return (
    <StyledDiaryEntries>
      <Typography sx={{ marginTop: '20px' }} variant="h5" align="center" gutterBottom>
        Diary Entries
      </Typography>
      <Grid container spacing={2}>
        {entries.map((entry) => (
          <Grid item xs={12} key={entry.id}>
            <Paper className={classes.paper} elevation={1}>
              <Typography variant="body1">
                Težina: {entry.tezina} kg, Visina: {entry.visina} cm, BMI: {entry.bmi}, Puls: {entry.puls}, Broj koraka: {entry.broj_koraka}, Unos vode: {entry.unos_vode} l
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <div className={classes.button}>
        <Button variant="contained" color="primary" onClick={handleAddEntry}>
          Add Entry
        </Button>
      </div>
    </StyledDiaryEntries>
  );
};

export default DiaryEntries;
