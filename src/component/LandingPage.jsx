import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Paper,
} from '@mui/material';

export const LandingPage = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Expense Manager</Typography>
          <Button color="inherit">Sign In</Button>
          <Button color="inherit">Sign Up</Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Grid
          container
          spacing={3}
          justify="center"
          style={{ marginTop: '2rem' }}
        >
          <Grid item xs={12} md={6}>
            <Paper elevation={3} style={{ padding: '2rem' }}>
              <Typography variant="h4" gutterBottom>
                Welcome to Expense Manager
              </Typography>
              <Typography variant="body1" gutterBottom>
                Keep track of your expenses easily with our intuitive expense
                manager.
              </Typography>
              <Typography variant="body1" gutterBottom>
                Sign in or sign up now to get started.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
