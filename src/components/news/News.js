import React, { useState, useEffect } from 'react';
import {
	Container,
	Typography,
	Box,
	Paper,
	Button,
	Divider,
	InputBase,
	IconButton,
	Modal,
	TextField,
	Grid,
	Card,
	CardContent,
	CardMedia,
	Alert,
} from '@mui/material';

import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import { Search as SearchIcon, FilterList as FilterListIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getNews, post } from '../../services/NewsService';
import nema_slike from './img/nemaslike.jpg';
import { getUserWithMail } from '../../services/UserService';
import { jwtDecode } from 'jwt-decode';

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
	const navigate = useNavigate();
	const [error, setError] = useState(null);
	const [anchorEl, setAnchorEl] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [open, setOpen] = useState(false);
	const [newPostTitle, setNewPostTitle] = useState('');
	const [newPostContent, setNewPostContent] = useState('');
	const [newPostImage, setNewPostImage] = useState(null);
	const [newsArticles, setNewsArticles] = useState([]);
	const [filteredArticles, setFilteredArticles] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [user, setUser] = useState(null);

	const handlePageChange = newPage => {
		setCurrentPage(newPage);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		const authToken = localStorage.getItem('authToken');
		const decodedToken = jwtDecode(authToken);
		const mail = decodedToken.sub;
		if (!authToken) {
			navigate('/login');
		} else {
			fetchData();
		}
		getUserWithMail(mail)
			.then(res => {
				console.log(res.data);
				setUser(res.data);
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

	const fetchData = async () => {
		try {
			const response = await getNews();
			const result = response.data.reverse();
			const articles = [];
			console.log(result);
			result.forEach(item => {
				articles.push({
					title: item.naslov,
					description: item.sadrzaj,
					imgPath: 'images/' + item.slika,
				});
			});
			setNewsArticles(articles);
		} catch (error) {
			console.log(error);
			console.error('Error fetching news:', error);
		}
	};

	const handleFormSubmit = async event => {
		event.preventDefault();
		// Handle form submission logic here, e.g., send the new post to the server
		const newsDTO = {
			naslov: newPostTitle,
			sadrzaj: newPostContent,
			slika: newPostImage.name,
			user_uid: user.uid,
		};
		console.log('New Post Title:', newPostTitle);
		console.log('New Post Content:', newPostContent);
		console.log('New Post Image:', newPostImage);

		post(newsDTO)
			.then(res => {
				console.log(res);
				setError(null);
			})
			.catch(error => {
				console.log(error);
				setError(error.response.data.message);
			});
		// Close the modal after submission
		handleClose();
		setNewsArticles([
			{
				title: newsDTO.naslov,
				description: newsDTO.sadrzaj,
				imgPath: 'images/' + newsDTO.slika,
			},
			...newsArticles,
		]);
	};

	// Filter articles based on search term
	useEffect(() => {
		const filtered = newsArticles.filter(article => article.title.toLowerCase().includes(searchTerm.toLowerCase()));
		setFilteredArticles(filtered);
	}, [searchTerm, newsArticles]);

	// Dummy posts data for demonstration
	const posts = filteredArticles;

	// Pagination configuration
	const postsPerPage = 6;
	const totalPages = Math.ceil(posts.length / postsPerPage);
	const startIndex = (currentPage - 1) * postsPerPage;
	const endIndex = startIndex + postsPerPage;
	const currentPosts = posts.slice(startIndex, endIndex);

	return (
		<Container maxWidth='md' style={{ marginTop: '2rem' }}>
			<Box display='flex' justifyContent='space-between' alignItems='center' mb={4}>
				<Box display='flex' alignItems='center'>
					<Typography variant='h3' component='h1'>
						Novosti
					</Typography>
				</Box>
				<Box display='flex' alignItems='center'>
					<Paper
						component='form'
						elevation={0}
						sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 'auto' }}
					>
						<InputBase
							sx={{ ml: 1, flex: 1 }}
							placeholder='Pretraži'
							inputProps={{ 'aria-label': 'search news' }}
							value={searchTerm}
							onChange={e => setSearchTerm(e.target.value)}
						/>
						<IconButton type='submit' sx={{ p: '10px' }} aria-label='search'>
							<SearchIcon />
						</IconButton>
					</Paper>
					<Button variant='contained' color='primary' sx={{ ml: 2 }} onClick={handleOpen}>
						Dodaj novost
					</Button>
				</Box>
			</Box>
			<Divider />
			{error != null ? (
				<Alert severity='error' variant='filled' style={{ marginBottom: '20px' }}>
					{error}
				</Alert>
			) : null}
			<main>
				<Container maxWidth='md'>
					<Grid container spacing={4}>
						{currentPosts.map((article, index) => (
							<Grid item xs={12} md={6} key={index}>
								<Card className={classes.card}>
									<CardMedia
										className={classes.cardMedia}
										component='img'
										image={article.imgPath}
										alt={article.title}
										onError={e => {
											e.target.src = nema_slike;
										}}
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
			<Box mt={4} display='flex' justifyContent='center'>
				<Button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
					Prethodna
				</Button>
				<Typography variant='body1' component='div' sx={{ mx: 2 }}>
					{currentPage}
				</Typography>
				<Button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
					Sljedeća
				</Button>
			</Box>

			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='new-post-modal-title'
				aria-describedby='new-post-modal-description'
			>
				<Box
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						width: 400,
						bgcolor: 'background.paper',
						boxShadow: 24,
						p: 4,
					}}
				>
					<Typography id='new-post-modal-title' variant='h6' component='h2'>
						Dodaj novost
					</Typography>
					<form onSubmit={handleFormSubmit}>
						<TextField
							margin='normal'
							required
							fullWidth
							id='title'
							label='Naslov'
							name='title'
							value={newPostTitle}
							onChange={e => setNewPostTitle(e.target.value)}
							autoFocus
						/>
						<TextField
							margin='normal'
							required
							fullWidth
							name='content'
							label='Sadržaj'
							type='text'
							id='content'
							value={newPostContent}
							onChange={e => setNewPostContent(e.target.value)}
							multiline
							rows={4}
						/>
						<Box>
							<p>Dodaj sliku</p>
							<input type='file' accept='image/*' onChange={e => setNewPostImage(e.target.files[0])} />
						</Box>
						<Box mt={2} display='flex' justifyContent='flex-end'>
							<Button onClick={handleClose} sx={{ mr: 2 }}>
								Odustani
							</Button>
							<Button type='submit' variant='contained' color='primary'>
								Dodaj
							</Button>
						</Box>
					</form>
				</Box>
			</Modal>
		</Container>
	);
};

export default News;
