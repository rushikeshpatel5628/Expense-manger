import React, { useState } from 'react';
import ExpensesTable from './ExpensesTable';
import Button from '@mui/material/Button';
import { AddExpense } from './AddExpense';
import { useNavigate } from 'react-router-dom';

export const Expenses = () => {
  const [open, setopen] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => {
    setopen(!open);
    // window.location.href = '/expense/form';
    navigate('/expense/form');
  };

  return (
    <>
      {open ? (
        <AddExpense />
      ) : (
        <div className="container-fluid">
          <div className="row w-auto">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h4 className="card-title">
                    All Expenses
                    <input
                      type="text"
                      placeholder="Search..."
                      className="mx-3"
                    />
                  </h4>
                  <Button variant="contained" onClick={() => handleOpen()}>
                    Add Expense
                  </Button>
                </div>
                <div className="card-body">
                  <ExpensesTable />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
