// import React, { useEffect, useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import axios from 'axios';
// import { format } from 'date-fns';
// import { Chart as ChartJS, registerables as registerChartJSDateAdapter } from 'chart.js/auto';

// import { Chart as ChartJS, registerables as dateFnsPlugin } from 'chart.js';
// import { TimeSeriesScale, timeSeries } from 'chartjs-adapter-date-fns';

// // Register the date adapter and the required plugins
// ChartJS.register(...registerChartJSDateAdapter, dateFns);

// export const ExpenseLineChart = () => {
//   const [data, setData] = useState([]);

//   const fetchData = async () => {
//     const id = localStorage.getItem('userId');
//     try {
//       const response = await axios.get(
//         'http://localhost:5000/transactions/transactions/' + id
//       );
//       if (response.data.flag === 1) {
//         setData(response.data.data);
//       } else {
//         console.error('Error fetching data:', response.data.message);
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   useEffect(() => {
//     console.log(data);
//   }, [data]);

//   // Group expenses by date and calculate total expenses for each date
//   const expensesByDate = {};
//   data.forEach(transaction => {
//     const date = new Date(transaction.expDateTime).toLocaleDateString();
//     if (expensesByDate[date]) {
//       expensesByDate[date] += transaction.amount;
//     } else {
//       expensesByDate[date] = transaction.amount;
//     }
//   });

//   // Prepare data for chart
//   const chartLabels = Object.keys(expensesByDate);
//   const chartData = {
//     labels: chartLabels,
//     datasets: [
//       {
//         label: 'Total Expenses',
//         fill: false,
//         lineTension: 0.1,
//         backgroundColor: 'rgba(75,192,192,0.4)',
//         borderColor: 'rgba(75,192,192,1)',
//         borderWidth: 2,
//         data: Object.values(expensesByDate),
//       },
//     ],
//   };

//   return (
//     <div style={{ width: '600px', margin: '0 auto' }}>
//       <h2>Total Expenses Over Time</h2>
//       <Line
//         data={chartData}
//         options={{
//           scales: {
//             x: {
//               type: 'time',
//               time: {
//                 unit: 'day',
//                 displayFormats: {
//                   day: 'MMM D',
//                 },
//               },
//               title: {
//                 display: true,
//                 text: 'Date',
//               },
//             },
//             y: {
//               title: {
//                 display: true,
//                 text: 'Total Expenses',
//               },
//               beginAtZero: true,
//             },
//           },
//           plugins: {
//             legend: {
//               display: false,
//             },
//           },
//         }}
//       />
//     </div>
//   );
// };
