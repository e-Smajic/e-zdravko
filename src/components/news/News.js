import { React, useState, useEffect } from 'react';
import {
	CssBaseline,
	Container,
	Typography,
	AppBar,
	Toolbar,
	Box,
	Grid,
	Paper,
	Card,
	CardContent,
	CardMedia,
} from '@mui/material';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';

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
		height: '200px', // Fixed height for the image
	},
	[`& .${classes.cardContent}`]: {
		flexGrow: 1,
		overflow: 'hidden', // Ensure text doesn't overflow card
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
	},
}));

const News = () => {
	const [newsArticles, setNewsArticles] = useState([]);
	//URL je trenutno direktno na news service (nije API gateway jos) i treba update port redovno
	const URL = 'http://localhost:51475/news';
	useEffect(() => {
		const fetchData = async () => {
			const result = await fetch(URL);
			const articles = [];
			console.log(result);
			result.json().then(json => {
				console.log(json);
				json.forEach(item => {
					articles.push({
						title: item.naslov,
						description: item.sadrzaj,
						imgPath: 'images/' + item.slika,
					});
				});
				setNewsArticles(articles);
			});
		};
		fetchData();
	}, []);

	return (
		<ThemeProvider theme={theme}>
			<StyledApp>
				<CssBaseline />
				<Container maxWidth='sm' component='main' className={classes.heroContent}>
					<Typography variant='h2' align='center' color='textPrimary' gutterBottom>
						Novosti
					</Typography>
					<Typography variant='h5' align='center' color='textSecondary' paragraph>
						Ovdje možete pronaći najnovije vijesti i ažuriranja iz naše klinike.
					</Typography>
				</Container>
				<main>
					<Container maxWidth='md'>
						<Grid container spacing={4}>
							{newsArticles.map((article, index) => (
								<Grid item xs={12} md={6} key={index}>
									<Card className={classes.card}>
										<CardMedia
											className={classes.cardMedia}
											component='img'
											image={article.imgPath}
											alt={article.title}
										/>

										<CardContent className={classes.cardContent}>
											<Typography gutterBottom variant='h5' component='div'>
												{article.title}
											</Typography>
											<Typography variant='body2' color='textSecondary'>
												{article.description}
											</Typography>
										</CardContent>
									</Card>
								</Grid>
							))}
						</Grid>
					</Container>
				</main>
				<footer className={classes.footer}>
					<Typography variant='h6' align='center' gutterBottom>
						e-Zdravko klinika
					</Typography>
					<Typography variant='subtitle1' align='center' color='textSecondary' component='p'>
						Posvećeni vašem zdravlju i dobrobiti
					</Typography>
				</footer>
			</StyledApp>
		</ThemeProvider>
	);
};

export default News;
