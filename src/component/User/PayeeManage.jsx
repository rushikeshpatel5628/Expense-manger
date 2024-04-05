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

export const PayeeManage = () => {
//   const [payee, setpayee] = useState([]);
  const [rows, setRows] = useState([]);
  const userId = localStorage.getItem('userId');

  const loadPayee = async () => {
    try {
      const res = await axios.get(
        'http://localhost:5000/payees/payees/' + userId
      );
      setRows(res.data.data);
      console.log('payees', res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadPayee();
  }, []);

  const columns = [
    { id: 'number', label: '#', minWidth: 20 },
    { id: 'payeeName', label: 'Name', minWidth: 100 },
  ];

  const rowsWithNumbers = rows.map((row, index) => ({ ...row, number: index + 1 }));

  return (
    <div>
      <div style={{ height: 300, width: '100%' }}>
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
                  <TableCell align="left">Update</TableCell>
                  <TableCell align="left">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rowsWithNumbers.map(row => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    {columns.map(column => (
                      <TableCell key={column.id} align="left">
                        {row[column.id]}
                      </TableCell>
                    ))}
                    <TableCell align="left">
                      <IconButton aria-label="update">
                        <Update />
                      </IconButton>
                    </TableCell>
                    <TableCell align="left">
                      <IconButton aria-label="delete">
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
  );
};
