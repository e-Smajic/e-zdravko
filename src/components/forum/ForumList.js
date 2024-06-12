import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Divider, List, ListItem, ListItemText, TextField, Button, Modal } from '@mui/material';
import { getQuestions, getQuestionById, createQuestion } from '../../services/ForumService';
import { Link, useNavigate } from 'react-router-dom';
import { getUserWithMail } from '../../services/UserService';
import { jwtDecode } from 'jwt-decode';

const ForumList = () => {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [newQuestion, setNewQuestion] = useState({
    naslov: '',
    sadrzaj: '',
    anonimnost: 0,
    userUid: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    const decodedToken = jwtDecode(authToken);
    const mail = decodedToken.sub;
    if (!authToken) {
      navigate('/login');
    } else {
      fetchPosts();
    }
    getUserWithMail(mail).then(res => {
      console.log(res.data);
      setUser(res.data);
    }).catch(error => {
      console.log(error);
    });
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await getQuestions();
      setPosts(response.data.reverse());
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // console.log("userUId", user.uid);
  // newQuestion.userUid = user.uid;

  const handleChange = (e) => {
    setNewQuestion({ ...newQuestion, [e.target.name]: e.target.value });
  };

  const handleCreatePost = async () => {
    try {
      newQuestion.userUid = user.uid;
      await createQuestion(newQuestion);
      fetchPosts();
    } catch (error) {
      console.error('Error creating question:', error);
    }
    handleClose();
    window.location.reload();
  };

  const handleClickPost = async (postId) => {
    try {
      await getQuestionById(postId);
      navigate(`/forum/${postId}`);
    } catch (error) {
      console.error('Error fetching post details:', error);
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h3" component="h1">
        Forum
      </Typography>
      <Divider />
      <Button variant="contained" color="primary" onClick={handleOpen} style={{ marginTop: '1rem' }}>
        Create Post
      </Button>
      <List>
        {posts.map((post) => (
          <React.Fragment key={post.id}>
            <ListItem button onClick={() => handleClickPost(post.id)} alignItems="flex-start">
              <ListItemText
                primary={post.naslov}
                secondary={post.sadrzaj}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
          <Typography variant="h6" component="h2">
            Create a New Post
          </Typography>
          <TextField fullWidth label="Title" name="naslov" value={newQuestion.naslov} onChange={handleChange} margin="normal" />
          <TextField fullWidth label="Content" name="sadrzaj" value={newQuestion.sadrzaj} onChange={handleChange} margin="normal" multiline rows={4} />
          <TextField fullWidth label="Anonymity" name="anonimnost" type="number" value={newQuestion.anonimnost} onChange={handleChange} margin="normal" />
          <Button variant="contained" color="primary" onClick={handleCreatePost} style={{ marginTop: '1rem' }}>
            Post
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default ForumList;