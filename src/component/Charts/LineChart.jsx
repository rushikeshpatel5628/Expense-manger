import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import 'chartjs-adapter-moment';

const LineChart = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const userId = localStorage.getItem('userId');

      try {
        const response = await axios.get(
          `http://localhost:5000/transactions/transactions/${userId}`
        );
        console.log('data....', response.data.data);
        setTransactions(response.data.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);
  console.log(transactions);

  const prepareChartData = () => {
    const incomeData = [];
    const expenseData = [];
    const labels = [];

    transactions.forEach(transaction => {
      labels.push(transaction.expDateTime);
      if (transaction.transactionType === 'income') {
        incomeData.push(transaction.amount);
        expenseData.push(null); // Push null for expenses to align with the correct labels
      } else {
        incomeData.push(null); // Push null for income to align with the correct labels
        expenseData.push(transaction.amount);
      }
    });

    return {
      labels,
      incomeData,
      expenseData,
    };
  };

  const prepareChartData1 = () => {
    // Sort transactions by date
    const sortedTransactions = transactions.sort((a, b) => new Date(a.expDateTime) - new Date(b.expDateTime));
  
    const incomeData = [];
    const expenseData = [];
    const labels = [];
  
    sortedTransactions.forEach(transaction => {
      labels.push(transaction.expDateTime);
      if (transaction.transactionType === 'income') {
        incomeData.push(transaction.amount);
        expenseData.push(null);
      } else {
        incomeData.push(null);
        expenseData.push(transaction.amount);
      }
    });
  
    return {
      labels,
      incomeData,
      expenseData,
    };
  };
  

  console.log('labels', prepareChartData1().labels);
  console.log('income data', prepareChartData1().incomeData);
  console.log('expense data', prepareChartData1().expenseData);

  const chartData = {
    labels: prepareChartData1().labels,
    datasets: [
      {
        label: 'Income',
        data: prepareChartData1().incomeData,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(0, 128, 0, 0.1)',
      },
      {
        label: 'Expenses',
        data: prepareChartData1().expenseData,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day', // Adjust based on your data granularity
          tooltipFormat: 'DD MMM, YYYY', // Format for tooltip
          displayFormats: {
            day: 'DD MMM, YYYY', // Format for x-axis labels
          },
        },
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Amount',
        },
      },
    },
    plugins: {
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
  };

  return (
    <div>
      {/* <h2>Income and Expense Trends</h2> */}
      <div style={{ width: 'auto', height: '300px', margin: '0px auto' }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default LineChart;
