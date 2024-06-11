import React from 'react';
import { CssBaseline, Container, Typography, AppBar, Toolbar, Box, Grid, Paper, Card, CardContent, CardMedia } from '@mui/material';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import news_img1 from './img/health_policy.jpg'; // Replace with actual image paths
import news_img2 from './img/covid_vaccine.jpg';
import news_img3 from './img/mental_health.jpg';

const theme = createTheme();

const PREFIX = 'News';
const classes = {
  appBar: `${PREFIX}-appBar`,
  heroContent: `${PREFIX}-heroContent`,
  footer: `${PREFIX}-footer`,
  paper: `${PREFIX}-paper`,
  card: `${PREFIX}-card`,
  cardMedia: `${PREFIX}-cardMedia`,
  cardContent: `${PREFIX}-cardContent`,
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
  [`& .${classes.paper}`]: {
    padding: theme.spacing(4),
    textAlign: 'center',
  },
  [`& .${classes.card}`]: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '350px', // Fixed height
    width: '100%', // Full width of grid item
  },
  [`& .${classes.cardMedia}`]: {
    height: '140px', // Fixed height for the image
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

const newsArticles = [
  {
    title: "Nove zdravstvene politike",
    description: "Saznajte više o najnovijim zdravstvenim politikama implementiranim za poboljšanje brige o pacijentima.",
    imgPath: news_img1,
  },
  {
    title: "Ažuriranja o vakcinaciji protiv COVID-19",
    description: "Dobijte najnovije informacije o rasporedima vakcinacije protiv COVID-19 i dostupnosti.",
    imgPath: news_img2,
  },
  {
    title: "Svijest o mentalnom zdravlju",
    description: "Pročitajte o našim novim programima mentalnog zdravlja dizajniranim da podrže našu zajednicu.",
    imgPath: news_img3,
  },
];

const News = () => {
  return (
    <ThemeProvider theme={theme}>
      <StyledApp>
        <CssBaseline />
        <Container maxWidth="sm" component="main" className={classes.heroContent}>
          <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
            Novosti
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" paragraph>
            Ovdje možete pronaći najnovije vijesti i ažuriranja iz naše klinike.
          </Typography>
        </Container>
        <main>
          <Container maxWidth="md">
            <Grid container spacing={4}>
              {newsArticles.map((article, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Card className={classes.card}>
                    {article.imgPath && (
                      <CardMedia
                        className={classes.cardMedia}
                        component="img"
                        image={article.imgPath}
                        alt={article.title}
                      />
                    )}
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="div">
                        {article.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {article.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
      </StyledApp>
    </ThemeProvider>
  );
};

export default News;