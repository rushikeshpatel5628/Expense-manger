import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { Container, Grid, Paper, List, ListItem, ListItemText, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import InviteGroupModal from './InviteGroupModal'; // Import the InviteGroupModal component

const GroupDetailsPage = () => {
  const id = useParams().id; // Get group ID from route params
  const [group, setGroup] = useState({ members: [] });
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to manage dialog visibility

  useEffect(() => {
    // Fetch group details when component mounts
    const fetchGroupDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/groups/group/${id}`
        );
        console.log("id....", id)
        console.log('Group....', response.data.data);
        setGroup(response.data.data); // Set group data in state
      } catch (error) {
        console.error('Error fetching group details:', error);
      }
    };

    fetchGroupDetails();
  }, [id]); // Fetch data when groupId changes

  const handleInviteClick = () => {
    setIsDialogOpen(true); // Open the dialog when invite button is clicked
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false); // Close the dialog
  };

  return (
    <Container maxWidth="md">
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
            <Button variant="contained" color="primary" onClick={handleInviteClick}>
              Invite
            </Button>
          </Grid>
          {/* Render InviteGroupModal only when isDialogOpen is true */}
          <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
            <DialogTitle>Invite Members</DialogTitle>
            <DialogContent>
                <p>{id}</p>
              <InviteGroupModal handleClose={handleCloseDialog} groupId={id} />
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
