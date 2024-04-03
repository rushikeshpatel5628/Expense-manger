import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';


const InviteGroupModal = ({ handleClose, groupId}) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    console.log('Data....', data);
    console.log("group id....", groupId);
    try {
      // Send a POST request to invite members to the group
      const res = await axios.post(`http://localhost:5000/groups/groups/${groupId}/invite`, data);
      if (res.status === 200) {
        alert("Invitation sent successfully");
        // toast.success('Mail invitation sent', {
        //   position: 'top-center',
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: 'light',
        // });
      }
      // Close the modal after inviting
      handleClose();
    } catch (error) {
      console.error('Error inviting members to group:', error);
      // Handle error, e.g., show error message to user
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        theme="light"
      />
      <TextField
        label="Enter Email"
        variant="outlined"
        fullWidth
        margin="normal"
        {...register('email', { required: true })} // Include validation rules
        error={!!errors.email} // Show error if there are errors for 'email'
        helperText={errors.email ? "Email is required" : ""}
      />
      <Button type="submit" variant="contained">Send Invitation</Button>
    </form>
  );
};

export default InviteGroupModal;
