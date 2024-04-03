// import * as React from 'react';
import React from 'react';
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
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useEffect, useState } from 'react';

export const GroupList = () => {
  const columns = [
    { id: 'name', label: 'Name', minWidth: 100 },
    { id: 'description', label: 'description', minWidth: 100 },
    { id: 'createdAt', label: 'Created At', minWidth: 50 },
    // { id: 'members', label: 'members', minWidth: 50 },
  ];

  const [rows, setRows] = React.useState([]);
  const navigate = useNavigate();

  const getGroups = async () => {
    const userId = localStorage.getItem('userId');
    console.log('user id....', userId);
    try {
      const res = await axios.get(
        'http://localhost:5000/groups/groups/' + userId
      );
      console.log(res.data.data);
      setRows(res.data.data);
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };

  const groupDetails = (groupId) => {
    // Add your logic for joining a group here
    // For example, you can navigate to a join group page
    navigate(`/group-details/${groupId}`);
  };

  useEffect(() => {
    getGroups();
  }, []);

  const updateGroupList = () => {
    getGroups(); // Call getGroups again to fetch the updated list
  };

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
                      {column.id === 'members'
                        ? row.members
                            .map(
                              member => `${member.firstName} ${member.lastName}`
                            )
                            .join(', ')
                        : row[column.id]}
                    </TableCell>
                  ))}
                  {/* 
                  <IconButton aria-label="delete" onClick={() => deleteGoal(row._id)}>
                    <DeleteIcon />
                  </IconButton> 
                  */}
                  <IconButton aria-label="open" color="primary" onClick={()=>groupDetails(row._id)}>
                    <OpenInNewIcon />
                  </IconButton>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>  
      </TableContainer>
    </Paper>
  );
};
