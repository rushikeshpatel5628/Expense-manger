import React, { useState } from 'react';
import ExpensesTable from './ExpensesTable';
import Button from '@mui/material/Button';
import { AddExpense } from './AddExpense';

export const Expenses = () => {
  const [open, setopen] = useState(false);

  const handleOpen = () => {
    setopen(!open);
    window.location.href = '/expense/form';
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
                  <h4 className="card-title">All Expenses</h4>
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
