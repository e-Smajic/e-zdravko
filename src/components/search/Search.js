import React, { useEffect, useState } from 'react';
import { Container, List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography } from '@mui/material';
import { search } from '../../services/UserService';
import { useLocation, useNavigate } from 'react-router-dom';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const query = useQuery();
    const searchQuery = query.get('search');
    const navigate = useNavigate();
  
    useEffect(() => {
        const fetchData = async () => {
          if (searchQuery) {
            try {
              const params = { query: searchQuery };
              const data = await search(params);
              setUsers(data.data);
              console.log(data.data);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          }
          else {
            try {
                const params = { query: ' ' };
                const data = await search(params);
                setUsers(data.data);
                console.log(data.data);
              } catch (error) {
                console.error('Error fetching data:', error);
              }
          }
        };
    
        fetchData();
      }, [searchQuery]);

    const handleUserClick = (user) => {
      navigate('/profile', { state: { user } });
    };
    
      return (
        <Container>
          <Typography variant="h4" gutterBottom sx={{ marginTop: '20px' }}>
            Profili
          </Typography>
          <List>
            {users.map((user) => (
              <ListItem key={user.id} button onClick={() => handleUserClick(user)}>
                <ListItemAvatar>
                  <Avatar>
                    {user.ime.charAt(0)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={`${user.ime} ${user.prezime}`} secondary={user.email} />
              </ListItem>
            ))}
          </List>
        </Container>
      );
  };
  
  export default UsersList;
