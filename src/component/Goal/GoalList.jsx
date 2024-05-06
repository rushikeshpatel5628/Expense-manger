import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import TransactionIcon from '@mui/icons-material/LocalAtm';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, IconButton, Modal, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { DesktopDatePicker } from '@mui/x-date-pickers';

const columns = [
  { id: 'goalName', label: 'Goal Name', minWidth: 100 },
  { id: 'maxamount', label: 'Max Amount', minWidth: 100 },
  { id: 'startdate', label: 'Start Date', minWidth: 50 },
  { id: 'enddate', label: 'End Date', minWidth: 100 },
  { id: 'expenses', label: 'Expenses', minWidth: 50, dynamicWidth: true },
  { id: 'update', label: 'Update', minWidth: 50, dynamicWidth: true },
  { id: 'delete', label: 'Delete', minWidth: 50, dynamicWidth: true },
];

export default function GoalList({ reloadGoals }) {
  const [rows, setRows] = React.useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [open, setopen] = React.useState(false);
  const [reloadGoal, setReloadGoal] = useState(true);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const { register, handleSubmit, setValue } = useForm();

  // Custom date formatting function
  // const formatDate = dateString => {
  //   const date = new Date(dateString);
  //   const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  //   return date.toLocaleDateString('en-GB', options);
  // };

  const formatDate = dateString => {
    // Ensure the date is in ISO 8601 format
    const isoDateString = dateString.split('/').reverse().join('-');
    const date = new Date(isoDateString);

    // Format the date as "dd/mm/yyyy"
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  };

  const getGoals = async () => {
    try {
      const res = await axios.get(
        'http://localhost:5000/goals/goals/' + userId
      );
      console.log('data....', res.data.data);
      setRows(res.data.data);
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };

  const deleteGoal = async id => {
    try {
      await axios.delete(`http://localhost:5000/goals/goal/${id}`);
      // If deletion is successful, update the state to reflect the changes
      setRows(prevRows => prevRows.filter(row => row._id !== id));
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };

  const handleTransactionClick = id => {
    // localStorage.setItem('GoalID', id);
    // navigate('/goal/expenses/');
    navigate(`/goal/expenses/${id}`);
  };

  const handleEditClick = goal => {
    setSelectedGoal(goal);
    handleOpenModal();
    console.log('selectedGoal....', goal);
  };

  const handleOpenModal = () => {
    setopen(true);
  };

  const handleCloseModal = () => {
    setopen(false);
    setSelectedGoal(null);
    setReloadGoal(true);
  };

  const submitHandler = async data => {
    data.user = userId;
    console.log('data', data);

    try {
      let res;
      if (selectedGoal) {
        // Update existing goal
        res = await axios.put(
          `http://localhost:5000/goals/goal/${selectedGoal._id}`,
          data
        );
      }
      if (res.status === 201 || res.status === 200) {
        handleCloseModal();
      }
    } catch (error) {
      console.error('Error submitting goal:', error);
    }
  };

  // React.useEffect(() => {
  //   const getGoals = async () => {
  //     try {
  //       const res = await axios.get(
  //         'http://localhost:5000/goals/goals/' + userId
  //       );
  //     } catch (error) {
  //       console.error('Error fetching goals:', error);
  //     }
  //   };

  //   getGoals();
  // }, [userId]);

  // React.useEffect(() => {
  //   getGoals();
  // }, []);

  React.useEffect(() => {
    if (reloadGoal) {
      getGoals(); // Fetch updated goal data
      setReloadGoal(false); // Reset flag
    }
  }, [reloadGoal, userId]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.id} align="left">
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                  {columns.map(column => (
                    <TableCell
                      key={column.id}
                      align="left"
                      style={{
                        width: column.dynamicWidth ? '5px' : 'inherit',
                      }}
                    >
                      {column.id === 'startdate' || column.id === 'enddate' ? (
                        formatDate(row[column.id])
                      ) : column.id === 'expenses' ? (
                        <IconButton
                          aria-label="transaction"
                          onClick={() => handleTransactionClick(row._id)}
                          color="primary"
                        >
                          <TransactionIcon />
                        </IconButton>
                      ) : column.id === 'update' ? (
                        <IconButton
                          aria-label="edit"
                          onClick={() => handleEditClick(row)}
                        >
                          <EditIcon />
                        </IconButton>
                      ) : column.id === 'delete' ? (
                        <IconButton
                          aria-label="delete"
                          onClick={() => deleteGoal(row._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      ) : (
                        row[column.id]
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={open} onClose={handleCloseModal}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
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
            <h2>Update Goal</h2>
            <form onSubmit={handleSubmit(submitHandler)}>
              <TextField
                variant="standard"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                margin="normal"
                label="Goal Name"
                name="goalName"
                defaultValue={selectedGoal ? selectedGoal.goalName : ''}
                {...register('goalName')}
              />
              <TextField
                variant="standard"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                margin="normal"
                label="Start Date"
                type="date"
                name="startDate"
                defaultValue={
                  selectedGoal ? formatDate(selectedGoal.startdate) : ''
                }
                {...register('startdate')}
              />
              <TextField
                variant="standard"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                margin="normal"
                label="End Date"
                type="date"
                name="endDate"
                defaultValue={selectedGoal ? selectedGoal.enddate : ''}
                {...register('enddate')}
              />
              {/* <DesktopDatePicker
                inputFormat="dd/MM/yyyy"
                label="Start Date"
                value={
                  selectedGoal && selectedGoal.startdate
                    ? selectedGoal.startdate
                    : new Date()
                }
                onChange={date => setValue('enddate', date)}
                renderInput={params => <TextField {...params} />}
              /> */}
              <TextField
                variant="standard"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                margin="normal"
                label="Maximum Amount"
                type="number"
                name="maxAmount"
                defaultValue={selectedGoal ? selectedGoal.maxamount : ''}
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
        </LocalizationProvider>
      </Modal>
    </Paper>
  );
}
