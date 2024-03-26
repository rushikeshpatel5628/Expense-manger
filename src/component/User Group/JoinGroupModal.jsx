// import React from 'react';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import axios from 'axios';
// import { useForm } from 'react-hook-form';

// const JoinGroupModal = ({ handleClose }) => {
//   const { register, handleSubmit, formState: { errors } } = useForm();

//   const onSubmit = async (data) => {

//     console.log('Data....', data);

//     try {
//       // Send a POST request to join the group
//       const userId = localStorage.getItem('userId');
//       const res = await axios.post(`http://localhost:5000/groups/join/${userId}`, data);
//       if (res.status === 200) {
//         alert("Added to the group");
//       }
//       // Close the modal after joining
//       handleClose();
//     } catch (error) {
//       console.error('Error joining group:', error);
//       // Handle error, e.g., show error message to user
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <TextField
//         label="Enter Group ID"
//         variant="outlined"
//         fullWidth
//         margin="normal"
//         {...register('groupId', { required: true })} // Include validation rules
//         error={!!errors.groupId} // Show error if there are errors for 'userId'
//         helperText={errors.groupId ? "Group ID is required" : ""}
//       />
//       <Button type="submit" variant="contained">Join Group</Button>
//     </form>
//   );
// };

// export default JoinGroupModal;

import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const JoinGroupModal = ({ handleClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async data => {
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
      } else {
        // Send a POST request to join the group
        const joinRes = await axios.post(
          `http://localhost:5000/groups/join/${groupId}`, data
        );
        if (joinRes.status === 201) {
          alert('Added to the group successfully.');
          // reset(); // Reset form fields
          handleClose(); // Close the modal after joining
        }
      }
    } catch (error) {
      console.error('Error joining group:', error);
    }
  };

  const submitHandler = async(data) => {
    try {
      const userId = localStorage.getItem('userId');
      const groupId = data.groupId;
      console.log('data...', data);

        // Send a POST request to join the group
        const joinRes = await axios.post(
          `http://localhost:5000/groups/join/${userId}`, data
        );
        if (joinRes.status === 201) {
          alert('Added to the group successfully.');
          // reset(); // Reset form fields
          handleClose(); // Close the modal after joining
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
