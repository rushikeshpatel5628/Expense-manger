import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import { Delete, Update } from '@mui/icons-material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import { Modal, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { UpdatePayeeModal } from './UpdatePayeeModal';
import { UpdateCategoryModal } from './UpdateCategoryModal';
import AddIcon from '@mui/icons-material/Add';
import '../User/PayeeManageCSS.css'


export const CategoryManage = () => {
  //   const [payee, setpayee] = useState([]);
  const [rows, setRows] = useState([]);
  const userId = localStorage.getItem('userId');

  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const {register, handleSubmit, reset} = useForm()

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateOpen = (category) => {
    setSelectedCategory(category);
    setUpdateOpen(true);
  };

  const handleUpdateClose = () => {
    setSelectedCategory(null);
    setUpdateOpen(false);
  };

  const loadCategory = async () => {
    try {
      const res = await axios.get(
        'http://localhost:5000/usercategory/category/user/' + userId
      );
      setRows(res.data.data);
      console.log('categories', res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = async (data) => {
    console.log("data....", data);
    data.user = userId;
    try {
      const res = await axios.post("http://localhost:5000/usercategory/category", data);
      if(res.status === 201){
        alert("Category added");
        handleClose();
        reset();
        loadCategory();
      }
    } catch (error) {
      console.log("error....", error)
    }
  }

  const deleteCategory = async (categoryId) => {
    try {
      // Send DELETE request to the API endpoint
    //   const res = await axios.delete(`http://localhost:5000/shared-category/categories/${categoryId}`, {
    //     data: { userId: userId } // Send userId in the request body
    //   });
        const res = await axios.delete("http://localhost:5000/usercategory/category/"+ categoryId)
      if (res.status === 200) {
        alert("Category deleted");
        // Remove the deleted category from the frontend
        setRows(rows.filter(row => row._id !== categoryId));
      } else if (res.status === 404) {
        alert("Predefined category not found");
      } else {
        // Handle other status codes
        console.log("Unexpected status code:", res.status);
      }
    } catch (error) {
      console.log("error....", error);
      // Handle error responses, such as displaying an error message to the user
    }
  };
  

  useEffect(() => {
    loadCategory();
  }, []);

  const columns = [
    { id: 'number', label: '#', minWidth: 20 },
    { id: 'categoryName', label: 'Name', minWidth: 100 },
  ];

  const rowsWithNumbers = rows.map((row, index) => ({
    ...row,
    number: index + 1,
  }));

  return (
    <div>
      <div className="card-header d-flex justify-content-between align-items-center">
        <h4 className="card-title">Manage Categories</h4>
        <Button type="submit" variant="contained" onClick={handleOpen}  startIcon={<AddIcon />} sx={{width:'110px'}}>
          Category
        </Button>
      </div>
      <div className="card-body ">
        <div style={{ height: 300, width: '100%' }}>
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer style={{ maxHeight: 300, overflowY: 'auto'  }} className="custom-scrollbar">
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map(column => (
                      <TableCell key={column.id} align="left">
                        {column.label}
                      </TableCell>
                    ))}
                    <TableCell align="left">Update</TableCell>
                    <TableCell align="left">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rowsWithNumbers.map(row => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id} size='small'>
                      {columns.map(column => (
                        <TableCell key={column.id} align="left"  size='small'>
                          {row[column.id]}
                        </TableCell>
                      ))}
                      <TableCell align="left">
                        <IconButton aria-label="update" onClick={() => handleUpdateOpen(row)}>
                          <Update />
                        </IconButton>
                      </TableCell>
                      <TableCell align="left">
                        <IconButton aria-label="delete" onClick={() => deleteCategory(row._id)}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </div>
      </div>
      <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Category</DialogTitle>
        <DialogContent>
          {/* Text field for entering payee name */}
          <form onSubmit={handleSubmit(submitHandler)}>
          <TextField
            autoFocus
            margin="dense"
            id="payeeName"
            label="Category name"
            type="text"
            fullWidth
            {...register('categoryName')}
          />
          <Button type='submit' color="primary" variant='contained' sx={{my:2}}>
            Submit
          </Button>
          </form>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>


      <Dialog open={updateOpen} onClose={handleUpdateClose}>
      <DialogTitle>Update Category</DialogTitle>
        <DialogContent>
        <UpdateCategoryModal
            selectedCategory={selectedCategory}
            handleUpdateClose={handleUpdateClose}
            loadCategory={loadCategory}
            
          />
        </DialogContent>
        <DialogActions>
        <Button onClick={handleUpdateClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};
