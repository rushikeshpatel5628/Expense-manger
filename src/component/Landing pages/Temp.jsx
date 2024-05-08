import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { Grid, Paper, Container, Typography } from '@mui/material';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#FFFF' : '#1A2027',
    border: '1px solid',
    borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
    fontSize: 16,
    width: 'auto',
    padding: '10px 12px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'inherit', // Keep the label color the same as the default state when input is focused
  },
}));

export const Temp = () => {
  return (
    <Grid container sx={{ flexDirection: 'column', width: '800px' }}>
      <Box component="form" noValidate sx={{ marginLeft: '20px' }}>
        <Paper elevation={2}>
          <Box>
            <Typography
              variant="h4"
              sx={{
                paddingTop: '15px',
              }}
            >
              Add Expense
            </Typography>
          </Box>
          <Box>
            <FormControl variant="standard">
              <InputLabel
                shrink
                htmlFor="bootstrap-input"
                sx={{ fontSize: '20px' }}
              >
                Bootstrap
              </InputLabel>
              <BootstrapInput
                defaultValue="react-bootstrap"
                id="bootstrap-input"
              />
            </FormControl>
          </Box>
        </Paper>
      </Box>
    </Grid>
  );
};
