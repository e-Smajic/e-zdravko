import * as React from 'react';
import { useState, useEffect } from 'react';
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
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Avatar, IconButton, Badge, MenuItem, Menu } from '@mui/material';
import { search } from '../../services/UserService';
import { jwtDecode } from 'jwt-decode';
import { getUserWithMail } from '../../services/UserService';

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      setIsLoggedIn(true);
      const decodedToken = jwtDecode(authToken);
      const mail = decodedToken.sub;
      console.log(mail);

      getUserWithMail(mail).then(res => {
        console.log(res.data);
        setUser(res.data);
      }).catch(error => {
        console.log(error);
      });
    } else {
      setIsLoggedIn(false);
    }
  }, []);

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

  const handleNotificationClick = () => {
    // Handle notification button click
  };

  const handleMojProfilClick = () => {
    navigate('/user');
  }

  const handleOdjavaClick = () => {
    localStorage.removeItem('authToken');
    navigate('/');
    window.location.reload();
  }

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
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

            <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              {isLoggedIn && user ? (
                <>
                  <IconButton onClick={handleNotificationClick} color="inherit" sx={{marginRight: "10px"}}>
                    <Badge badgeContent={0} color="secondary">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                  <div>
                    <Avatar onClick={handleAvatarClick}>
                      {user ? user.ime.charAt(0) : '?'}
                    </Avatar>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleCloseMenu}
                    >
                      <MenuItem onClick={handleMojProfilClick}>Moj profil</MenuItem>
                      <MenuItem onClick={handleOdjavaClick}>Odjava</MenuItem>
                    </Menu>
                  </div>
                </>
              ) : (
                <>
                  <NewsButton />
                  <RegisterButton />
                  <LoginButton />
                </>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
