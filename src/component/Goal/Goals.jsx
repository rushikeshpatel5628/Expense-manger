import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import GoalList from './GoalList';
import Button from '@mui/material/Button';


export const Goals = () => {

    const [open, setopen] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => {
    setopen(!open);
    // window.location.href = '/expense/form';
    navigate('/goal/add');
  };


  return (
    
        <div className="container-fluid">
          <div className="row w-auto">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h4 className="card-title mx-2">All Goals</h4>
                  <Button variant="contained" className='mx-2' onClick={() => handleOpen()}>
                    Add Goal
                  </Button>
                </div>
                <div className="card-body">
                  <GoalList />
                </div>
              </div>
            </div>
          </div>
        </div>
    
  )
}
