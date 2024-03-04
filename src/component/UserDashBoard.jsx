import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const UserDashBoard = () => {
  const [income, setincome] = useState();
  const  [expense, setExpense] = useState();
  const getIncome = async () => {
    const res = await axios.get(
      'http://localhost:5000/transactions/income'
    );
    setincome(res.data.data);
  };

  const getExpense = async () => {
    const res = await axios.get(
      'http://localhost:5000/transactions/expense'
    );
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
              <h4 className="card-title">Email Statistics</h4>
              <p className="card-category">Last Campaign Performance</p>
            </div>
            <div className="card-body ">
              <div id="chartPreferences" className="ct-chart ct-perfect-fourth">
                <svg
                  xmlns="http://gionkunz.github.com/chartist-js/ct"
                  width="100%"
                  height="100%"
                  className="ct-chart-pie"
                  style={{ width: '100%', height: '100%' }}
                >
                  <g className="ct-series ct-series-c">
                    <path
                      d="M174,5A117.5,117.5,0,0,0,98.787,32.227L174,122.5Z"
                      className="ct-slice-pie"
                      ctValue={11}
                    />
                  </g>
                  <g className="ct-series ct-series-b">
                    <path
                      d="M99.103,31.965A117.5,117.5,0,0,0,152.386,237.995L174,122.5Z"
                      className="ct-slice-pie"
                      ctValue={36}
                    />
                  </g>
                  <g className="ct-series ct-series-a">
                    <path
                      d="M151.983,237.919A117.5,117.5,0,1,0,174,5L174,122.5Z"
                      className="ct-slice-pie"
                      ctValue={53}
                    />
                  </g>
                  <g>
                    <text
                      dx="232.48926542043094"
                      dy="128.02886340746272"
                      textAnchor="middle"
                      className="ct-label"
                    >
                      53%
                    </text>
                    <text
                      dx="117.09573928369292"
                      dy="137.11053087093524"
                      textAnchor="middle"
                      className="ct-label"
                    >
                      36%
                    </text>
                    <text
                      dx="154.0991471855891"
                      dy="67.22325482393927"
                      textAnchor="middle"
                      className="ct-label"
                    >
                      11%
                    </text>
                  </g>
                </svg>
              </div>
              <div className="legend">
                <i className="fa fa-circle text-info" /> Open
                <i className="fa fa-circle text-danger" /> Bounce
                <i className="fa fa-circle text-warning" /> Unsubscribe
              </div>
              <hr />
              <div className="stats">
                <i className="fa fa-clock-o" /> Campaign sent 2 days ago
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card ">
            <div className="card-header ">
              <h4 className="card-title">Users Behavior</h4>
              <p className="card-category">24 Hours performance</p>
            </div>
            <div className="card-body ">
              <div id="chartHours" className="ct-chart">
                <svg
                  xmlns="http://gionkunz.github.com/chartist-js/ct"
                  width="100%"
                  height="245px"
                  className="ct-chart-line"
                  style={{ width: '100%', height: 245 }}
                >
                  <g className="ct-grids">
                    <line
                      y1={210}
                      y2={210}
                      x1={50}
                      x2={743}
                      className="ct-grid ct-vertical"
                    />
                    <line
                      y1="185.625"
                      y2="185.625"
                      x1={50}
                      x2={743}
                      className="ct-grid ct-vertical"
                    />
                    <line
                      y1="161.25"
                      y2="161.25"
                      x1={50}
                      x2={743}
                      className="ct-grid ct-vertical"
                    />
                    <line
                      y1="136.875"
                      y2="136.875"
                      x1={50}
                      x2={743}
                      className="ct-grid ct-vertical"
                    />
                    <line
                      y1="112.5"
                      y2="112.5"
                      x1={50}
                      x2={743}
                      className="ct-grid ct-vertical"
                    />
                    <line
                      y1="88.125"
                      y2="88.125"
                      x1={50}
                      x2={743}
                      className="ct-grid ct-vertical"
                    />
                    <line
                      y1="63.75"
                      y2="63.75"
                      x1={50}
                      x2={743}
                      className="ct-grid ct-vertical"
                    />
                    <line
                      y1="39.375"
                      y2="39.375"
                      x1={50}
                      x2={743}
                      className="ct-grid ct-vertical"
                    />
                    <line
                      y1={15}
                      y2={15}
                      x1={50}
                      x2={743}
                      className="ct-grid ct-vertical"
                    />
                  </g>
                  <g>
                    <g className="ct-series ct-series-a">
                      <path
                        d="M50,210L50,140.044C78.875,140.044,107.75,116.156,136.625,116.156C165.5,116.156,194.375,90.563,223.25,90.563C252.125,90.563,281,90.075,309.875,90.075C338.75,90.075,367.625,74.963,396.5,74.963C425.375,74.963,454.25,67.163,483.125,67.163C512,67.163,540.875,39.863,569.75,39.863C598.625,39.863,627.5,40.594,656.375,40.594C685.25,40.594,714.125,26.7,743,26.7C771.875,26.7,800.75,17.925,829.625,17.925C858.5,17.925,887.375,3.787,916.25,3.787C945.125,3.787,974,-20.1,1002.875,-20.1L1002.875,210Z"
                        className="ct-area"
                        ctValues="[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]"
                      />
                    </g>
                    <g className="ct-series ct-series-b">
                      <path
                        d="M50,210L50,193.669C78.875,193.669,107.75,172.95,136.625,172.95C165.5,172.95,194.375,175.144,223.25,175.144C252.125,175.144,281,151.5,309.875,151.5C338.75,151.5,367.625,140.044,396.5,140.044C425.375,140.044,454.25,128.344,483.125,128.344C512,128.344,540.875,103.969,569.75,103.969C598.625,103.969,627.5,103.481,656.375,103.481C685.25,103.481,714.125,78.619,743,78.619C771.875,78.619,800.75,77.887,829.625,77.887C858.5,77.887,887.375,77.4,916.25,77.4C945.125,77.4,974,52.294,1002.875,52.294L1002.875,210Z"
                        className="ct-area"
                        ctValues="[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]"
                      />
                    </g>
                    <g className="ct-series ct-series-c">
                      <path
                        d="M50,210L50,204.394C78.875,204.394,107.75,182.456,136.625,182.456C165.5,182.456,194.375,193.669,223.25,193.669C252.125,193.669,281,183.675,309.875,183.675C338.75,183.675,367.625,163.688,396.5,163.688C425.375,163.688,454.25,151.744,483.125,151.744C512,151.744,540.875,135.169,569.75,135.169C598.625,135.169,627.5,134.925,656.375,134.925C685.25,134.925,714.125,102.994,743,102.994C771.875,102.994,800.75,110.063,829.625,110.063C858.5,110.063,887.375,110.063,916.25,110.063C945.125,110.063,974,85.931,1002.875,85.931L1002.875,210Z"
                        className="ct-area"
                        ctValues="[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object],[object Object]"
                      />
                    </g>
                  </g>
                  <g className="ct-labels">
                    <foreignObject
                      style={{ overflow: 'visible' }}
                      x={50}
                      y={215}
                      width="86.625"
                      height={20}
                    >
                      <span
                        className="ct-label ct-horizontal ct-end"
                        style={{ width: 87, height: 20 }}
                        xmlns="http://www.w3.org/1999/xhtml"
                      >
                        9:00AM
                      </span>
                    </foreignObject>
                    <foreignObject
                      style={{ overflow: 'visible' }}
                      x="136.625"
                      y={215}
                      width="86.625"
                      height={20}
                    >
                      <span
                        className="ct-label ct-horizontal ct-end"
                        style={{ width: 87, height: 20 }}
                        xmlns="http://www.w3.org/1999/xhtml"
                      >
                        12:00AM
                      </span>
                    </foreignObject>
                    <foreignObject
                      style={{ overflow: 'visible' }}
                      x="223.25"
                      y={215}
                      width="86.625"
                      height={20}
                    >
                      <span
                        className="ct-label ct-horizontal ct-end"
                        style={{ width: 87, height: 20 }}
                        xmlns="http://www.w3.org/1999/xhtml"
                      >
                        3:00PM
                      </span>
                    </foreignObject>
                    <foreignObject
                      style={{ overflow: 'visible' }}
                      x="309.875"
                      y={215}
                      width="86.625"
                      height={20}
                    >
                      <span
                        className="ct-label ct-horizontal ct-end"
                        style={{ width: 87, height: 20 }}
                        xmlns="http://www.w3.org/1999/xhtml"
                      >
                        6:00PM
                      </span>
                    </foreignObject>
                    <foreignObject
                      style={{ overflow: 'visible' }}
                      x="396.5"
                      y={215}
                      width="86.625"
                      height={20}
                    >
                      <span
                        className="ct-label ct-horizontal ct-end"
                        style={{ width: 87, height: 20 }}
                        xmlns="http://www.w3.org/1999/xhtml"
                      >
                        9:00PM
                      </span>
                    </foreignObject>
                    <foreignObject
                      style={{ overflow: 'visible' }}
                      x="483.125"
                      y={215}
                      width="86.625"
                      height={20}
                    >
                      <span
                        className="ct-label ct-horizontal ct-end"
                        style={{ width: 87, height: 20 }}
                        xmlns="http://www.w3.org/1999/xhtml"
                      >
                        12:00PM
                      </span>
                    </foreignObject>
                    <foreignObject
                      style={{ overflow: 'visible' }}
                      x="569.75"
                      y={215}
                      width="86.625"
                      height={20}
                    >
                      <span
                        className="ct-label ct-horizontal ct-end"
                        style={{ width: 87, height: 20 }}
                        xmlns="http://www.w3.org/1999/xhtml"
                      >
                        3:00AM
                      </span>
                    </foreignObject>
                    <foreignObject
                      style={{ overflow: 'visible' }}
                      x="656.375"
                      y={215}
                      width="86.625"
                      height={20}
                    >
                      <span
                        className="ct-label ct-horizontal ct-end"
                        style={{ width: 87, height: 20 }}
                        xmlns="http://www.w3.org/1999/xhtml"
                      >
                        6:00AM
                      </span>
                    </foreignObject>
                    <foreignObject
                      style={{ overflow: 'visible' }}
                      y="185.625"
                      x={10}
                      height="24.375"
                      width={30}
                    >
                      <span
                        className="ct-label ct-vertical ct-start"
                        style={{ height: 24, width: 30 }}
                        xmlns="http://www.w3.org/1999/xhtml"
                      >
                        0
                      </span>
                    </foreignObject>
                    <foreignObject
                      style={{ overflow: 'visible' }}
                      y="161.25"
                      x={10}
                      height="24.375"
                      width={30}
                    >
                      <span
                        className="ct-label ct-vertical ct-start"
                        style={{ height: 24, width: 30 }}
                        xmlns="http://www.w3.org/1999/xhtml"
                      >
                        100
                      </span>
                    </foreignObject>
                    <foreignObject
                      style={{ overflow: 'visible' }}
                      y="136.875"
                      x={10}
                      height="24.375"
                      width={30}
                    >
                      <span
                        className="ct-label ct-vertical ct-start"
                        style={{ height: 24, width: 30 }}
                        xmlns="http://www.w3.org/1999/xhtml"
                      >
                        200
                      </span>
                    </foreignObject>
                    <foreignObject
                      style={{ overflow: 'visible' }}
                      y="112.5"
                      x={10}
                      height="24.375"
                      width={30}
                    >
                      <span
                        className="ct-label ct-vertical ct-start"
                        style={{ height: 24, width: 30 }}
                        xmlns="http://www.w3.org/1999/xhtml"
                      >
                        300
                      </span>
                    </foreignObject>
                    <foreignObject
                      style={{ overflow: 'visible' }}
                      y="88.125"
                      x={10}
                      height="24.375"
                      width={30}
                    >
                      <span
                        className="ct-label ct-vertical ct-start"
                        style={{ height: 24, width: 30 }}
                        xmlns="http://www.w3.org/1999/xhtml"
                      >
                        400
                      </span>
                    </foreignObject>
                    <foreignObject
                      style={{ overflow: 'visible' }}
                      y="63.75"
                      x={10}
                      height="24.375"
                      width={30}
                    >
                      <span
                        className="ct-label ct-vertical ct-start"
                        style={{ height: 24, width: 30 }}
                        xmlns="http://www.w3.org/1999/xhtml"
                      >
                        500
                      </span>
                    </foreignObject>
                    <foreignObject
                      style={{ overflow: 'visible' }}
                      y="39.375"
                      x={10}
                      height="24.375"
                      width={30}
                    >
                      <span
                        className="ct-label ct-vertical ct-start"
                        style={{ height: 24, width: 30 }}
                        xmlns="http://www.w3.org/1999/xhtml"
                      >
                        600
                      </span>
                    </foreignObject>
                    <foreignObject
                      style={{ overflow: 'visible' }}
                      y={15}
                      x={10}
                      height="24.375"
                      width={30}
                    >
                      <span
                        className="ct-label ct-vertical ct-start"
                        style={{ height: 24, width: 30 }}
                        xmlns="http://www.w3.org/1999/xhtml"
                      >
                        700
                      </span>
                    </foreignObject>
                    <foreignObject
                      style={{ overflow: 'visible' }}
                      y={-15}
                      x={10}
                      height={30}
                      width={30}
                    >
                      <span
                        className="ct-label ct-vertical ct-start"
                        style={{ height: 30, width: 30 }}
                        xmlns="http://www.w3.org/1999/xhtml"
                      >
                        800
                      </span>
                    </foreignObject>
                  </g>
                </svg>
              </div>
            </div>
            <div className="card-footer ">
              <div className="legend">
                <i className="fa fa-circle text-info" /> Open
                <i className="fa fa-circle text-danger" /> Click
                <i className="fa fa-circle text-warning" /> Click Second Time
              </div>
              <hr />
              <div className="stats">
                <i className="fa fa-history" /> Updated 3 minutes ago
              </div>
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
