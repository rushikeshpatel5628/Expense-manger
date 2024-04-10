import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

export const LogIn = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const submitHandler = async data => {
    console.log('data...', data);

    try {
      const res = await axios.post(
        'http://localhost:5000/users/user/login',
        data
      );
      console.log('data', res.data.data);
      if (res.status === 200) {
        alert('login successfull');
      }
      localStorage.setItem('userId', res.data.data._id);
      navigate('/user/dashboard');
    } catch (error) {
      console.log('error', error);
      alert('Invalid Email or password');
    }
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-md-6">
            <form className="login-form" onSubmit={handleSubmit(submitHandler)}>
              <h2 className="text-center mb-4">Login</h2>
              <div className="form-group">
                <label htmlFor="username">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  {...register('email')}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  {...register('password')}
                />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block">
                  Sign in
                </button>
              </div>
              <p className="text-center">
                Don't have an account? <Link to="/user/signup">Sign up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
