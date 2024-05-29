// src/components/forum/ForumPost.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Paper, Divider, List, ListItem, ListItemText, ListItemAvatar, Avatar, Button, TextField } from '@mui/material';

const ForumPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    // Replace this with a real API call
    const fetchPost = async () => {
      // Dummy data for demonstration purposes
      const post = {
        id: id,
        title: `Post Title ${id}`,
        author: 'John Doe',
        date: '1 hour ago',
        content: `This is the content of the post with ID ${id}.`,
      };
      setPost(post);
    };

    fetchPost();
  }, [id]);

  const comments = [
    { id: 1, author: 'Alice Johnson', date: '30 minutes ago', content: 'This is a comment on the post.' },
    { id: 2, author: 'Bob Brown', date: '1 hour ago', content: 'Another comment here!' },
    // Add more comments here
  ];

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Box mb={4}>
        <Typography variant="h3" component="h1">{post.title}</Typography>
        <Box display="flex" alignItems="center" mt={2} mb={4}>
          <Avatar alt={post.author} />
          <Box ml={2}>
            <Typography variant="body1" component="p">{post.author}</Typography>
            <Typography variant="body2" component="p">{post.date}</Typography>
          </Box>
        </Box>
        <Paper elevation={0} style={{ padding: '1rem' }}>
          <Typography variant="body1" component="p">{post.content}</Typography>
        </Paper>
      </Box>
      <Divider />
      <Box mt={4}>
        <Typography variant="h5" component="h2">Comments</Typography>
        <List>
          {comments.map((comment) => (
            <React.Fragment key={comment.id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={comment.author} />
                </ListItemAvatar>
                <ListItemText
                  primary={comment.content}
                  secondary={`${comment.author} - ${comment.date}`}
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      </Box>
      <Box mt={4}>
        <Typography variant="h6" component="h3">Add a Comment</Typography>
        <TextField
          label="Comment"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary">Submit</Button>
      </Box>
    </Container>
  );
};

export default ForumPost;