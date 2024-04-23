import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Button,
  Box,
  Stack,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import {
  Container,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import InviteGroupModal from './InviteGroupModal'; // Import the InviteGroupModal component
import { ToastContainer, toast } from 'react-toastify';

const GroupDetailsPage = () => {
  const groupid = useParams().id; // Get group ID from route params
  const [group, setGroup] = useState({ members: [] });
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to manage dialog visibility
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false); // State for leave dialog
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // State for leave dialog
  const [groupSummary, setGroupSummary] = useState(null);
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch group details when component mounts
    const fetchGroupDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/groups/group/${groupid}`
        );
        console.log('id....', groupid);
        console.log('Group....', response.data.data);
        setGroup(response.data.data); // Set group data in state
        calculateGroupSummary(response.data.data);
      } catch (error) {
        console.error('Error fetching group details:', error);
      }
    };

    fetchGroupDetails();
  }, [groupid]); // Fetch data when groupId changes

  const calculateGroupSummary = groupData => {
    // Calculate total group expenses
    const totalGroupExpenses = groupData.expenses.reduce(
      (total, expense) => total + expense.amount,
      0
    );

    // Filter expenses paid by the current user
    const myExpenses = groupData.expenses.filter(
      expense => expense.paidBy == userId
    );
    console.log('my expenses', myExpenses);

    console.log('User ID:', userId);
    console.log('Expenses:', groupData);

    // Calculate total amount spent individually
    const totalMyExpenses = myExpenses.reduce((total, expense) => {
      // console.log('Total in current iteration:', total);
      return total + expense.amount;
    }, 0);

    // Calculate amount owed or owing after splitting expenses equally
    const numGroupMembers = groupData.members.length;
    const splitAmount = totalGroupExpenses / numGroupMembers;
    const amountOwed = splitAmount * (numGroupMembers - 1);
    const amountOwing = totalMyExpenses - amountOwed;

    // Set group summary data in state
    setGroupSummary({
      totalGroupExpenses,
      totalMyExpenses,
      amountOwed,
      amountOwing,
    });
  };

  const handleInviteClick = () => {
    setIsDialogOpen(true); // Open the dialog when invite button is clicked
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false); // Close the dialog
  };

  const handleLeaveCloseDialog = () => {
    setIsLeaveDialogOpen(false); // Close the leave dialog
  };

  const handleDeleteCloseDialog = () => {
    setIsDeleteDialogOpen(false); // Close the delete dialog
  };

  const handleLeaveGroup = () => {
    setIsLeaveDialogOpen(true);
  };

  const handleDeleteGroup = () => {
    setIsDeleteDialogOpen(true);
  };

  const confirmLeaveGroup = () => {
    leaveGroup(groupid); // Call function to leave group
    setIsLeaveDialogOpen(false);
  };

  const confirmDeleteGroup = () => {
    deleteGroup(groupid); // Call function to delete group
    setIsDeleteDialogOpen(false);
  };

  const deleteGroup = async groupid => {
    try {
      if (userId !== group.creator) {
        alert('you are not allowed to delete group');
      } else {
        const res = await axios.delete(
          'http://localhost:5000/groups/group/' + groupid
        );
        if (res.status === 200) {
          // alert('group deleted!!');
          toast.success('Group deleted ', {
            position: 'top-center',
            autoClose: 1900,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
          setTimeout(() => {
            navigate('/user/groups');
          }, 1500);
        } else {
          alert('Group is not deleted!!');
        }
      }
    } catch (error) {
      alert('error');
      console.log('error:', error);
    }
  };

  const leaveGroup = async () => {
    try {
      if (userId == group.creator) {
        alert('Not allowed to left the group!!.');
      } else {
        await axios.post(`http://localhost:5000/groups/${groupid}/leave`, {
          userId,
        });
        // Redirect to some page after leaving the group
        toast.success('You left the group ', {
          position: 'top-center',
          autoClose: 1900,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        setTimeout(() => {
          navigate('/user/groups');
        }, 2000);
      }
    } catch (error) {
      console.error('Error leaving group:', error);
    }
  };

  const handleExpenses = () => {
    // localStorage.setItem('GroupID', groupid);
    navigate('/group/expenses/' + groupid);
  };

  return (
    <Container maxWidth="md" sx={{ width: '80em' }}>
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
      {group ? (
        <>
          <Box
            sx={{
              mb: 4,
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
              borderRadius: '8px',
              bgcolor: '#FAF9F6',
            }}
          >
            <Typography variant="h4" align="left" gutterBottom m={2}>
              {group.name}
            </Typography>
            <Typography variant="h5" align="left" gutterBottom m={2}>
              {group.description}
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item md={6} xs={6}>
              <Box
                bgcolor={'background.paper'}
                p={2}
                sx={{
                  mb: 4,
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                  borderRadius: '8px',
                  mx: 'auto',
                }}
              >
                <List
                  sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper',
                  }}
                >
                  {/* Heading */}
                  <Typography
                    variant="h5"
                    align="left"
                    gutterBottom
                    sx={{ marginLeft: '10px' }}
                  >
                    Members
                  </Typography>

                  {/* Button */}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleInviteClick}
                    sx={{
                      float: 'right',
                      marginTop: '-40px',
                      marginRight: '10px',
                    }}
                  >
                    invite
                  </Button>

                  {/* List Items */}
                  {group.members ? (
                    group.members.map((member, index) => (
                      <React.Fragment key={member._id}>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar
                              alt="Remy Sharp"
                              src={member.profilePicture}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={`${member.firstName} ${member.lastName} ${
                              member._id === group.creator ? '(creator)' : ''
                            }`}
                          />
                        </ListItem>
                        {/* Add a divider after each list item except for the last one */}
                        {index !== group.members.length - 1 && (
                          <Divider variant="middle" component="li" />
                        )}
                      </React.Fragment>
                    ))
                  ) : (
                    <ListItem>
                      <ListItemText primary="No members found" />
                    </ListItem>
                  )}
                </List>
              </Box>
            </Grid>
            <Grid item md={6} xs={6}>
              <Box
                bgcolor={'background.paper'}
                p={2}
                sx={{
                  mb: 4,
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                  borderRadius: '8px',
                }}
              >
                <List
                  sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper',
                  }}
                >
                  {/* Heading */}
                  <Typography
                    variant="h5"
                    align="left"
                    gutterBottom
                    sx={{ marginLeft: '10px' }}
                  >
                    Group Summary
                  </Typography>
                  {/* List Items */}
                  <ListItem>
                    <ListItemText
                      primary={`Total Group Expenses ${
                        groupSummary
                          ? groupSummary.totalGroupExpenses
                          : 'Calculating...'
                      }`}
                    />
                  </ListItem>
                  <Divider variant="middle" />
                  <ListItem>
                    <ListItemText
                      primary={`Total My Expenses ${
                        groupSummary
                          ? groupSummary.totalMyExpenses
                          : 'Calculating...'
                      }`}
                    />
                  </ListItem>
                  <Divider variant="middle" />
                  <ListItem>
                    <ListItemText
                      primary={`Amount Owed to Me ${
                        groupSummary
                          ? groupSummary.amountOwed
                          : 'Calculating...'
                      }`}
                    />
                  </ListItem>
                  <Divider variant="middle" />

                  <ListItem>
                    <ListItemText
                      primary={`Amount I Owe ${
                        groupSummary
                          ? groupSummary.amountOwing
                          : 'Calculating...'
                      }`}
                    />
                  </ListItem>

                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleExpenses(groupid)}
                    sx={{ marginLeft: '10px', mb: '4px', mt: '4px' }}
                  >
                    View expenses
                  </Button>
                </List>
              </Box>
            </Grid>
            <Stack
              gap={2}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                mt: '20px',
              }}
            >
              <Button
                variant="contained"
                size="medium"
                color="error"
                onClick={handleLeaveGroup}
              >
                leave group
              </Button>
              <Button
                variant="contained"
                size="medium"
                color="error"
                onClick={handleDeleteGroup}
              >
                Delete group
              </Button>
            </Stack>
            {/* Render InviteGroupModal only when isDialogOpen is true */}
            <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
              <DialogTitle>Invite Members</DialogTitle>
              <DialogContent>
                <p>{groupid}</p>
                <InviteGroupModal
                  handleClose={handleCloseDialog}
                  groupId={groupid}
                />
              </DialogContent>
              <DialogActions>
                {/* You can add additional actions or buttons here */}
              </DialogActions>
            </Dialog>
            {/* Dialog for confirming leave group */}
            <Dialog open={isLeaveDialogOpen} onClose={handleLeaveCloseDialog}>
              <DialogTitle> Leave Group </DialogTitle>
              <DialogContent>
                <Typography>
                  Are you sure you want to leave this group?
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleLeaveCloseDialog} color="primary">
                  Cancel
                </Button>
                <Button onClick={confirmLeaveGroup} color="primary">
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
            {/* Dialog for confirming delete group */}
            <Dialog open={isDeleteDialogOpen} onClose={handleDeleteCloseDialog}>
              <DialogTitle> Delete Group </DialogTitle>
              <DialogContent>
                <Typography>
                  Are you sure you want to delete this group?
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDeleteCloseDialog} color="primary">
                  Cancel
                </Button>
                <Button onClick={confirmDeleteGroup} color="primary">
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </div>
      )}
    </Container>
  );
};

export default GroupDetailsPage;
