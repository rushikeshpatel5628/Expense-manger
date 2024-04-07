import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Avatar, Button, Container, IconButton, TextField, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

export const UserProfile =()=> {
  const userId = localStorage.getItem('userId')
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: ""
    }
  });
  const [password, setpassword] = useState("");
  const [role, setrole] = useState("")

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/users/user/${userId}`);
        const userData = res.data.data;
        setValue("firstName", userData.firstName);
        setValue("lastName", userData.lastName);
        setValue("email", userData.email);
        setpassword(res.data.data.password)
        setrole(res.data.data.role._id)
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    fetchUserData();
  }, [setValue, userId]);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log("Selected file:", file);
    setSelectedFile(file);
  };

  const onSubmit = async (data) => {
    try {
      console.log("Form data before appending:", data);
      // Prepare form data
      const formData = new FormData();
      formData.append('firstName', data.firstName);
      formData.append('lastName', data.lastName);
      formData.append('email', data.email);
      formData.append('myImage', selectedFile);
      formData.append('password', password);
      formData.append('role', role);

      console.log("form data: ", formData)
      // Make a POST request to your backend API to handle file upload and form data
      const response = await axios.post('http://localhost:5000/users/fileUpload', formData);

      // Optional: Handle response if needed
      console.log('File uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <label htmlFor="contained-button-file" style={{ position: 'relative' }}>
        <Avatar
          style={{ width: '8rem', height: '8rem', marginBottom: '2rem', cursor: 'pointer' }}
          src={selectedFile ? URL.createObjectURL(selectedFile) : ''}
        />
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="contained-button-file"
          type="file"
          onChange={handleFileChange}
          {...register('profilePicture')}
        />
        <IconButton
          style={{ position: 'absolute', bottom: '0', right: '0', backgroundColor: 'white', padding: '4px' }}
          component="span"
        >
          <EditIcon />
        </IconButton>
      </label>
      <Typography component="h1" variant="h5">
        Upload Profile Picture
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%', marginTop: '1rem' }}>
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
        {/* <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="password"
          label="Password"
          type="password"
          {...register('password')}
        /> */}
        <Button type="submit" fullWidth variant="contained" color="primary" style={{ marginTop: '1rem' }}>
          Submit
        </Button>
      </form>
    </Container>
  );
}
