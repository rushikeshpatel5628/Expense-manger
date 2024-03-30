import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { Container, Grid, Paper, List, ListItem, ListItemText, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import InviteGroupModal from './InviteGroupModal'; // Import the InviteGroupModal component
import { ToastContainer, toast } from 'react-toastify';



const GroupDetailsPage = () => {
  const groupid = useParams().id; // Get group ID from route params
  const [group, setGroup] = useState({ members: [] });
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to manage dialog visibility
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
        console.log("id....", groupid)
        console.log('Group....', response.data.data);
        setGroup(response.data.data); // Set group data in state
        calculateGroupSummary(response.data.data);
      } catch (error) {
        console.error('Error fetching group details:', error);
      }
    };

    fetchGroupDetails();
  }, [groupid]); // Fetch data when groupId changes


  const calculateGroupSummary = (groupData) => {
    // Calculate total group expenses
    const totalGroupExpenses = groupData.expenses.reduce((total, expense) => total + expense.amount, 0);

    // Filter expenses paid by the current user
    const myExpenses = groupData.expenses.filter(expense => expense.paidBy == userId);
    console.log("my expenses", myExpenses)

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
      amountOwing
    });
  };
  

  const handleInviteClick = () => {
    setIsDialogOpen(true); // Open the dialog when invite button is clicked
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false); // Close the dialog
  };

  const handleLeaveGroup = async () => {
    try {
      await axios.post(`http://localhost:5000/groups/${groupid}/leave`, { userId });
      // Redirect to some page after leaving the group
      toast.success('You left the group ', {
        position: "top-center",
        autoClose: 1900,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        setTimeout(() => {
          navigate('/user/groups')
        }, 3200);
      
    } catch (error) {
      console.error('Error leaving group:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <ToastContainer
        position="top-center"
        autoClose={1900}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
      <Typography variant="h2" align="center" gutterBottom>
        Group Details
      </Typography>
      {group ? (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper>
              <Typography variant="h3" align="center" gutterBottom>
                {group.name}
              </Typography>
              <Typography variant="body1" align="center" gutterBottom>
                Description: {group.description}
              </Typography>
              <Typography variant="body1" align="center" gutterBottom>
                Creator: {group.creator}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper>
              <Typography variant="h4" align="center" gutterBottom>
                Members:
              </Typography>
              <List>
                {group.members ? (
                  group.members.map(member => (
                    <ListItem key={member._id}>
                      <ListItemText primary={`${member.firstName} ${member.lastName}`} />
                    </ListItem>
                  ))
                ) : (
                  <ListItem>
                    <ListItemText primary="No members found" />
                  </ListItem>
                )}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper>
              <Typography variant="h4" align="center" gutterBottom>
                Group Summary:
              </Typography>
              <Typography variant="body1" align="center" gutterBottom>
                Total Group Expenses: {groupSummary ? groupSummary.totalGroupExpenses : 'Calculating...'}
              </Typography>
              <Typography variant="body1" align="center" gutterBottom>
                Total My Expenses: {groupSummary ? groupSummary.totalMyExpenses : 'Calculating...'}
              </Typography>
              <Typography variant="body1" align="center" gutterBottom>
                Amount Owed to Me: {groupSummary ? groupSummary.amountOwed : 'Calculating...'}
              </Typography>
              <Typography variant="body1" align="center" gutterBottom>
                Amount I Owe: {groupSummary ? groupSummary.amountOwing : 'Calculating...'}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleInviteClick}>
              Invite
            </Button>
            <Link to={`/group/expenses/${groupid}/`} style={{ textDecoration: 'none', marginLeft: '10px' }}>
              <Button variant="contained" color="primary">
                View Expenses
              </Button>
            </Link>
            <Button variant="contained" color="primary" style={{marginLeft: "10px"}} onClick={handleLeaveGroup}>
                Leave Group
              </Button>
          </Grid>
          {/* Render InviteGroupModal only when isDialogOpen is true */}
          <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
            <DialogTitle>Invite Members</DialogTitle>
            <DialogContent>
                <p>{groupid}</p>
              <InviteGroupModal handleClose={handleCloseDialog} groupId={groupid} />
            </DialogContent>
            <DialogActions>
              {/* You can add additional actions or buttons here */}
            </DialogActions>
          </Dialog>
        </Grid>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </div>
      )}
    </Container>
  );
};

export default GroupDetailsPage;
