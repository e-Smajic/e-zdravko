import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Paper, Divider, List, ListItem, ListItemText, ListItemAvatar, Avatar, Button, TextField } from '@mui/material';
import { getQuestionById, createComment } from '../../services/ForumService';

const ForumPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newCommentContent, setNewCommentContent] = useState('');

  useEffect(() => {
    fetchPostAndComments();
  }, [id]);

  const fetchPostAndComments = async () => {
    try {
      const postResponse = await getQuestionById(id);
      setPost(postResponse.data);
      setComments(postResponse.data.comments); // Assuming comments are part of the post data
    } catch (error) {
      console.error('Error fetching post and comments:', error);
    }
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    try {
      const newComment = { content: newCommentContent, questionId: parseInt(id) };
      await createComment(newComment);
      fetchPostAndComments();
      setNewCommentContent('');
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

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
        <form onSubmit={handleCommentSubmit}>
          <TextField
            label="Comment"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            margin="normal"
            value={newCommentContent}
            onChange={(e) => setNewCommentContent(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary">Submit</Button>
        </form>
      </Box>
    </Container>
  );
};

export default ForumPost;