import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Charts } from './Charts/Charts';
import { PieChart } from './Charts/PieChart';

export const UserDashBoard = () => {
  const [income, setincome] = useState();
  const [expense, setExpense] = useState();
  const getIncome = async () => {
    const res = await axios.get('http://localhost:5000/transactions/income');
    setincome(res.data.data);
  };

  const getExpense = async () => {
    const res = await axios.get('http://localhost:5000/transactions/expense');
    setExpense(res.data.data);
  };

  useEffect(() => {
    getIncome();
    getExpense();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-3">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Income</h4>
            </div>
            <div className="card-body">{income}</div>
          </div>
        </div>

        <div className="col-sm-3">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Expense</h4>
            </div>
            <div className="card-body">{expense}</div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4">
          <div className="card ">
            <div className="card-header ">
              <h4 className="card-title">Category Expenses</h4>
              <p className="card-category">Last Campaign Performance</p>
            </div>
            <div className="card-body ">
              <PieChart />
              {/* <hr /> */}
            </div>
          </div>
        </div>
        <div className="col-md-7">
          <div className="card ">
            <div className="card-header ">
              <h4 className="card-title">Category</h4>
              <p className="card-category">24 Hours performance</p>
            </div>
            <div className="card-body ">
              <Charts />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-ride="carousel"
          >
            <ol className="carousel-indicators">
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to={0}
                className="active"
              />
              <li data-target="#carouselExampleIndicators" data-slide-to={1} />
              <li data-target="#carouselExampleIndicators" data-slide-to={2} />
            </ol>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img className="d-block w-100" src="..." alt="First slide" />
              </div>
              <div className="carousel-item">
                <img className="d-block w-100" src="..." alt="Second slide" />
              </div>
              <div className="carousel-item">
                <img className="d-block w-100" src="..." alt="Third slide" />
              </div>
            </div>
            <a
              className="carousel-control-prev"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
