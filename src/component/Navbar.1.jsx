import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';

export const Navbar = ({ selectedLink }) => {
  const { setUser } = useContext(UserContext);

  const { user } = useContext(UserContext);
  console.log(user);
  return (
    <nav
      className="navbar navbar-expand-lg"
      // style={{
      //   overflow: 'hidden',
      //   position: 'sticky',
      //   top: '0',
      //   zIndex: '1000',
      //   backgroundColor: '#fff',
      // }}
      color-on-scroll={500}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/user/dashboard">
          {selectedLink}
        </Link>
        <button
          href=""
          className="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
          aria-controls="navigation-index"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-bar burger-lines" />
          <span className="navbar-toggler-bar burger-lines" />
          <span className="navbar-toggler-bar burger-lines" />
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navigation"
        >
          <ul className="nav navbar-nav mr-auto">
            <li className="nav-item">
              <Link href="#" className="nav-link" data-toggle="dropdown">
                {/* <i className="nc-icon nc-palette" /> */}
                <span className="d-lg-none">Dashboard</span>
              </Link>
            </li>
            {/* <li className="dropdown nav-item">
              <a
                href="#"
                className="dropdown-toggle nav-link"
                data-toggle="dropdown"
              >
                <i className="nc-icon nc-planet" />
                <span className="notification">5</span>
                <span className="d-lg-none">Notification</span>
              </a>
              <ul className="dropdown-menu">
                <a className="dropdown-item" href="#">
                  Notification 1
                </a>
                <a className="dropdown-item" href="#">
                  Notification 2
                </a>
                <a className="dropdown-item" href="#">
                  Notification 3
                </a>
                <a className="dropdown-item" href="#">
                  Notification 4
                </a>
                <a className="dropdown-item" href="#">
                  Another notification
                </a>
              </ul>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="nc-icon nc-zoom-split" />
                <span className="d-lg-block">&nbsp;Search</span>
              </a>
            </li> */}
          </ul>
          <ul className="navbar-nav ml-auto">
            {/* <li className="nav-item">
              <a className="nav-link" href="#pablo">
                <span className="no-icon">Account</span>
              </a>
            </li> */}
            <li className="nav-item dropdown">
              <a
                className="nav-link pr-0"
                href="#"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <div className="media align-items-center">
                  <span className="avatar avatar-sm">
                    <img
                      alt="Image placeholder"
                      // src={user.profile}
                      src=""
                      width={35}
                      height={35}
                      className="rounded-circle"
                    />
                  </span>
                  <div className="media-body  ml-2  d-none d-lg-block">
                    <span className="mb-0 text-sm  font-weight-bold">
                      {/* {user.firstName} {user.lastName} */}
                    </span>
                  </div>
                </div>
              </a>
              <div className="dropdown-menu dropdown-menu-right">
                {/* <div className="dropdown-header noti-title">
              <h6 className="text-overflow m-0">Welcome!</h6>
            </div> */}
                <Link to={'/user/profile'} className="dropdown-item">
                  <i className="ni ni-single-02" />
                  <span>My profile</span>
                </Link>
                <div className="dropdown-divider" />
                <a href="#!" className="dropdown-item">
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </a>
              </div>
            </li>

            {/* <li className="nav-item">
              <a className="nav-link" href="#pablo">
                <span className="no-icon">Log out</span>
              </a>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};
