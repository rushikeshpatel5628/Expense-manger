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
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const columns = [
  { id: 'goalName', label: 'Goal Name', minWidth: 100 },
  { id: 'maxamount', label: 'Max Amount', minWidth: 100 },
  { id: 'startdate', label: 'Start Date', minWidth: 50 },
  { id: 'enddate', label: 'End Date', minWidth: 100 },
];

export default function GoalList({ reloadGoals }) {
  const [rows, setRows] = React.useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  // Custom date formatting function
  const formatDate = dateString => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString('en-US', options);
  };

  const getGoals = async () => {
    try {
      const res = await axios.get('http://localhost:5000/goals/goals/'+userId);
      console.log(res.data.data);
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
    navigate(`/goal/expenses/${id}`);
  };

  React.useEffect(() => {
    getGoals();
  }, [reloadGoals]);

  React.useEffect(() => {
    getGoals();
  }, []);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.id} align="left">
                  {column.label}
                </TableCell>
              ))}
              <TableCell key="actions" align="left">
                Actions
              </TableCell>{' '}
              {/* Added actions column header */}
            </TableRow>
          </TableHead>
          <TableBody>
          {rows.map(row => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                  {columns.map(column => (
                    <TableCell key={column.id} align="left">
                      {column.id === 'startdate' || column.id === 'enddate' ? formatDate(row[column.id]) : row[column.id]}
                    </TableCell>
                  ))}
                  <IconButton aria-label="transaction" onClick={() => handleTransactionClick(row._id)} color="primary">
                    <TransactionIcon />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={() => deleteGoal(row._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
