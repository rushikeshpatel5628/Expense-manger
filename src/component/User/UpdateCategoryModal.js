import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { TextField, Button } from '@mui/material';

export const UpdateCategoryModal = ({ selectedCategory, handleUpdateClose, loadCategory }) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm();

      
      const onSubmit = async data => {
        try {
          const userId = localStorage.getItem('userId');
          console.log('data...', data);
    
          const res = await axios.put(`http://localhost:5000/usercategory/category/${selectedCategory._id}`, data);
          if (res.status === 201) {
            alert('Category updated');
            handleUpdateClose();
            loadCategory(); // Update the payee list after updating
          }
    
        } catch (error) {
          console.error('Error joining group:', error);
          // Handle error, e.g., show error message to user
        }
      };


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Category Name"
        variant="outlined"
        fullWidth
        margin="normal"
        defaultValue={selectedCategory ? selectedCategory.categoryName : ""}
        {...register('categoryName')} // Include validation rules
        error={!!errors.groupId} // Show error if there are errors for 'groupId'
        helperText={errors.categoryName ? 'Category name is required' : ''}
      />
      <Button type="submit" variant="contained">
        Update
      </Button>
    </form>
  );
};
