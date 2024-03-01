import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

export const Sidebar = () => {
  const userLinks = [
    {
      name: 'Dashboard',
      link: '/user/dashboard',
      icon: 'nc-icon nc-chart-pie-35',
    },
    {
      name: 'Expense',
      link: '/user/expenses',
      // icon: "nc-money-coins"
      // icon: "nc-money-coins"
      icon: 'nc-icon nc-money-coins',
    },
    {
      name: 'Category',
      link: '/user/category',
      icon: 'nc-icon nc-layers-3',
    },
    {
      name: 'Expense Form',
      link: '/expense/form'
    },
  ];

  return (
    <div className="sidebar sidebar-background" data-image="../assets/img/sidebar-6.jpg" style={{ backgroundImage: 'url(../assets/img/sidebar-6.jpg)' }} data-color="black">
      {/*
  Tip 1: You can change the color of the sidebar using: data-color="purple | blue | green | orange | red"

  Tip 2: you can also add an image using data-image tag
    */}
      <div className="sidebar-wrapper">
        <div className="logo">
          <Link
            to="/user/dashboard"
            className="simple-text"
            style={{ textDecoration: 'none' }}
          >
            Expense Tracker
          </Link>
        </div>
        <ul className="nav">
          {userLinks.map(user => {
            return (
              <li className="nav-item active">
                <NavLink className="nav-link" to={user.link} activeClassName="active-link">
                  <i className={user.icon} />
                  <p>{user.name}</p>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <div
        // className="sidebar-background"
        
      />
    </div>
  );
};
