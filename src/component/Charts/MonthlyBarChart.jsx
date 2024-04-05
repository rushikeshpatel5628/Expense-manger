import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const MonthlyBarChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Income',
        backgroundColor: '#ff7c43',
        borderColor: 'rgba(0,0,0,1)',
        data: [],
        barThickness: 20,
      },
      {
        label: 'Expense',
        backgroundColor: '#f95d6a',
        data: [],
        barThickness: 20,
      },
    ],
  });

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/transactions/transactions/${userId}`
        );
        const data = response.data.data;
        console.log('data....', data);

        // Initialize variables for income and expense
        const incomeByMonth = {};
        const expenseByMonth = {};

        // Group transactions by month and type
        data.forEach(transaction => {
          const expDate = new Date(transaction.expDateTime);
          //   const monthYear = `${expDate.getFullYear()}-${
          //     expDate.getMonth() + 1
          //   }`;
          const monthYear = `${expDate.getFullYear()}-${expDate.toLocaleString(
            'default',
            { month: 'long' }
          )}`;

          const transactionType = transaction.transactionType.toLowerCase();
          if (transactionType === 'income') {
            if (incomeByMonth[monthYear]) {
              incomeByMonth[monthYear] += transaction.amount;
            } else {
              incomeByMonth[monthYear] = transaction.amount;
            }
          } else if (transactionType === 'expense') {
            if (expenseByMonth[monthYear]) {
              expenseByMonth[monthYear] += transaction.amount;
            } else {
              expenseByMonth[monthYear] = transaction.amount;
            }
          }
        });

        // Extract month-year and income/expense data for plotting
        // const months = Object.keys(incomeByMonth).sort();
        const months = Object.keys(incomeByMonth)
        .sort((a, b) => {
          const monthA = new Date(a.split('-')[1] + ' 1, 2000');
          const monthB = new Date(b.split('-')[1] + ' 1, 2000');
          return monthA - monthB;
        })
        .map(month => month.split('-')[1]);
        const incomeData = Object.values(incomeByMonth);
        const expenseData = Object.values(expenseByMonth);

        console.log('months....', months);
        console.log('income....', incomeData);
        console.log('expense....', expenseData);

        // Update chart data
        setChartData({
          ...chartData,
          labels: months,
          datasets: [
            {
              ...chartData.datasets[0],
              data: incomeData,
            },
            {
              ...chartData.datasets[1],
              data: expenseData,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Ensure this effect runs only once by passing an empty dependency array

  return (
    <div>
      {/* <h2>Monthly Expenses Comparison</h2> */}
      <div style={{ width: '100%', height: '300px' }}>
        <Bar
          data={chartData}
          options={{
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    callback: function (value) {
                      return `$${value}`;
                    },
                  },
                },
              ],
            },
            tooltips: {
              callbacks: {
                label: function (tooltipItem, data) {
                  return `$${tooltipItem.yLabel}`;
                },
              },
            },
            plugins: {
              // Adjust the width of the bars
              datalabels: {
                anchor: 'end',
                align: 'end',
              },
            },
            layout: {
              padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
              },
            },
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      </div>
    </div>
  );
};

export default MonthlyBarChart;
