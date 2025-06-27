import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          URL Shortener App
        </Typography>
        <Button color="inherit" component={RouterLink} to="/">
          Shorten URL
        </Button>
        <Button color="inherit" component={RouterLink} to="/stats">
          Statistics
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;