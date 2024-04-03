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
import { useNavigate } from 'react-router-dom';
import { TablePagination } from '@mui/material';

function Row({ row, onDelete, groupId }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  const handleEdit = () => {
    // Only allow the user who added the expense to edit it
    if (userId === row.paidBy._id) {
      // Navigate to the update page with the ID parameter and group ID
      navigate(`/groupexp/update/${groupId}/${row._id}`);
    } else {
      // toast.error('You are not authorized to edit this expense.');
      toast.info('You are not authorized to edit this expense.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  };

  const handleDelete = async () => {
    try {
      // Send DELETE request to delete the transaction
      await axios.delete(`http://localhost:5000/groupexp/groupexp/${row._id}`);
      // Call the onDelete callback to remove the row from the table
      onDelete(row._id);
      // alert('Expense deleted....');
      toast.success('Expense deleted', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  // Custom date formatting function
  const formatDate = dateString => {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
};

  return (
    <React.Fragment>
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
          {row.paidBy.firstName} {row.paidBy.lastName}
        </TableCell>
        <TableCell align="right">{row.amount}</TableCell>
        <TableCell align="right">{formatDate(row.expDate)}</TableCell>
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
                Expense Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Category</TableCell>
                    <TableCell align="right">Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {row.category.categoryName}
                    </TableCell>
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
  groupId: PropTypes.string.isRequired,
};

export const GroupExpensetable = ({ groupid }) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/groupexp/group/' + groupid
        );
        if (response.data.flag === 1) {
          // Format date before setting rows

          setRows(response.data.data);
        } else {
          console.error('Error fetching data:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    console.log(groupid);
  }, [groupid]);

  useEffect(() => {
    console.log('rows....', rows);
  }, [rows]);

  

  const handleDelete = deletedId => {
    setRows(rows.filter(row => row._id !== deletedId));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell sx={{ fontWeight: 'bolder' }}>Title</TableCell>
            <TableCell sx={{ fontWeight: 'bolder' }}>Paid By</TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bolder' }}>
              Amount
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bolder' }}>
              Expense Date
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bolder' }}>
              Payment Method
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bolder' }}>
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <Row
              key={index}
              row={row}
              onDelete={handleDelete}
              groupId={groupid}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
