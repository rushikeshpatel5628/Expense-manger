import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GroupExpensetable } from './GroupExpensetable';
import { useEffect } from 'react';
import { AddGroupExpense } from './AddGroupExpense';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import IosShareIcon from '@mui/icons-material/IosShare';
import Tooltip from '@mui/material/Tooltip';

export const GroupExpense = () => {
  const groupid = useParams().groupid;
  const [loading, setLoading] = useState(true);
  const [data, setdata] = useState([]);
  const [open, setopen] = useState(false);
  const navigate = useNavigate();

  console.log('groupid....', groupid);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/groupexp/group/' + groupid
        );
        if (response.data.flag === 1) {
          setdata(response.data.data);
        } else {
          console.error('Error fetching data:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    console.log(groupid);
    // console.log('data....', data);
  }, [groupid]);

  // Custom date formatting function
  const formatDate = dateString => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString('en-US', options);
  };

  const generatePDF = () => {
    const doc = new jsPDF({
      format: [210, 297],
      orientation: 'portrait',
    });

    const tableData = data.map(row => {
      return [
        row.title,
        row.paidBy.firstName,
        row.amount,
        formatDate(row.expDate),
        row.paymentMethod,
        row.category.categoryName,
        row.description,
      ];
    });

    console.log('table data....', tableData);
    doc.text('All Expenses', 13, 7);
    doc.autoTable({
      head: [
        [
          'Title',
          'PaidBy',
          'Amount',
          'ExpenseDate',
          'PaymentMethod',
          'Category',
          'Description',
        ],
      ],
      body: tableData,
    });

    doc.save('group_expenses.pdf');
  };

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
                  <div>
                    <Tooltip title="Export">
                      <Button onClick={generatePDF}>
                        <IosShareIcon sx={{ fontSize: '30px' }} color="black" />
                      </Button>
                    </Tooltip>
                    <Button variant="contained" onClick={() => handleOpen()}>
                      Add Expense
                    </Button>
                  </div>
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
