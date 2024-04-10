import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import {
  Avatar,
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import UserContext from '../../context/UserContext';

export const UserProfile = () => {
  const userId = localStorage.getItem('userId');
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      profilePicture: '',
    },
  });

  const [loading, setLoading] = useState(false);
  const [pic, setPic] = useState('');

  const { user, setUser } = useContext(UserContext);

  const fetchUserData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/users/user/${userId}`);
      console.log(res.data.data);
      const userData = res.data.data;
      setValue('firstName', userData.firstName);
      setValue('lastName', userData.lastName);
      setValue('email', userData.email);
      setValue('profilePicture', userData.profilePicture);
      setPic(userData.profilePicture);
      setUser(userData); // Set user data in the context
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, [setValue, userId, setUser]);

  const onSubmit = async data => {
    try {
      console.log('Form data before appending:', data);
      setLoading(true);
      // Prepare form data
      const formData = new FormData();
      formData.append('firstName', data.firstName);
      formData.append('lastName', data.lastName);
      formData.append('email', data.email);
      // formData.append("profilePicture", data.profilePicture[0]); // Assuming you're only allowing one profile picture

      // Check if a new profile picture is provided
      if (data.profilePicture[0]) {
        formData.append('profilePicture', data.profilePicture[0]);
      } else {
        // If no new profile picture provided, append the current profile picture
        formData.append('profilePicture', user.profilePicture);
      }

      await axios.put('http://localhost:5000/users/user/' + userId, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('form data', formData);

      fetchUserData();
      // Optionally, you can refresh the data after update
      const res = await axios.get('http://localhost:5000/users/user/' + userId);
      const updatedUserData = res.data.data;
      setValue('firstName', updatedUserData.firstName);
      setValue('lastName', updatedUserData.lastName);
      setValue('email', updatedUserData.email);
      setValue('profilePicture', updatedUserData.profilePicture);
      setPic(updatedUserData.profilePicture);

      alert('User updated successfully!');

      // Optional: Handle response if needed
      // console.log('File uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user. Please try again.');
    } finally {
      setLoading(false); // Reset loading state to false after submission
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{
        marginTop: '4rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <label htmlFor="contained-button-file" style={{ position: 'relative' }}>
        <Avatar
          style={{
            width: '8rem',
            height: '8rem',
            marginBottom: '2rem',
            cursor: 'pointer',
          }}
          src={pic}
        />
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="contained-button-file"
          type="file"
          // onChange={handleFileChange}
          {...register('profilePicture')}
        />
        <IconButton
          style={{
            position: 'absolute',
            bottom: '0',
            right: '0',
            backgroundColor: 'white',
            padding: '4px',
          }}
          component="span"
        >
          <EditIcon />
        </IconButton>
      </label>
      <Typography component="h1" variant="h5">
        Upload Profile Picture
      </Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: '100%', marginTop: '1rem' }}
      >
        <TextField
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
          fullWidth
          id="firstName"
          label="First Name"
          {...register('firstName')}
        />
        <TextField
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
          fullWidth
          id="lastName"
          label="Last Name"
          {...register('lastName')}
        />
        <TextField
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
          fullWidth
          id="email"
          disabled
          label="Email Address"
          {...register('email')}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={loading}
          style={{ marginTop: '1rem' }}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </Container>
  );
};
