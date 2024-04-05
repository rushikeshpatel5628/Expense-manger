import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';


export const DonutChartPaymentType = () => {
  const [data, setdata] = useState([]);
  const fetchTransactions = async () => {
    const userId = localStorage.getItem('userId');

    try {
      const response = await axios.get(
        `http://localhost:5000/transactions/transactions/${userId}`
      );
      console.log('data....', response.data.data);
      setdata(response.data.data);
      console.log('data....', data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const paymentTypes = {};
  data.forEach(transaction => {
    const paymentMethod = transaction.paymentMethod;
    paymentTypes[paymentMethod] = (paymentTypes[paymentMethod] || 0) + 1;
  });

  const chartData = {
    labels: Object.keys(paymentTypes),
    datasets: [{
      data: Object.values(paymentTypes),
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)'
      ],
      borderWidth: 1
    }]
  };

  const chartOptions = {
    title: {
      display: true,
      text: 'Payment Types',
      fontSize: 20
    },
    legend: {
      display: true,
      position: 'bottom'
    }
  };
  

  return (
    <div style={{width: '100%', height: '300px', margin: '0px auto'}}>
      <Doughnut data={chartData} options={chartOptions} />
    </div>
  );;
};
