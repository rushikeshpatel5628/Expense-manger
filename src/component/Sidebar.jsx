import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
export const Sidebar = ({ onLinkSelect }) => {
  const [selectedLink, setSelectedLink] = useState('');

  const userLinks = [
    {
      name: 'Dashboard',
      link: '/user/dashboard',
      icon: 'nc-icon nc-chart-pie-35',
    },
    {
      name: 'Expense',
      link: '/user/expenses',
      icon: 'nc-icon nc-money-coins',
    },
    {
      name: 'Category',
      link: '/user/category',
      icon: 'nc-icon nc-layers-3',
    },
    {
      name: 'Add Expense',
      link: '/expense/form',
      icon: 'nc-icon nc-simple-add',
    },
    {
      name: 'Goal',
      link: '/user/goal',
    },
    {
      name: 'Profile',
      link: '/user/profile',
    },
    {
      name: 'Charts',
      link: 'user/charts',
    },
    {
      name: 'Charts 2',
      link: 'user/charts2',
    },
    {
      name: 'Charts 3',
      link: 'user/charts3',
    },
    {
      name: 'Groups',
      link: 'user/groups',
    },
    {
      name: 'Groups 2',
      link: 'user/groups2',
    },
    {
      name: 'Payees',
      link: 'user/payee',
    },
  ];

  const handleLinkClick = name => {
    setSelectedLink(name);
    onLinkSelect(name);
  };

  return (
    <div
      className="sidebar sidebar-background"
      data-image="../assets/img/sidebar-6.jpg"
      style={{ backgroundImage: 'url(../assets/img/sidebar-6.jpg)' }}
      data-color="purple"
    >
      {/*
  Tip 1: You can change the color of the sidebar using: data-color="purple | blue | green | orange | red"

  Tip 2: you can also add an image using data-image tag
    */}
      <div className="sidebar-wrapper" style={{ overflowY: 'auto' }}>
        <div className="logo">
          <Link
            // to="/user/dashboard"
            className="simple-text"
            style={{ textDecoration: 'none' }}
          >
            Expense Tracker
          </Link>
        </div>
        <ul className="nav">
          {userLinks.map(user => {
            return (
              <li className="nav-item active" key={user.name}>
                <NavLink
                  className="nav-link"
                  to={user.link}
                  activeClassName="active-link"
                  onClick={() => handleLinkClick(user.name)}
                >
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
