import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, Button, Divider, List, ListItem, ListItemText, ListItemAvatar, Avatar, InputBase, IconButton, Menu, MenuItem, Modal, TextField } from '@mui/material';
import { Search as SearchIcon, FilterList as FilterListIcon } from '@mui/icons-material';
import { createQuestion, getQuestions } from '../../services/ForumService';

const ForumList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostAnonimnost, setNewPostAnonimnost] = useState(1);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await getQuestions();
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const newPost = {
        naslov: newPostTitle,
        sadrzaj: newPostContent,
        anonimnost: newPostAnonimnost, 
      };
      await createQuestion(newPost);
      fetchPosts();
      handleClose();
      setNewPostTitle('');
      setNewPostContent('');
      setNewPostAnonimnost(1);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const postsPerPage = 5;
  const totalPages = Math.ceil(posts.length / postsPerPage);

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h3" component="h1">
          Forum
        </Typography>
        <Button variant="contained" color="primary" onClick={handleOpen}>Create Post</Button>
      </Box>
      <Divider />
      <List>
        {posts.map((post) => (
          <React.Fragment key={post.id}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={post.naslov}
                secondary={post.sadrzaj}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
      <Box mt={4} display="flex" justifyContent="center">
        <Button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>Previous</Button>
        <Typography variant="body1" component="div" sx={{ mx: 2 }}>{currentPage}</Typography>
        <Button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>Next</Button>
      </Box>

      <Modal open={open} onClose={handleClose} aria-labelledby="new-post-modal-title" aria-describedby="new-post-modal-description">
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <Typography id="new-post-modal-title" variant="h6" component="h2">New Post</Typography>
          <form onSubmit={handleFormSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="content"
              label="Content"
              type="text"
              id="content"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              multiline
              rows={4}
            />
            <TextField
              margin="normal"
              fullWidth
              id="anonimnost"
              label="Anonimnost"
              name="anonimnost"
              value={newPostAnonimnost}
              onChange={(e) => setNewPostAnonimnost(e.target.value)}
            />
            <Box mt={2} display="flex" justifyContent="flex-end">
              <Button onClick={handleClose} sx={{ mr: 2 }}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary">Submit</Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </Container>
  );
};

export default ForumList;