// src/components/survey/SurveyList.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Box, Paper, Button, Divider, List, ListItem, ListItemText, InputBase, IconButton, Menu, MenuItem } from '@mui/material';
import { Search as SearchIcon, FilterList as FilterListIcon } from '@mui/icons-material';

const SurveyList = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

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

  // Dummy surveys data for demonstration
  const surveys = [
    {
      id: 1,
      title: 'Customer Satisfaction Survey',
      date: '1 hour ago',
      description: 'We value your feedback. Please take a few minutes to complete our customer satisfaction survey.',
    },
    {
      id: 2,
      title: 'Employee Engagement Survey',
      date: '2 hours ago',
      description: 'Help us improve our workplace by providing your honest feedback in this employee engagement survey.',
    },
    {
      id: 3,
      title: 'Product Feedback Survey',
      date: '3 hours ago',
      description: 'Your opinion matters to us. Please share your thoughts on our latest product in this feedback survey.',
    },
    // Add more surveys here
  ];

  // Pagination configuration
  const surveysPerPage = 5;
  const totalPages = Math.ceil(surveys.length / surveysPerPage);
  const startIndex = (currentPage - 1) * surveysPerPage;
  const endIndex = startIndex + surveysPerPage;
  const currentSurveys = surveys.slice(startIndex, endIndex);

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box display="flex" alignItems="center">
          <Typography variant="h3" component="h1">
            Surveys
          </Typography>
          <IconButton onClick={handleFilterClick}>
            <FilterListIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleFilterClose}
          >
            <MenuItem onClick={() => handleFilterSelect('Today')}>Today</MenuItem>
            <MenuItem onClick={() => handleFilterSelect('This Week')}>This Week</MenuItem>
            <MenuItem onClick={() => handleFilterSelect('This Month')}>This Month</MenuItem>
            <MenuItem onClick={() => handleFilterSelect('All')}>All</MenuItem>
          </Menu>
        </Box>
        <Box display="flex" alignItems="center">
          <Paper component="form" elevation={0} sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 'auto' }}>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Surveys"
              inputProps={{ 'aria-label': 'search surveys' }}
            />
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
          <Button variant="contained" color="primary" sx={{ ml: 2 }} component={Link} to="/survey/create">
            Create Survey
          </Button>
        </Box>
      </Box>
      <Divider />
      <List>
        {currentSurveys.map((survey) => (
          <React.Fragment key={survey.id}>
            <ListItem alignItems="flex-start" button component={Link} to={`/survey/${survey.id}`}>
              <ListItemText
                primary={survey.title}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="textPrimary">
                      {survey.date}
                    </Typography>
                    {" — "}{survey.description}
                  </>
                }
              />
            </ListItem>
            <Divider component="li" />
          </React.Fragment>
        ))}
      </List>
      <Box mt={4} display="flex" justifyContent="center">
        <Button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>Previous</Button>
        <Typography variant="body1" component="div" sx={{ mx: 2 }}>{currentPage}</Typography>
        <Button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>Next</Button>
      </Box>
    </Container>
  );
};

export default SurveyList;