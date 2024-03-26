import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import axios from 'axios';


export const Charts = () => {
  const [data, setdata] = useState([]);
  const [categories, setCategories] = useState({});

  const fetchData = async () => {
    const id = localStorage.getItem('userId');
    try {
      const response = await axios.get(
        'http://localhost:5000/transactions/transactions/' + id
      );
      // console.log(response.data.data)
      if (response.data.flag === 1) {
        setdata(response.data.data);
      } else {
        console.error('Error fetching data:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(data);
    const categoriesMap = {};
    data.forEach(transaction => {
      const categoryName = transaction.category.categoryName;
      if (categoriesMap[categoryName]) {
        categoriesMap[categoryName] += transaction.amount;
      } else {
        categoriesMap[categoryName] = transaction.amount;
      }
    });
    setCategories(categoriesMap);
  }, [data]);

  useEffect(() => {
    console.log('Categories:', categories);
  }, [categories]);

  const chartLabels = Object.keys(categories);
  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Total Expenses',
        backgroundColor: ['#ff6300', '#ff6361', '#58508d'],
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: Object.values(categories),
      },
    ],
  };

  return (
    <div style={{ width: '700px', height: '300px', margin: '0px auto' }}>
      <Bar
        data={chartData}
        options={{
          title: {
            display: true,
            text: 'Total Expenses by Category',
            fontSize: 20,
          },
          plugins: {
            legend: {
              display: false,
              position: 'bottom',
              textAlign: 'right',
              labels: {
                boxWidth: 20, // Adjust the size of the legend color boxes here
              },
            },
          },
        }}
      />
      <div>
        {/* <LineChart /> */}
      </div>
    </div>
  );
};
