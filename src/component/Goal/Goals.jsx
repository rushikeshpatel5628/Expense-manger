import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GoalList from './GoalList';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';

export const Goals = () => {
  const [open, setopen] = useState(false);
  const [reloadGoals, setReloadGoals] = useState(false);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  const handleOpen = () => {
    setopen(!open);
    // window.location.href = '/expense/form';
    navigate('/goal/add');
  };

  const handleOpenModal = () => {
    setopen(true);
  };

  const handleCloseModal = () => {
    setopen(false);
  };

  const submitHandler = async data => {
    data.user = userId;
    console.log('data', data);

    try {
      const res = await axios.post('http://localhost:5000/goals/goal', data);
      if (res.status === 201) {
        alert('data posted');
        handleCloseModal();
        setReloadGoals(!reloadGoals);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getGoals = async () => {
      try {
        const res = await axios.get('http://localhost:5000/goals/goals/' + userId);
        setReloadGoals(false); // Reset reloadGoals state
      } catch (error) {
        console.error('Error fetching goals:', error);
      }
    };

    getGoals();
  }, [reloadGoals, userId]);

  return (
    <div className="container-fluid">
      <div className="row w-auto">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="card-title mx-2">All Goals</h4>
              <Button
                variant="contained"
                className="mx-2"
                onClick={() => handleOpenModal()}
              >
                Add Goal
              </Button>
            </div>
            <div className="card-body">
              <GoalList reloadGoals={reloadGoals}/>
            </div>
          </div>
        </div>
      </div>
      <Modal open={open} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            width: 400,
          }}
        >
          <h2>Add Goal</h2>
          <form onSubmit={handleSubmit(submitHandler)}>
            <TextField
             variant='standard'
             InputLabelProps={{
              shrink: true,
            }}
              fullWidth
              margin="normal"
              label="Goal Name"
              name="goalName"
              {...register('goalName')}
            />
            <TextField
             variant='standard'
             InputLabelProps={{
              shrink: true,
            }}
              fullWidth
              margin="normal"
              label="Start Date"
              type="date"
              name="startDate"
              {...register('startdate')}
            />
            <TextField
             variant='standard'
             InputLabelProps={{
              shrink: true,
            }}
              fullWidth
              margin="normal"
              label="End Date"
              type="date"
              name="endDate"
              {...register('enddate')}
            />
            <TextField
             variant='standard'
             InputLabelProps={{
              shrink: true,
            }}
              fullWidth
              margin="normal"
              label="Maximum Amount"
              type="number"
              name="maxAmount"
              {...register('maxamount')}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: '1rem' }}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};
