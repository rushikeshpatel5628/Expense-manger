import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

export const UpdateGroupExpense = () => {
  const [category, setcategory] = useState([]);
  const navigate = useNavigate();
  const expenseId = useParams().expenseid;
  const groupId = useParams().groupid;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: async () => {
      const res = await axios.get(
        'http://localhost:5000/groupexp/groupexp/' + expenseId
      );
      return {
        title: res.data.data.title,
        amount: res.data.data.amount,
        expDate: res.data.data.expDate,
        category: res.data.data.category._id,
        paymentMethod: res.data.data.paymentMethod,
        description: res.data.data.description,

      };
    },
  });

  //load categories
  const loadCategories = async () => {
    try {
      const res = await axios.get('http://localhost:5000/categories/category');
      setcategory(res.data.data);
      console.log('categories....', res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = async data => {
    const userId = localStorage.getItem('userId');
    data.paidBy = userId;
    data.group = groupId;
    console.log('data....', data);
    try {
      const res = await axios.put(
        'http://localhost:5000/groupexp/update/' + expenseId,
        data
      );
      if (res.status === 201) {
        alert('Data posted');
      } else {
        alert('Data not posted');
      }
      navigate('/group/expenses/' + groupId);
    } catch (error) {
      console.log('error....', error);

      if (error.response) {
        console.error('Response data:', error.response.data);
      }
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

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
                  <div className="col">
                    <div className="form-group">
                      <label
                        htmlFor="title"
                        className="label"
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
                          {category.map(category => {
                            return (
                              <option value={category._id}>
                                {category.categoryName}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
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
                        {...register('expDate')}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label
                        htmlFor="paymentMethod"
                        className="label "
                        style={{ fontSize: '15px' }}
                      >
                        Payment Method{' '}
                      </label>
                      <div className="select w-50">
                        <select
                          name=""
                          className="form-control"
                          {...register('paymentMethod')}
                        >
                          <option selected>Payment Method</option>
                          <option value="cash">cash</option>
                          <option value="credit card">credit card</option>
                          <option value="UPI">UPI</option>
                          <option value="other">UPI</option>
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
  );
};
