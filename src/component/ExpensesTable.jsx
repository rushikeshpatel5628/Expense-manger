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
import { useFetcher, useNavigate } from 'react-router-dom';
import { Button, TablePagination, Select, MenuItem } from '@mui/material';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import IosShareIcon from '@mui/icons-material/IosShare';
import { Margin } from '@mui/icons-material';




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
          {/* {row.payee?.payeeName} */}
          {row.payee == null ? "[DELETED]" : row.payee.payeeName}
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
                      {/* {row.category.categoryName} */}
                      {row.category == null ? "[DELETED]" : row.category.categoryName}
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

export default function ExpensesTable({query}) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setcategories] = useState([])
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const userId = localStorage.getItem('userId');

  const loadAllCategories = async()=> {
    try {
      const res = await axios.get("http://localhost:5000/usercategory/category/user/"+userId);
      setcategories(res.data.data)
    } catch (error) {
      
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/transactions/transactions/' + userId
        );
        if (response.data.flag === 1) {
          // Format date before setting rows
          const formattedRows = response.data.data.map(transaction => ({
            ...transaction,
            expDateTime: formatDate(transaction.expDateTime), // Format date
          }));
          setRows(formattedRows);
        } else {
          console.error('Error fetching data:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading state to false when data fetching completes
      }
    };
    fetchData();
    loadAllCategories()
    console.log('rows....', rows);
  }, []);

  // Custom date formatting function
  const formatDate = dateString => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString('en-US', options);
  };

  const handleDelete = deletedId => {
    setRows(rows.filter(row => row._id !== deletedId));
  };

  const handlePaymentMethodChange = event => {
    setSelectedPaymentMethod(event.target.value);
  };

  const handleCategoryChange = event => {
    setSelectedCategory(event.target.value);
  };


  const filteredRows = rows.filter(row => {
    if (selectedPaymentMethod && selectedCategory) {
      return row.paymentMethod === selectedPaymentMethod && row.category.categoryName === selectedCategory;
    } else if (selectedPaymentMethod) {
      return row.paymentMethod === selectedPaymentMethod;
    } else if (selectedCategory) {
      return row.category.categoryName === selectedCategory;
    } else {
      return true;
    }
  });

  useEffect(() => {
    console.log("filtered rows....", filteredRows);
  }, [selectedPaymentMethod, selectedCategory]);
  


  const generatePDF = () => {
    const doc = new jsPDF({
      format: [210, 297],
      orientation: 'portrait',
    });

    const tableData = rows.map(row => {
      const fontColor = row.transactionType === 'income' ? 'green' : 'red';
        const payee = row.payee == null ? "[DELETED]" : row.payee.payeeName;
      return [
        row.title,
        payee,
        { content: row.amount, styles: { textColor: fontColor } },
        row.expDateTime,
        row.paymentMethod,
        row.category.categoryName,
        row.status,
        row.description,
      ];
    });

    console.log('table data....', tableData);
    doc.text('All Expenses', 13, 7);
    doc.autoTable({
      head: [
        [
          'Title',
          'Payee',
          'Amount',
          'ExpenseDate',
          'PaymentMethod',
          'Category',
          'Status',
          'Description',
        ],
      ],
      body: tableData,
    });

    doc.save('expenses.pdf');
  };

  // if (loading) {
  //   return <div>Loading...</div>; // Render loading state
  // }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const currentRows = filteredRows.filter((r, ind) => {
    return ind >= rowsPerPage * page && ind < rowsPerPage * (page + 1);
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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


<Box sx={{ marginBottom: 2 }}>
        <Select
          value={selectedPaymentMethod}
          onChange={handlePaymentMethodChange}
          displayEmpty
          variant="outlined"
          size='small'
          style={{ marginRight: '20px' }}
        >
          <MenuItem value="">All Payment Methods</MenuItem>
          <MenuItem value="upi">UPI</MenuItem>
          <MenuItem value="credit card">Credit Card</MenuItem>
          {/* <MenuItem value="Debit Card">Debit Card</MenuItem> */}
          <MenuItem value="cash">Cash</MenuItem>
        </Select>
        <Select
          value={selectedCategory}
          onChange={handleCategoryChange}
          displayEmpty
          size='small'
          variant="outlined"
        >
          <MenuItem value="">All Categories</MenuItem>
          {/* Populate categories dynamically */}
          {categories.map(category => (
            <MenuItem key={category._id} value={category.categoryName}>{category.categoryName}</MenuItem>
          ))}
        </Select>
      </Box>






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
          {/* {currentRows.map((row, index) => (
            <Row key={index} row={row} onDelete={handleDelete} />
          ))} */}
          {/* {currentRows
            .filter(row => (query ? row.title.toLowerCase().includes(query.toLowerCase()) : true))
            .map((row, index) => (
              <Row key={index} row={row} onDelete={handleDelete} />
            ))} */}
             {currentRows
            .filter(row => (query ? row.title.toLowerCase().includes(query.toLowerCase()) : true))
            .map((row, index) => (
              <Row key={index} row={row} onDelete={handleDelete} />
            ))}
        </TableBody>
      </Table>
      <Button onClick={generatePDF} sx={{ top: '15px' }}>
        <IosShareIcon sx={{ fontSize: '30px' }} color="black" />
      </Button>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        
      />
    </TableContainer>
  );
}
