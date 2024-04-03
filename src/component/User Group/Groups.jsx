import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { GroupList } from './GroupList';
import JoinGroupModal from './JoinGroupModal';
import CreateGroupModal from './CreateGroupModal';
import axios from 'axios';
import { Paper } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { IconButton } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export const Groups = () => {
  const columns = [
    { id: 'name', label: 'Name', minWidth: 100 },
    { id: 'description', label: 'Description', minWidth: 100 },
    { id: 'createdAt', label: 'Created At', minWidth: 50 },
    // { id: 'members', label: 'members', minWidth: 50 },
  ];

  const [rows, setRows] = React.useState([]);
  // const navigate = useNavigate();

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

  const groupDetails = groupId => {
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

  const [open, setOpen] = useState(false);
  const [joinGroupOpen, setJoinGroupOpen] = useState(false);

  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleJoinGroup = () => {
    setJoinGroupOpen(true);
  };

  const handleCloseJoinGroup = () => {
    setJoinGroupOpen(false);
  };

  const handleCreateGroup = () => {
    handleClose();
  };

  // Date formatting
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Month is zero-based
    const year = date.getFullYear();
  
    // Ensure leading zeros if needed
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
  
    return `${formattedDay}/${formattedMonth}/${year}`;
  };

  return (
    <div className="container-fluid">
      <div className="row w-auto">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="card-title mx-2">All Groups</h4>
              <div>
                <Button
                  variant="contained"
                  className="mx-2"
                  onClick={handleJoinGroup}
                >
                  Join Group
                </Button>

                <Button
                  variant="contained"
                  className="mx-2"
                  onClick={handleOpen}
                >
                  Create Group
                </Button>
              </div>
            </div>
            <div className="card-body">
              {/* <GroupList /> */}
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
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row._id}
                          >
                            {columns.map(column => (
                              <TableCell key={column.id} align="left">
                                {column.id === 'createdAt'
                                  ? formatDate(row.createdAt)
                                  : row[column.id]}
                              </TableCell>
                            ))}
                            {/* 
                  <IconButton aria-label="delete" onClick={() => deleteGoal(row._id)}>
                    <DeleteIcon />
                  </IconButton> 
                  */}
                            <IconButton
                              aria-label="open"
                              color="primary"
                              onClick={() => groupDetails(row._id)}
                            >
                              <OpenInNewIcon />
                            </IconButton>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Group</DialogTitle>
        <DialogContent>
          {/* Add your content for creating group */}
          <CreateGroupModal handleClose={handleClose} updateGroupList={updateGroupList} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreateGroup}>Create</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={joinGroupOpen} onClose={handleCloseJoinGroup}>
        <DialogTitle>Join Group</DialogTitle>
        <DialogContent>
          {/* Add your content for joining a group */}
          <JoinGroupModal handleClose={handleCloseJoinGroup} updateGroupList={updateGroupList}/>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleCloseJoinGroup}>Cancel</Button>
          <Button onClick={handleCloseJoinGroup}>Join</Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
};
