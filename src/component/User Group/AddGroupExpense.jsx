import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

export const AddGroupExpense = () => {
  const [category, setcategory] = useState([]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

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

  const groupid = useParams().groupid;
  const submitHandler = async data => {
    const userId = localStorage.getItem('userId');
    data.paidBy = userId;
    data.group = groupid;
    console.log('data....', data);
    try {
      const res = await axios.post(
        'http://localhost:5000/groupexp/addexpense',
        data
      );
      if (res.status === 201) {
        // alert('Data posted');
        toast.success('Expense added', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        setTimeout(() => {
          navigate('/group/expenses/' + groupid);
        }, 2000);
      } else {
        alert('Data not posted');
      }
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
        theme="light"
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
