import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const JoinGroupModal = ({ handleClose, updateGroupList }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();


  const submitHandler = async(data) => {
    try {
      const userId = localStorage.getItem('userId');
      const groupId = data.groupId;
      console.log('data...', data);


      // Fetch group details to check if the user is already a member
      const groupRes = await axios.get(
        `http://localhost:5000/groups/group/${groupId}`
      );
      const groupMembers = groupRes.data.data.members;
      console.log('groupMembers:', groupMembers);
      console.log('group id:', groupId);

      // Check if the current user's ID is already in the list of members
      const isUserAlreadyMember = groupMembers.some(
        member => member._id === userId
      );

      if (isUserAlreadyMember) {
          alert('You are already a member of this group.');
          handleClose();
      } else{

        // Send a POST request to join the group
        const joinRes = await axios.post(
          `http://localhost:5000/groups/join/${userId}`, data
        );
        if (joinRes.status === 200) {
          alert('Added to the group successfully.');
          updateGroupList();
          handleClose(); // Close the modal after joining
        }
      
      }

    } catch (error) {
      console.error('Error joining group:', error);
    }
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <TextField
        label="Enter Group ID"
        variant="outlined"
        fullWidth
        margin="normal"
        {...register('groupId', { required: true })} // Include validation rules
        error={!!errors.groupId} // Show error if there are errors for 'groupId'
        helperText={errors.groupId ? 'Group ID is required' : ''}
      />
      <Button type="submit" variant="contained">
        Join Group
      </Button>
    </form>
  );
};

export default JoinGroupModal;
