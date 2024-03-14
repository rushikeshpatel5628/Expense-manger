import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';

function Row({ row, onDelete }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleEdit = () => {
    // Navigate to the update page with the ID parameter
    navigate(`/expense/update/${row._id}`);
  };

  const handleDelete = async () => {
    try {
      // Send DELETE request to delete the transaction
      await axios.delete(
        `http://localhost:5000/transactions/transaction/${row._id}`
      );
      // Call the onDelete callback to remove the row from the table
      onDelete(row._id);
      toast.info('Deleted successfully!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        // transition: Slide,
      });
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.title}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.payee.payeeName}
        </TableCell>
        <TableCell align="right">
          {row.transactionType === 'income' ? (
            <span style={{ color: 'green' }}>+{row.amount}</span>
          ) : (
            <span style={{ color: 'red' }}>-{row.amount}</span>
          )}
        </TableCell>
        <TableCell align="right">{row.expDateTime}</TableCell>
        <TableCell align="right">{row.paymentMethod}</TableCell>
        <TableCell align="right">
          <IconButton aria-label="edit" onClick={handleEdit}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Transaction Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Category</TableCell>
                    {/* <TableCell>Subcategory</TableCell> */}
                    <TableCell align="right">Status</TableCell>
                    {/* <TableCell align="right">Goal</TableCell> */}
                    <TableCell align="right">Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {row.category.categoryName}
                    </TableCell>
                    {/* <TableCell>{row.subcategory.SubCategoryName}</TableCell> */}
                    <TableCell align="right">{row.status}</TableCell>
                    {/* <TableCell align="right">{row.goal.goalName}</TableCell> */}
                    <TableCell align="right">{row.description}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export const GoalExpenses = () => {
  const [rows, setRows] = useState([]);
  const id = useParams().id

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/transactions/goalexpense/' + id
        );
        if (response.data.flag === 1) {
          setRows(response.data.data);
        } else {
          console.error('Error fetching data:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = deletedId => {
    setRows(rows.filter(row => row._id !== deletedId));
  };

  return (
    <TableContainer component={Paper}>
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
        theme="colored"
      />
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Title</TableCell>
            <TableCell>Payee</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Expense Date</TableCell>
            <TableCell align="right">Payment Method</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <Row key={index} row={row} onDelete={handleDelete} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
