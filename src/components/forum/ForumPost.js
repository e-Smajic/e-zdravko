import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Divider, TextField, Button } from '@mui/material';
import { getQuestionById, createComment, getComments } from '../../services/ForumService';

const ForumPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [commentContent, setCommentContent] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await getQuestionById(id);
      setPost(response.data);
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await getComments();
      console.log(response.data)
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleCommentSubmit = async () => {
    try {
      await createComment({ content: commentContent, questionId: id });
      // Refresh the comments after submitting the new comment
      fetchComments();
      // Clear the comment input field
      setCommentContent('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  // Filter comments based on the questionId of the current post
  const postComments = comments.filter(comment => comment.questionId == id);
  console.log("id: ", id);
  console.log("Ima li sta", postComments);

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h3" component="h1">
        {post.naslov}
      </Typography>
      <Divider />
      <Box mt={2}>
        <Typography variant="body1" component="p">
          {post.sadrzaj}
        </Typography>
      </Box>
      <Box mt={4}>
        <Typography variant="h5" component="h2">
          Comments
        </Typography>
        {/* Display existing comments */}
        {postComments.map((comment, index) => (
          <Box key={index} mt={2}>
            <Typography variant="body1" component="p">
              {comment.sadrzaj}
            </Typography>
          </Box>
        ))}
        {/* Comment Form */}
        <Box mt={4}>
          <TextField
            multiline
            rows={4}
            fullWidth
            label="Add a comment"
            variant="outlined"
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleCommentSubmit} style={{ marginTop: '1rem' }}>
            Post Comment
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ForumPost;