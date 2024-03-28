import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GroupExpensetable } from './GroupExpensetable';
import { useEffect } from 'react';
import { AddGroupExpense } from './AddGroupExpense';

export const GroupExpense = () => {
  const groupid = useParams().groupid;
  const [loading, setLoading] = useState(true);
  const [open, setopen] = useState(false);
  const navigate = useNavigate();

  console.log('groupid....', groupid);
  useEffect(() => {
    // Simulate loading delay with setTimeout
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Adjust the delay as needed or remove if not necessary

    // Cleanup function
    return () => clearTimeout(timer);
  }, [groupid]);

  // Render loading indicator while loading
  if (loading) {
    return <div>Loading...</div>;
  }

  const handleOpen = () => {
    setopen(!open);
    // window.location.href = '/expense/form';
    navigate(`/addgroupexp/${groupid}`);
  };

  return (
    <>
    {open ? (
        <AddGroupExpense />
      ) : (
      <div className="container-fluid">
        <div className="row w-auto">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h4 className="card-title">All Expenses</h4>
                <Button variant="contained" onClick={() => handleOpen()}>Add Expense</Button>
              </div>
              <div className="card-body">
                {/* <GroupExpensetable groupid={groupid} /> */}
                {groupid && <GroupExpensetable groupid={groupid} />}
              </div>
            </div>
          </div>
        </div>
      </div>  
      )}
    </>
  );
};
