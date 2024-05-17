import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
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
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const submitHandler = async data => {
    console.log('data....', data);
    try {
      setLoading(true);
      const res = await axios.post(
        'https://expense-manager-backend-1.onrender.com/users/user/isuserexist',
        data
      );
      if (res.data.flag == 1) {
        console.log('Email exist', res.data.data.email);
        //setData in location
        navigate('/resetpassword', {
          state: { email: res.data.data.email },
        });
      }
    } catch (error) {
      console.log('error....', error);
    } finally {
      setLoading(false); // Reset loading state to false after submission
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
        <Title variant="h5" sx={{ marginBottom: '10px' }}>
          Forgot Password
        </Title>
        <form onSubmit={handleSubmit(submitHandler)}>
          <InputField
            label="Enter your email"
            variant="outlined"
            {...register('email')}
            required
          />
          <Box>
            <p style={{ fontSize: '12px', color: '#333333' }}>
              The OTP has been sent to the email address provided.
            </p>
          </Box>
          <SubmitButton variant="contained" type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </SubmitButton>
        </form>
      </FormContainer>
    </Container>
  );
};
