// src/components/Footer.js
import React from 'react';
import { Typography, Container, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const PREFIX = 'Footer';
const classes = {
  footer: `${PREFIX}-footer`,
};

const StyledFooter = styled('div')(({ theme }) => ({
  [`& .${classes.footer}`]: {
    padding: theme.spacing(3),
    marginTop: 'auto',
    backgroundColor: theme.palette.background.paper,
    textAlign: 'center',
  },
}));

const Footer = () => {
  return (
    <StyledFooter>
      <Box component="footer" className={classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="body1">
            e-Zdravko klinika
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Posvećeni vašem zdravlju i dobrobiti
          </Typography>
        </Container>
      </Box>
    </StyledFooter>
  );
};

export default Footer;