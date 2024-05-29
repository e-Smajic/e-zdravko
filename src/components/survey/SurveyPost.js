// src/components/survey/SurveyPost.js

import React from 'react';
import { Container, Typography, Box, Paper, Divider, List, ListItem, ListItemText } from '@mui/material';

const SurveyPost = ({ survey }) => {
  // Dummy survey data for demonstration
  const surveyData = {
    id: 1,
    title: 'Customer Satisfaction Survey',
    date: '1 hour ago',
    description: 'We value your feedback. Please take a few minutes to complete our customer satisfaction survey.',
    questions: [
      'How satisfied are you with our service?',
      'How likely are you to recommend our service to others?',
      'What can we do to improve our service?',
    ],
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Paper elevation={3} sx={{ padding: '1rem' }}>
        <Typography variant="h4" component="h1">
          {surveyData.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {surveyData.date}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body1" component="p">
          {surveyData.description}
        </Typography>
        <List>
          {surveyData.questions.map((question, index) => (
            <ListItem key={index}>
              <ListItemText primary={`${index + 1}. ${question}`} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default SurveyPost;