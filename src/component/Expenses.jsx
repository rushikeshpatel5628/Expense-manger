import React, { useState } from 'react';
import ExpensesTable from './ExpensesTable';
import Button from '@mui/material/Button';
import { AddExpense } from './AddExpense';
import { useNavigate } from 'react-router-dom';
import { ClearIcon } from '@mui/x-date-pickers';
import { Search } from '@mui/icons-material';
import {
  Box,
  Container,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export const Expenses = () => {
  const [open, setopen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = event => {
    setQuery(event.target.value);
  };

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
                  <div className="d-flex align-items-center">
                    <h4 className="card-title">All Expenses</h4>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      {/* <SearchIcon
                        sx={{ color: 'action.active', mr: 0, my: 0.5, ml: 0.5 }}
                      /> */}
                      <TextField
                        id="outlined-basic"
                        label="Search"
                        variant="standard"
                        onChange={handleSearch}
                        value={query}
                        style={{ marginLeft: '30px' }}
                        size="small"
                      />
                    </Box>
                  </div>
                  <Button variant="contained" onClick={() => handleOpen()}>
                    Add Expense
                  </Button>
                </div>
                <div className="card-body">
                  <ExpensesTable query={query}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
