import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { GroupList } from './GroupList';
import JoinGroupModal from './JoinGroupModal';
import CreateGroupModal from './CreateGroupModal';

export const Groups = () => {
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
              <GroupList />
            </div>
          </div>
        </div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Group</DialogTitle>
        <DialogContent>
          {/* Add your content for creating group */}
          <CreateGroupModal handleClose={handleClose} />
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
          <JoinGroupModal handleClose={handleCloseJoinGroup} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseJoinGroup}>Cancel</Button>
          <Button onClick={handleCloseJoinGroup}>Join</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
