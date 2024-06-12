import React, { useState, useEffect } from 'react';
import { CssBaseline, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import { jwtDecode } from 'jwt-decode';
import { getTherapiesFromUser, getUserWithMail, validateToken } from '../../services/UserService';
import { useNavigate } from 'react-router-dom';

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
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Placeholder for fetch logic
    /*setTherapy([
      { id: 1, description: 'Therapy A - Take one pill daily' },
      { id: 2, description: 'Therapy B - Apply ointment twice a day' },
    ]);*/

    const fetchData = async () => {
      const authToken = localStorage.getItem('authToken');

      if (authToken) {

        validateToken({token: authToken}).then(res => {
          const decodedToken = jwtDecode(authToken);
          const mail = decodedToken.sub;
          
          getUserWithMail(mail).then(res => {
            console.log(res.data);
            setUser(res.data);
            getTherapiesFromUser(res.data.uid).then(res => {
              setTherapy(res.data);
            }).catch(err => {
              console.log(err);
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
                      {item.lijek} - {item.napomena} (Kolicina: {item.kolicina} mg)
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