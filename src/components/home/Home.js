import React from 'react';
import { CssBaseline, Container, Typography, AppBar, Toolbar, Box, Button, Grid, Paper } from '@mui/material';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import Carousel from 'react-material-ui-carousel';
import home_img from './img/medicinsko_osoblje.jpg';
import termin_img from './img/zakazivanje_termina.jpg';
import konsultacije_img from './img/konsultacija_doktor.jpg';

const theme = createTheme();

const PREFIX = 'Home';
const classes = {
  appBar: `${PREFIX}-appBar`,
  heroContent: `${PREFIX}-heroContent`,
  footer: `${PREFIX}-footer`,
  icon: `${PREFIX}-icon`,
  paper: `${PREFIX}-paper`,
  carouselContainer: `${PREFIX}-carouselContainer`,
  carouselItem: `${PREFIX}-carouselItem`,
  carouselTextContainer: `${PREFIX}-carouselTextContainer`,
};

const StyledApp = styled('div')(({ theme }) => ({
  [`& .${classes.appBar}`]: {
    marginBottom: theme.spacing(4),
  },
  [`& .${classes.heroContent}`]: {
    padding: theme.spacing(8, 0, 6),
  },
  [`& .${classes.footer}`]: {
    padding: theme.spacing(6),
    marginTop: 'auto',
  },
  [`& .${classes.icon}`]: {
    marginRight: theme.spacing(2),
  },
  [`& .${classes.paper}`]: {
    padding: theme.spacing(4),
    textAlign: 'center',
  },
  [`& .${classes.carouselContainer}`]: {
    position: 'relative',
    textAlign: 'center',
    color: 'white',
  },
  [`& .${classes.carouselItem}`]: {
    position: 'relative',
  },
  [`& .${classes.carouselTextContainer}`]: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const carouselItems = [
    {
      name: "Dobrodošli u e-Zdravko!",
      description: "Pružamo najbolje zdravstvene usluge kako bismo osigurali vaše blagostanje.",
      imgPath: home_img,
    },
    {
      name: "Zakažite termine online",
      description: "Praktična online rezervacija za sve vaše zdravstvene potrebe.",
      imgPath: termin_img,
    },
    {
      name: "Konsultujte se sa specijalistima",
      description: "Pristupite širokom spektru specijalista za sveobuhvatnu njegu.",
      imgPath: konsultacije_img,
    }
  ];

const Home = () => {
  return (
    <ThemeProvider theme={theme}>
      <StyledApp>
        <CssBaseline />
        
        <Carousel>
          {carouselItems.map((item, index) => (
            <Box key={index} className={classes.carouselContainer}>
              <img
                src={item.imgPath}
                alt={item.name}
                style={{ width: "100%", height: "auto", maxHeight: "450px", objectFit: "cover" }}
              />
              <Box className={classes.carouselTextContainer}>
                <Typography variant="h4" color="inherit" gutterBottom>
                  {item.name}
                </Typography>
                <Typography variant="h6" color="inherit">
                  {item.description}
                </Typography>
              </Box>
            </Box>
          ))}
        </Carousel>
        <main>
          <Container maxWidth="sm" component="main" className={classes.heroContent}>
            <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
              Welcome to e-Health Clinic
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              We provide the best healthcare services to ensure your well-being. Book appointments, consult with specialists, and access your medical records online.
            </Typography>
            <div style={{ textAlign: 'center' }}>
              <Button variant="contained" color="primary" href="#services">
                Our Services
              </Button>
            </div>
          </Container>
          <Container maxWidth="md" component="section">
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Paper className={classes.paper}>
                  <Typography variant="h6" gutterBottom>
                    Comprehensive Care
                  </Typography>
                  <Typography>
                    Our clinic offers comprehensive healthcare services including general check-ups, specialist consultations, and emergency care.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper className={classes.paper}>
                  <Typography variant="h6" gutterBottom>
                    Advanced Technology
                  </Typography>
                  <Typography>
                    We use the latest technology to ensure accurate diagnoses and effective treatments. Your health is our top priority.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper className={classes.paper}>
                  <Typography variant="h6" gutterBottom>
                    Qualified Specialists
                  </Typography>
                  <Typography>
                    Our team of specialists is highly qualified and experienced, providing top-notch care for all your health needs.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper className={classes.paper}>
                  <Typography variant="h6" gutterBottom>
                    Patient-Centered Approach
                  </Typography>
                  <Typography>
                    We believe in a patient-centered approach, where your comfort and convenience are paramount. Your health journey is our mission.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </main>
        <footer className={classes.footer}>
          <Typography variant="h6" align="center" gutterBottom>
            e-Health Clinic
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            Dedicated to your health and well-being
          </Typography>
        </footer>
      </StyledApp>
    </ThemeProvider>
  );
};

export default Home;
