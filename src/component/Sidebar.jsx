import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';

export const Sidebar = ({ onLinkSelect }) => {
  const [selectedLink, setSelectedLink] = useState('');
  const navigate = useNavigate();

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
    // {
    //   name: 'Category',
    //   link: '/user/category',
    //   icon: 'nc-icon nc-layers-3',
    // },
    {
      name: 'Add Expense',
      link: '/expense/form',
      icon: 'nc-icon nc-simple-add',
    },
    {
      name: 'Goal',
      link: '/user/goal',
      icon: 'nc-icon nc-bullet-list-67',
    },
    // {
    //   name: 'Charts',
    //   link: 'user/charts',
    // },
    // {
    //   name: 'Charts 2',
    //   link: 'user/charts2',
    // },
    // {
    //   name: 'Charts 3',
    //   link: 'user/charts3',
    // },
    {
      name: 'Groups',
      link: 'user/groups',
      icon: <PeopleAltOutlinedIcon />,
    },
    {
      name: 'Profile',
      link: '/user/profile',
      icon: 'nc-icon nc-circle-09',
    },
    // {
    //   name: 'Groups 2',
    //   link: 'user/groups2',
    // },
    // {
    //   name: 'Payees',
    //   link: 'user/payee',
    // },
    // {
    //   name: 'add transaction',
    //   link: 'user/transaction',
    // },
  ];

  const handleLinkClick = name => {
    setSelectedLink(name);
    onLinkSelect(name);
  };

  const handleLogout = () => {
    // navigate('/user/login');
    navigate('/');
    localStorage.removeItem('userId');
  };

  return (
    <div
      className="sidebar sidebar-background"
      data-image="../assets/img/sidebar-6.jpg"
      style={{
        backgroundImage: 'url(../assets/img/sidebar-6.jpg)',
      }}
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
                  {typeof user.icon === 'string' ? (
                    <i className={user.icon} />
                  ) : (
                    <span style={{ marginLeft: '5px', marginRight: '13px' }}>
                      {user.icon}
                    </span>
                  )}
                  <p>{user.name}</p>
                </NavLink>
              </li>
            );
          })}
          <li
            className="nav-item active active-pro"
            onClick={() => handleLogout()}
          >
            <a className="nav-link active" style={{ cursor: 'pointer' }}>
              <LogoutIcon />
              <span className="ml-2">Logout</span>{' '}
            </a>
          </li>
        </ul>
      </div>
      <div
      // className="sidebar-background"
      />
    </div>
  );
};
