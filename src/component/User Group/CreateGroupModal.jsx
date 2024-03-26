import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const CreateGroupModal = ({ handleClose, updateGroupList  }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async data => {
    try {
      const userId = localStorage.getItem('userId');
      data.creator = userId;
      console.log('data...', data);

      const res = await axios.post("http://localhost:5000/groups/group", data);
      if (res.status === 201) {
        alert('Group created');
        updateGroupList();
        handleClose();
      }

    } catch (error) {
      console.error('Error joining group:', error);
      // Handle error, e.g., show error message to user
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Enter Group Name"
        variant="outlined"
        fullWidth
        margin="normal"
        {...register('name', { required: true })} // Include validation rules
        error={!!errors.groupId} // Show error if there are errors for 'groupId'
        helperText={errors.groupId ? 'Group ID is required' : ''}
      />
      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        margin="normal"
        {...register('description', { required: true })} // Include validation rules
        error={!!errors.groupId} // Show error if there are errors for 'groupId'
        helperText={errors.groupId ? 'Group ID is required' : ''}
      />
      <Button type="submit" variant="contained">
        Create Group
      </Button>
    </form>
  );
};

export default CreateGroupModal;