// src/components/survey/SurveyCreate.js

import React, { useState } from 'react';
import { Container, Typography, Box, Paper, TextField, Button } from '@mui/material';

const SurveyCreate = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState(['']);

  const handleAddQuestion = () => {
    setQuestions([...questions, '']);
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index] = value;
    setQuestions(newQuestions);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here, e.g., send the new survey to the server
    console.log('Survey Title:', title);
    console.log('Survey Description:', description);
    console.log('Survey Questions:', questions);
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Paper elevation={3} sx={{ padding: '1rem' }}>
        <Typography variant="h4" component="h1">
          Create New Survey
        </Typography>
        <form onSubmit={handleFormSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="description"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={4}
          />
          {questions.map((question, index) => (
            <TextField
              key={index}
              margin="normal"
              required
              fullWidth
              label={`Question ${index + 1}`}
              value={question}
              onChange={(e) => handleQuestionChange(index, e.target.value)}
            />
          ))}
          <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
            <Button variant="outlined" onClick={handleAddQuestion}>
              Add Question
            </Button>
          </Box>
          <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default SurveyCreate;