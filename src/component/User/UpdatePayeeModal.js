import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { TextField, Button } from '@mui/material';

export const UpdatePayeeModal = ({ selectedPayee, handleUpdateClose, loadPayee }) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm();

      
      const onSubmit = async data => {
        try {
          const userId = localStorage.getItem('userId');
          // data.creator = userId;
          console.log('data...', data);
    
          const res = await axios.put(`http://localhost:5000/payees/payee/${selectedPayee._id}`, data);
          if (res.status === 201) {
            alert('Payee updated');
            handleUpdateClose();
            loadPayee(); // Update the payee list after updating
          }
    
        } catch (error) {
          console.error('Error joining group:', error);
          // Handle error, e.g., show error message to user
        }
      };


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Payee Name"
        variant="outlined"
        fullWidth
        margin="normal"
        defaultValue={selectedPayee ? selectedPayee.payeeName : ""}
        {...register('payeeName')} // Include validation rules
        error={!!errors.groupId} // Show error if there are errors for 'groupId'
        helperText={errors.groupId ? 'Group ID is required' : ''}
      />
      <Button type="submit" variant="contained">
        Update
      </Button>
    </form>
  );
};
