import React, { useState, useEffect } from 'react';
import './AddExpenseForm.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AddExpense = () => {
  const [cat, setcat] = useState([]);
  const [subcat, setsubcat] = useState([]);
  const [payee, setpayee] = useState([]);
  const navigate = useNavigate();


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const loadCategories = async () => {
    try {
      const res = await axios.get('http://localhost:5000/categories/category');
      setcat(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadSubCategories = async () => {
    try {
      const res = await axios.get(
        'http://localhost:5000/categories/subcategory'
      );
      setsubcat(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadPayee = async() => {
    try {
      const res = await axios.get(
        'http://localhost:5000/payees/payee'
      );
      setpayee(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadCategories();
    loadSubCategories();
    loadPayee();
  }, []);

  const submitHandler = async data => {
    console.log('data....', data);

    try {
      const res = await axios.post(
        'http://localhost:5000/transactions/transaction',
        data
      );
      if (res.status === 201) {
        alert('Data posted');
      } else {
        alert('Data not posted');
      }
      navigate('/user/expenses')
    } catch (error) {
      // console.log(error)
        console.error('Error submitting form:', error);
        if (error.response) {
          console.error('Response data:', error.response.data);
        }
    }
  };

  return (
    <div className="container-fluid mx-auto">
      <div className="row mx-auto">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Add Expense</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit(submitHandler)}>
                <div className="row">
                  {/* First column */}
                  {/* <div className="col-md-5 pr-1">
                    <div className="form-group">
                      <label style={{ fontSize: '15px' }} className="label">
                        Payee
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Payee"
                        {...register('payee')}
                      />
                    </div>
                  </div> */}
                  <div className="col">
                    <div className="form-group">
                      <label
                        htmlFor="Date"
                        className="label "
                        style={{ fontSize: '15px' }}
                      >
                        Payee{' '}
                      </label>
                      <div className="select w-50">
                        <select
                          name=""
                          className="form-select form-select-sm"
                          {...register('payee')}
                        >
                          <option selected style={{ color: '#656262' }}>
                            Payee
                          </option>
                          {payee.map(cat => {
                            return (
                              <option value={cat._id}>
                                {cat.payeeName}
                              </option>
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
                        htmlFor="Date"
                        className="label "
                        style={{ fontSize: '15px' }}
                      >
                        Category{' '}
                      </label>
                      <div className="select w-50">
                        <select
                          name=""
                          className="form-select form-select-sm"
                          {...register('category')}
                        >
                          <option selected style={{ color: '#656262' }}>
                            Category
                          </option>
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
                  <div className="col">
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
                          className="form-select form-select-sm"
                          {...register('subcategory')}
                        >
                          <option selected style={{ color: '#656262' }}>
                            subategory
                          </option>
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
                        Payment Method{' '}
                      </label>
                      <div className="select w-50">
                        <select
                          name=""
                          className="form-select form-select-sm"
                          {...register('paymentMethod')}
                        >
                          <option selected style={{ color: '#656262' }}>
                            payment method
                          </option>
                          <option value="credit card">credit card</option>
                          <option value="upi">upi</option>
                          <option value="cash">cash</option>
                        </select>
                      </div>
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
                        <select
                          name=""
                          className="form-select form-select-sm"
                          {...register('status')}
                        >
                          <option selected style={{ color: '#656262' }}>
                            status
                          </option>
                          <option value="clear">Clear</option>
                          <option value="unclear">Unclear</option>
                        </select>
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
                        <select
                          name=""
                          className="form-select form-select-sm"
                          {...register('transactionType')}
                        >
                          <option selected style={{ color: '#656262' }}>
                            transaction
                          </option>
                          <option value="Income">Income</option>
                          <option value="Expense">Expense</option>
                        </select>
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
                      className="btn btn-info btn-fill btn-right"
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
  );
};
