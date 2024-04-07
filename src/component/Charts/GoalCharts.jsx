import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Select, MenuItem } from '@mui/material';
import { Pie } from 'react-chartjs-2';

export const GoalCharts = () => {
  const [selectedGoal, setSelectedGoal] = useState('');
  const [goals, setGoals] = useState([]);
  const [goalTransactions, setGoalTransactions] = useState([]);
  const [error, setError] = useState('');

  const getAllGoals = async (req, res) => {
    try {
      const res = await axios.get('http://localhost:5000/goals/goal');
      setGoals(res.data.data);
      //   console.log('Goals....', goals);

      // Set the default selected goal to the ID of the first goal
      if (res.data.data.length > 0) {
        setSelectedGoal(res.data.data[0]._id);
      }
    } catch (error) {
      console.log('Error fetching transactions:', error);
    }
  };

  //   Get transactions by goal Id
  const getTransactionsByGoal = async goalId => {
    try {
      const response = await axios.get(
        `http://localhost:5000/transactions/goalexpense/${goalId}`
      );
      setGoalTransactions(response.data.data);
      console.log('goal transaction: ', response.data.data);
    } catch (error) {
      if (error.response.status === 404) {
        setError('Expenses not found for this goal');
      } else {
        console.log('Error fetching transactions:', error);
      }
    }
  };

  useEffect(() => {
    getAllGoals();
  }, []);

  useEffect(() => {
    console.log('goals....', goals);
  }, []);

  useEffect(() => {
    console.log('goal transactions....', goalTransactions);
  }, []);

  useEffect(() => {
    console.log('selected goal....', selectedGoal);
  }, []);

  useEffect(() => {
    if (selectedGoal) {
      getTransactionsByGoal(selectedGoal);
    }
  }, [selectedGoal]);

  const calculateCategoryExpenses = () => {
    const categoryExpensesMap = {};

    // Filter data to include only expenses
    const expenseData = goalTransactions.filter(
      transaction => transaction.transactionType === 'expense'
    );

    expenseData.forEach(transaction => {
      const categoryName = transaction.category.categoryName; // Ensure category name is correctly accessed
      const amount = transaction.amount;
      if (categoryExpensesMap[categoryName]) {
        categoryExpensesMap[categoryName] += amount;
      } else {
        categoryExpensesMap[categoryName] = amount;
      }
    });

    return categoryExpensesMap;
  };

  // Rendering Pie chart
  const renderPieChart = () => {
    const categoryExpensesMap = calculateCategoryExpenses();
    const labels = Object.keys(categoryExpensesMap);
    const data = Object.values(categoryExpensesMap);
    console.log('labels: ', labels);
    console.log('data: ', data);

    const pieChartData = {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    return (
      <Pie
        data={pieChartData}
        options={{
          title: {
            display: true,
            text: 'Total Expenses by Category',
            fontSize: 20,
          },
          plugins: {
            legend: {
              display: true,
              position: 'bottom',
              textAlign: 'right',
              labels: {
                boxWidth: 20, // Adjust the size of the legend color boxes here
              },
            },
          },
        }}
      />
    );
  };

  // Handle goal change
  const handleGoalChange = event => {
    setSelectedGoal(event.target.value);
  };

  return (
    // <div className="row mt-2">
    <>
      {/* <div className="col"> */}
      <div className="card">
        <div className="card-header ">
          <h4 className="card-title">Goal Category Expenses</h4>
          <p className="card-category mb-n2">Select goal</p>
        </div>
        <div className="card-body">
          <Select
            value={selectedGoal}
            onChange={handleGoalChange}
            displayEmpty
            fullWidth
            sx={{ width: '150px', fontSize: '16px', height: '30px' }}
          >
            <MenuItem value="">Select a Goal</MenuItem>
            {goals.map(goal => (
              <MenuItem key={goal._id} value={goal._id}>
                {goal.goalName}
              </MenuItem>
            ))}
          </Select>
          <div style={{ width: 300, margin: '0px auto' }}>
            {/* {goalTransactions.length > 0 && renderPieChart()} */}
            {/* {error ? (
              <p>{error}</p>
            ) : (
              goalTransactions.length > 0 && renderPieChart()
            )} */}
            {goalTransactions.length > 0 ? (
              renderPieChart()
            ) : (
              <p>No expenses found for this goal.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
