import React, { useState } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

export const ResetPassword = () => {
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');

  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: location?.state?.email,
    },
  });
  //   console.log(location?.state?.email);
  const navigate = useNavigate();

  const submitHandler = async data => {
    console.log('data....', data);
    try {
      const dataToSend = {
        email: data.email,
        password: data.password,
        otp: data.otp,
        time: new Date().getTime(),
      };
      const res = await axios.post(
        'http://localhost:5000/users/user/resetpassword',
        dataToSend
      );

      if (res.data.flag == 1) {
        // alert('Password reset success');
        toast.info('Password reset sucessfully', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else if (res.status === 401) {
        toast.info('OTP expired!!', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        // alert('OTP expired!!');
        setTimeout(() => {
          navigate('/resetpassword');
        }, 2000);
      } else {
        // alert('Password reset failed');
        toast.info('Password reset failed', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        console.log(res.data);
        setTimeout(() => {
          navigate('/login'); //login....
        }, 2000);
      }
    } catch (error) {
      console.log('error....', error);
      alert('Password reset failed');
      navigate('/');
    }
  };

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh' }}
    >
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Grid item xs={10} sm={6} md={4}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <Typography
                variant="h5"
                align="center"
                sx={{ textTransform: 'none' }}
              >
                Reset Password
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                // label="Disabled"
                defaultValue={email}
                disabled
                {...register('email')}
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="OTP"
                variant="outlined"
                value={otp}
                {...register('otp')}
                onChange={e => setOtp(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="New Password"
                type="password"
                variant="outlined"
                value={password}
                {...register('password')}
                onChange={e => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};
