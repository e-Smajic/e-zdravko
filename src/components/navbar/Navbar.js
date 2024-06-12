import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';
import LoginButton from './LoginButton';
import RegisterButton from './RegisterButton';
import NewsButton from './NewsButton';
import AppLogo from './AppLogo';
import { search } from '../../services/UserService';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  maxWidth: '800px', 
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '40ch', 
    },
  },
}));

export default function PrimarySearchAppBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      navigate(`/users?search=${searchQuery}`);
    } catch (error) {
      console.error('Error during search:', error);
    }
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Grid container spacing={2} justifyContent="space-between">
            <AppLogo />

            <Grid item xs={6}>
              <Box  component="form"
                    onSubmit={handleSearch}
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Pretraži..."
                    inputProps={{ 'aria-label': 'search' }}
                    value={searchQuery}
                    onChange={handleInputChange}
                  />
                </Search>
              </Box>  
            </Grid>

            <Grid item xs={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <NewsButton />
                <RegisterButton />
                <LoginButton />
              </Box> 
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
