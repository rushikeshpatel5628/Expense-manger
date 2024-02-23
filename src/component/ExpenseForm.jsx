// // import React, { useState } from 'react';
// // import { useForm } from 'react-hook-form';

// // export const ExpenseForm = () => {
// //   const [payee, setPayee] = useState('');
// //   const [amount, setAmount] = useState('');
// //   const [expDateTime, setexpDateTime] = useState('');
// //   const [category, setCategory] = useState('');
// //   const [subcategory, setSubcategory] = useState('');
// //   const [paymentMethod, setPaymentMethod] = useState('');
// //   const [status, setStatus] = useState('');
// //   const [description, setDescription] = useState('');
// //   const [transaction, setTransaction] = useState('');

// //   const {
// //     register,
// //     handleSubmit,
// //     formState: { errors },
// //     reset,
// //   } = useForm();

// //   const submitHandler = async (data) => {
// //     console.log(data);

//     // try {
//     //   const res = await axios.post(
//     //     "http://localhost:5000/transactions/transaction",
//     //     data
//     //   );
//     //   console.log(res.data);
//     //   reset();
//     // } catch (error) {
//     //   console.log("Error....", error);
//     // }
// //   };

// //   return (
// //     <div className="container-fluid">
// //       <form onSubmit={handleSubmit(submitHandler)}>
// //         <div className="form-group">
// //           <label htmlFor="payee">Payee</label>
// //           <input type="text" className="form-control" id="payee" {...register(payee)} value={payee} onChange={(e) => setPayee(e.target.value)} />
// //         </div>
// //         <div className="form-group">
// //           <label htmlFor="amount">Amount</label>
// //           <input type="number" className="form-control" id="amount" {...register(amount)} value={amount} onChange={(e) => setAmount(e.target.value)} />
// //         </div>
// //         <div className="form-group">
// //           <label htmlFor="date">Date</label>
// //           <input type="date" className="form-control" id="date" value={expDateTime} {...register(expDateTime)} onChange={(e) => setexpDateTime(e.target.value)} />
// //         </div>
// //         <div className="form-group">
// //           <label htmlFor="category">Category</label>
// //           <select className="form-control" id="category" value={category} {...register(category)} onChange={(e) => setCategory(e.target.value)}>
// //             {/* Options for category */}
// //             <option value="opt1">opt1</option>
// //             <option value="opt2">opt2</option>
// //           </select>
// //         </div>
// //         <div className="form-group">
// //           <label htmlFor="subCategory">Sub Category</label>
// //           <select className="form-control" id="subCategory" value={subcategory} {...register(subcategory)} onChange={(e) => setSubcategory(e.target.value)}>
// //             {/* Options for subcategory */}
// //             <option value="option 1">Opt 1</option>
// //             <option value="option 2">Opt 2</option>
// //           </select>
// //         </div>
// //         <div className="form-group">
// //           <label>Payment Method</label>
// //           <div className="form-check">
// //             <input type="radio" className="form-check-input" id="paymentMethod1" value="Credit card" checked={paymentMethod === 'Credit card'} {...register(paymentMethod)} onChange={() => setPaymentMethod('Credit card')} />
// //             <label className="form-check-label" htmlFor="paymentMethod1">Credit card</label>
// //           </div>
// //           <div className="form-check">
// //             <input type="radio" className="form-check-input" id="paymentMethod2" {...register(paymentMethod)} value="Cash" checked={paymentMethod === 'Cash'} onChange={() => setPaymentMethod('Cash')} />
// //             <label className="form-check-label" htmlFor="paymentMethod2">Cash</label>
// //           </div>
// //           <div className="form-check">
// //             <input type="radio" className="form-check-input" id="paymentMethod3" value="UPI" {...register(paymentMethod)} checked={paymentMethod === 'UPI'} onChange={() => setPaymentMethod('method3')} />
// //             <label className="form-check-label" htmlFor="paymentMethod3">UPI</label>
// //           </div>
// //         </div>
// //         <div className="form-group">
// //           <label>Status</label>
// //           <div className="form-check">
// //             <input type="radio" className="form-check-input" id="status1" value="clear" {...register(status)} checked={status === 'status1'} onChange={() => setStatus('clear')} />
// //             <label className="form-check-label" htmlFor="status1">Clear</label>
// //           </div>
// //           <div className="form-check">
// //             <input type="radio" className="form-check-input" id="status2" value="unclear" {...register(status)} checked={status === 'status2'} onChange={() => setStatus('unclear')} />
// //             <label className="form-check-label" htmlFor="status2">Unclear</label>
// //           </div>
// //         </div>
// //         <div className="form-group">
// //           <label htmlFor="description">Description</label>
// //           <input type="text" className="form-control" id="description" value={description} {...register(description)} onChange={(e) => setDescription(e.target.value)} />
// //         </div>
// //         <div className="form-group">
// //           <label>Transaction</label>
// //           <div className="form-check">
// //             <input type="radio" className="form-check-input" id="transaction1" value="income" {...register(transaction)} checked={transaction === 'income'} onChange={() => setTransaction('transaction1')} />
// //             <label className="form-check-label" htmlFor="transaction1">Income</label>
// //           </div>
// //           <div className="form-check">
// //             <input type="radio" className="form-check-input" id="transaction2" value="expense" {...register(transaction)} checked={transaction === 'expense'} onChange={() => setTransaction('transaction2')} />
// //             <label className="form-check-label" htmlFor="transaction2">Expense</label>
// //           </div>
// //         </div>
// //         <button type="submit" className="btn btn-primary">Submit</button>
// //       </form>
// //     </div>
// //   );
// // };

