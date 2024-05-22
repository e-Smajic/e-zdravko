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
              e-Zdravko
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Mi pružamo najbolje zdravstvene usluge kako bismo osigurali vaše blagostanje. 
              Zakažite termine, posavjetujte se sa specijalistima i pristupite vašim nalazima online.
            </Typography>
            <div style={{ textAlign: 'center' }}>
              <Button variant="contained" color="primary" href="#services">
                Naše usluge
              </Button>
            </div>
          </Container>
          <Container maxWidth="md" component="section">
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Paper className={classes.paper}>
                  <Typography variant="h6" gutterBottom>
                    Sveobuhvatna briga
                  </Typography>
                  <Typography>
                    Naša klinika nudi sveobuhvatne zdravstvene usluge, uključujući opšte preglede, konsultacije sa specijalistima i hitnu pomoć.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper className={classes.paper}>
                  <Typography variant="h6" gutterBottom>
                    Napredna tehnologija
                  </Typography>
                  <Typography>
                  Koristimo najnoviju tehnologiju kako bismo osigurali tačne dijagnoze i efikasne tretmane. Vaše zdravlje je naš prioritet.                  
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper className={classes.paper}>
                  <Typography variant="h6" gutterBottom>
                    Kvalifikovani specijalisti
                  </Typography>
                  <Typography>
                  Naš tim specijalista je visoko kvalifikovan i iskusan, pružajući vrhunsku njegu za sve vaše zdravstvene potrebe.                  
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper className={classes.paper}>
                  <Typography variant="h6" gutterBottom>
                  Pristup usmjeren na pacijenta                  
                  </Typography>
                  <Typography>
                  Vjerujemo u pristup usmjeren na pacijenta, gdje je vaša udobnost na prvom mjestu. Vaše zdravstveno putovanje je naša misija.                  
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </main>
        <footer className={classes.footer}>
          <Typography variant="h6" align="center" gutterBottom>
            e-Zdravko klinika
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Posvećeni vašem zdravlju i dobrobiti          
          </Typography>
        </footer>
      </StyledApp>
    </ThemeProvider>
  );
};

export default Home;
