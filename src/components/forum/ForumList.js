import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Divider, List, ListItem, ListItemText } from '@mui/material';
import { getQuestions, getQuestionById } from '../../services/ForumService';
import { Link } from 'react-router-dom';

const ForumList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await getQuestions();
      setPosts(response.data);
      console.log(posts)
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleClickPost = async (postId) => {
    console.log("id: ", postId);
    try {
      const response = await getQuestionById(postId);
      window.location.href = `/forum/${postId}`; // Assuming your URL structure is '/forum/postId'
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
    </Container>
  );
};

export default ForumList;