// import React, { useState } from 'react';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormLabel from '@mui/material/FormLabel'; // Removed duplicate import
// import { makeStyles } from '@mui/styles'; // Import makeStyles from @mui/material/styles

// const useStyles = makeStyles((theme) => ({
//   form: {
//     '& .MuiTextField-root': {
//       marginBottom: theme.spacing(2),
//     },
//     '& .MuiFormControl-root': {
//       marginBottom: theme.spacing(2),
//     },
//     '& .MuiButton-root': {
//       marginTop: theme.spacing(2),
//     },
//   },
// }));

// export const ExpenseForm = () => {
//   const [payee, setPayee] = useState('');
//   const [amount, setAmount] = useState('');
//   const [date, setDate] = useState('');
//   const [category, setCategory] = useState('');
//   const [subCategory, setSubCategory] = useState('');
//   const [paymentMethod, setPaymentMethod] = useState('');
//   const [status, setStatus] = useState('');
//   const [description, setDescription] = useState('');
//   const [transaction, setTransaction] = useState('');
//   const classes = useStyles();

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission logic here
//   };

//   return (
//     <form onSubmit={handleFormSubmit}>
//       <TextField
//         label="Payee"
//         value={payee}
//         onChange={(e) => setPayee(e.target.value)}
//         fullWidth
//       />
//       <TextField
//         label="Amount"
//         type="number"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//         fullWidth
//       />
//       <TextField
//         label="Date"
//         type="date"
//         value={date}
//         onChange={(e) => setDate(e.target.value)}
//         fullWidth
//       />
//       <FormControl fullWidth>
//         <InputLabel>Category</InputLabel>
//         <Select
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//         >
//           {/* MenuItems for category */}
//         </Select>
//       </FormControl>
//       <FormControl fullWidth>
//         <InputLabel>Sub Category</InputLabel>
//         <Select
//           value={subCategory}
//           onChange={(e) => setSubCategory(e.target.value)}
//         >
//           {/* MenuItems for subcategory */}
//         </Select>
//       </FormControl>
//       <FormControl component="fieldset" fullWidth>
//         <FormLabel component="legend">Payment Method</FormLabel>
//         <RadioGroup
//           value={paymentMethod}
//           onChange={(e) => setPaymentMethod(e.target.value)}
//         >
//           <FormControlLabel value="method1" control={<Radio />} label="Method 1" />
//           <FormControlLabel value="method2" control={<Radio />} label="Method 2" />
//           <FormControlLabel value="method3" control={<Radio />} label="Method 3" />
//         </RadioGroup>
//       </FormControl>
//       <FormControl component="fieldset" fullWidth>
//         <FormLabel component="legend">Status</FormLabel>
//         <RadioGroup
//           value={status}
//           onChange={(e) => setStatus(e.target.value)}
//         >
//           <FormControlLabel value="status1" control={<Radio />} label="Status 1" />
//           <FormControlLabel value="status2" control={<Radio />} label="Status 2" />
//           <FormControlLabel value="status3" control={<Radio />} label="Status 3" />
//         </RadioGroup>
//       </FormControl>
//       <TextField
//         label="Description"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         fullWidth
//       />
//       <FormControl component="fieldset" fullWidth>
//         <FormLabel component="legend">Transaction</FormLabel>
//         <RadioGroup
//           value={transaction}
//           onChange={(e) => setTransaction(e.target.value)}
//         >
//           <FormControlLabel value="transaction1" control={<Radio />} label="Transaction 1" />
//           <FormControlLabel value="transaction2" control={<Radio />} label="Transaction 2" />
//         </RadioGroup>
//       </FormControl>
//       <Button type="submit" variant="contained" color="primary">
//         Submit
//       </Button>
//     </form>
//   );
// };

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

