import React from 'react';
import { Container, Typography, Box, Paper, Button, Divider, List, ListItem, ListItemText, ListItemAvatar, Avatar, InputBase, IconButton, Menu, MenuItem } from '@mui/material';
import { Search as SearchIcon, FilterList as FilterListIcon } from '@mui/icons-material';

const ForumList = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [currentPage, setCurrentPage] = React.useState(1);

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const handleFilterSelect = (filter) => {
    console.log(filter); // You can implement your filter logic here
    setAnchorEl(null);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Dummy posts data for demonstration
  const posts = [
    {
      id: 1,
      author: 'John Doe',
      date: '1 hour ago',
      content: 'This is the first post in the forum.',
    },
    {
      id: 2,
      author: 'Jane Smith',
      date: '2 hours ago',
      content: 'Second post here!',
    },
    {
      id: 3,
      author: 'Alice Johnson',
      date: '3 hours ago',
      content: 'Third post incoming...',
    },
    // Add more posts here
  ];

  // Pagination configuration
  const postsPerPage = 5;
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = posts.slice(startIndex, endIndex);

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box display="flex" alignItems="center">
          <Typography variant="h3" component="h1">
            Forum
          </Typography>
          <IconButton onClick={handleFilterClick}>
            <FilterListIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleFilterClose}
          >
            <MenuItem onClick={() => handleFilterSelect('Danas')}>Danas</MenuItem>
            <MenuItem onClick={() => handleFilterSelect('Ove sedmice')}>Ove sedmice</MenuItem>
            <MenuItem onClick={() => handleFilterSelect('Ovaj mjesec')}>Ovaj mjesec</MenuItem>
            <MenuItem onClick={() => handleFilterSelect('Sve')}>Sve</MenuItem>
          </Menu>
        </Box>
        <Box display="flex" alignItems="center">
          <Paper component="form" elevation={0} sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 'auto' }}>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Pretraži"
              inputProps={{ 'aria-label': 'search posts' }}
            />
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
          <Button variant="contained" color="primary" sx={{ ml: 2 }}>Kreiraj Post</Button>
        </Box>
      </Box>
      <Divider />
      <List>
        {currentPosts.map((post) => (
            <React.Fragment key={post.id}>
            <ListItem alignItems="flex-start" sx={{ justifyContent: 'space-between' }}>
                <ListItemText>
                {post.content}
                </ListItemText>
                <Box display="flex" alignItems="center">
                <ListItemText
                    primary={post.author}
                    secondary={post.date}
                    sx={{ textAlign: 'right' }}
                />
                <ListItemAvatar sx={{ marginLeft: '20px' }}>
                    <Avatar alt={post.author} />
                </ListItemAvatar>
                </Box>
            </ListItem>
            <Divider variant="inset" component="li" />
            </React.Fragment>
        ))}
      </List>
      <Box mt={4} display="flex" justifyContent="center">
        <Button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>Prethodna</Button>
        <Typography variant="body1" component="div" sx={{ mx: 2 }}>{currentPage}</Typography>
        <Button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>Sljedeća</Button>
      </Box>
    </Container>
  );
};

export default ForumList;
