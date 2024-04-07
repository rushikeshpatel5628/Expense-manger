import React, { useState, useEffect } from 'react';
import './AddExpenseForm.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AddExpense = () => {
  const [cat, setcat] = useState([]);
  const [category, setcategory] = useState([]);
  // const [subcat, setsubcat] = useState([]);
  const [payee, setpayee] = useState([]);
  const [goal, setgoal] = useState([]);

  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // const loadCategories = async () => {
  //   try {
  //     const res = await axios.get('http://localhost:5000/categories/category');
  //     setcat(res.data.data);
  //     console.log(res.data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const loadCategories = async () => {
    try {
      const res = await axios.get('http://localhost:5000/usercategory/category/user/'+userId);
      setcat(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // const loadAllCategories = async()=>{
  //   try{
  //     const res = await axios.get('http://localhost:5000/shared-category/categories?userId='+userId);
  //     setcategory(res.data.data);
  //     console.log("categories....", res.data.data);
  //   }catch(error){
  //     console.log(error);
  //   }
  // }

  // const loadSubCategories = async () => {
  //   try {
  //     const res = await axios.get(
  //       'http://localhost:5000/categories/subcategory'
  //     );
  //     setsubcat(res.data.data);
  //     console.log(res.data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const loadPayee = async () => {
    try {
      const res = await axios.get('http://localhost:5000/payees/payees/'+userId);
      setpayee(res.data.data);
      console.log("payees", res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadGoal = async () => {
    try {
      const res = await axios.get('http://localhost:5000/goals/goals/'+userId);
      setgoal(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadCategories();
    // loadSubCategories();
    loadPayee();
    loadGoal();
    // loadAllCategories();
  }, []);

  const submitHandler = async data => {
    console.log('data....', data);

    // Retrieve userId from local storage
    const userId = localStorage.getItem('userId');
    // Include userId in the data object
    data.user = userId;

    try {
      const res = await axios.post(
        'http://localhost:5000/transactions/transaction',
        data
      );
      if (res.status === 201) {
        // alert('Data posted');
        toast.info('Expense Added', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
          // transition: Slide,
        });
        setTimeout(() => {
          navigate('/user/expenses');
        }, 2000);
      } else {
        alert('Data not posted');
      }
    } catch (error) {
      // console.log(error)
      // console.error('Error submitting form:', error);
      console.log('Error submitting form:', error.message);

      if (error.response) {
        console.error('Response data:', error.response.data);
      }
    }
  };

  return (
    <>
      <div className="container-fluid mx-auto">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
        <div className="row mx-auto">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Add Expense</h4>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit(submitHandler)}>
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label
                          htmlFor="title"
                          className="label "
                          style={{ fontSize: '15px' }}
                        >
                          Expense Title{' '}
                        </label>
                        <input
                          type="text"
                          className="form-control w-25"
                          {...register('title')}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label
                          htmlFor="goal"
                          className="label "
                          style={{ fontSize: '15px' }}
                        >
                          Goal{' '}
                        </label>
                        <div className="select w-50">
                          <select
                            name=""
                            className="form-control"
                            {...register('goal')}
                          >
                            <option value="">Goal</option>
                            {goal.map(item => {
                              return (
                                <option value={item._id}>
                                  {item.goalName}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label
                          htmlFor="payee"
                          className="label "
                          style={{ fontSize: '15px' }}
                        >
                          Payee{' '}
                        </label>
                        <div className="select w-50">
                          <select
                            name=""
                            className="form-control"
                            {...register('payee')}
                          >
                            <option selected style={{ color: '#656262' }}>
                              Payee
                            </option>
                            {payee.map(cat => {
                              return (
                                <option value={cat._id}>{cat.payeeName}</option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                    </div>
                    {/* Second column */}
                    <div className="col-md-5 px-1 mx-5">
                      <div className="form-group">
                        <label style={{ fontSize: '15px' }} className="label">
                          Amount
                        </label>
                        <input
                          type="Number"
                          className="form-control"
                          placeholder="Amount"
                          {...register('amount')}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label
                          htmlFor="Date"
                          className="label "
                          style={{ fontSize: '15px' }}
                        >
                          Date of Expense{' '}
                        </label>
                        <input
                          type="date"
                          className="ml-3"
                          {...register('expDateTime')}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label
                          htmlFor="category"
                          className="label "
                          style={{ fontSize: '15px' }}
                        >
                          Category{' '}
                        </label>
                        <div className="select w-50">
                          <select
                            name=""
                            className="form-control"
                            {...register('category')}
                          >
                            <option selected>Category</option>
                            {cat.map(cat => {
                              return (
                                <option value={cat._id}>
                                  {cat.categoryName}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                    </div>
                    {/* <div className="col">
                      <div className="form-group">
                        <label
                          htmlFor="Date"
                          className="label "
                          style={{ fontSize: '15px' }}
                        >
                          Subcategory{' '}
                        </label>
                        <div className="select w-50">
                          <select
                            name=""
                            className="form-control"
                            {...register('subcategory')}
                          >
                            <option selected>subategory</option>
                            {subcat.map(cat => {
                              return (
                                <option value={cat._id}>
                                  {cat.SubCategoryName}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                    </div> */}
                  </div>

                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label
                          htmlFor="Date"
                          className="label "
                          style={{ fontSize: '15px' }}
                        >
                          Payment Method{' '}
                        </label>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="gridRadios"
                            id="gridRadios1"
                            value="credit card"
                            {...register('paymentMethod')}
                          />
                          <label
                            class="form-check-label"
                            style={{ paddingRight: '10px' }}
                            for="gridRadios1"
                          >
                            Credit Card
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="gridRadios"
                            id="gridRadios1"
                            value="upi"
                            {...register('paymentMethod')}
                          />
                          <label class="form-check-label" for="gridRadios1">
                            UPI
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="gridRadios"
                            id="gridRadios1"
                            value="cash"
                            {...register('paymentMethod')}
                          />
                          <label class="form-check-label" for="gridRadios1">
                            Cash
                          </label>
                        </div>

                        {/* </div> */}
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group">
                        <label
                          htmlFor="status"
                          className="label "
                          style={{ fontSize: '15px' }}
                        >
                          Status{' '}
                        </label>
                        <div className="select w-50">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="gridRadios"
                              id="gridRadios1"
                              value="clear"
                              {...register('status')}
                            />
                            <label class="form-check-label" for="gridRadios1">
                              Clear
                            </label>
                          </div>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="gridRadios"
                              id="gridRadios1"
                              value="unclear"
                              {...register('status')}
                            />
                            <label class="form-check-label" for="gridRadios1">
                              Unclear
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label
                          htmlFor="transaction"
                          className="label "
                          style={{ fontSize: '15px' }}
                        >
                          Transaction Type{' '}
                        </label>
                        <div className="select w-50">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="gridRadios"
                              id="gridRadios1"
                              value="income"
                              {...register('transactionType')}
                            />
                            <label class="form-check-label" for="gridRadios1">
                              Income
                            </label>
                          </div>
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="gridRadios"
                              id="gridRadios1"
                              value="expense"
                              {...register('transactionType')}
                            />
                            <label class="form-check-label" for="gridRadios1">
                              Expense
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label
                          htmlFor="desc"
                          className="label"
                          style={{ fontSize: '15px' }}
                        >
                          Description
                        </label>
                        <textarea
                          name="desc"
                          id=""
                          cols="30"
                          rows="2"
                          className="form-control"
                          {...register('description')}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <input
                        type="submit"
                        className="btn btn-info btn-fill btn-center"
                        value="Submit"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