export const ExpenseForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [data, setdata] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const submitHandler = async data => {
    console.log('data...', data);
  };

  const loadData = async () => {
    const response = await axios.get(
      'http://localhost:5000/transactions/transaction'
    );
    console.log(response.data);
  };

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await axios.get(
    //       'http://localhost:5000/transactions/transaction'
    //     );
    //     if (response.data.flag === 1) {
    //       setdata(response.data.data);
    //     } else {
    //       console.error('Error fetching data:', response.data.message);
    //     }
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // };
    loadData();
    // fetchData();
  }, []);

  useEffect(() => {
    // Extract unique categories and subcategories
    const uniqueCategories = Array.from(new Set(data.map(transaction => transaction.category.categoryName)));
    const uniqueSubcategories = Array.from(new Set(data.map(transaction => transaction.subcategory.SubCategoryName)));

    setCategories(uniqueCategories);
    setSubcategories(uniqueSubcategories);
  }, [data]);


  return (
    <div className="container">
      <form onSubmit={handleSubmit(submitHandler)}>
        <div>
          <label htmlFor="name">Payee</label>
          <input type="text" {...register('payee')}></input>
        </div>
        <div>
          <label htmlFor="Amount">Amount</label>
          <input type="number" {...register('amount')}></input>
        </div>
        <div>
          <label htmlFor="date">Date</label>
          <input type="date" {...register('expDateTime')}></input>
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <div>
            <select name="" {...register('category')} id="">
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="subcategory">Sub Category</label>
          <div>
          <select {...register('subcategory')}>
            {subcategories.map(subcategory => (
              <option key={subcategory} value={subcategory}>{subcategory}</option>
            ))}
          </select>
          </div>
        </div>
        <div>
          <label htmlFor="paymentmethod">Payment Method</label>
          <div>
            Credit card{' '}
            <input
              type="checkbox"
              value="credit card"
              {...register('paymentMethod')}
              name="payment"
            ></input>
            Cash{' '}
            <input
              type="checkbox"
              value="cash"
              {...register('paymentMethod')}
              name="payment"
            ></input>
            UPI{' '}
            <input
              type="checkbox"
              value="upi"
              {...register('paymentMethod')}
              name="payment"
            ></input>
          </div>
        </div>
        <div>
          <label htmlFor="status">Status</label>
          <div>
            Clear{' '}
            <input
              type="checkbox"
              value="clear"
              {...register('status')}
              name="status"
            ></input>
            Unclear{' '}
            <input
              type="checkbox"
              value="unclear"
              {...register('status')}
              name="status"
            ></input>
          </div>
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id=""
            {...register('description')}
            cols="30"
            rows="5"
          ></textarea>
        </div>
        <div>
          <label htmlFor="status">Transaction Type</label>
          <div>
            Income{' '}
            <input
              type="checkbox"
              value="income"
              {...register('transactionType')}
              name="transaction"
            ></input>
            Expense{' '}
            <input
              type="checkbox"
              value="expense"
              {...register('transactionType')}
              name="transaction"
            ></input>
          </div>
        </div>
        <div>
          <input type="submit" value="Submit" reset></input>
        </div>
      </form>
    </div>
  );
};
