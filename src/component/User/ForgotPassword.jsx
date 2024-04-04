import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Container, Typography, TextField, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FormContainer = styled('div')({
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  width: '300px',
});

const Title = styled(Typography)({
  marginTop: 0,
  textAlign: 'center',
  color: '#333',
});

const InputField = styled(TextField)({
  width: '100%',
  marginBottom: '10px',
});

const SubmitButton = styled(Button)({
  width: '100%',
  padding: '10px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#0056b3',
  },
});

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const submitHandler = async data => {
    console.log('data....', data);
    try {
        const res = await axios.post("http://localhost:5000/users/user/isuserexist", data)
        if (res.data.flag == 1) {
            console.log("Email exist", res.data.data.email);
            //setData in location
            navigate("/resetpassword", {
              state: { email: res.data.data.email },
            });
          }
    } catch (error) {
        console.log("error....", error)
    }
  };

  return (
    <Container
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <FormContainer>
        <Title variant="h5">Forgot Password</Title>
        <form onSubmit={handleSubmit(submitHandler)}>
          <InputField
            label="Enter your email"
            variant="outlined"
            {...register('email')}
            required
          />
          <SubmitButton variant="contained" type="submit">
            Submit
          </SubmitButton>
        </form>
      </FormContainer>
    </Container>
  );
};
