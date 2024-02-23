import React from 'react';

export const Login = () => {
  return (
    <>
      <div className="container position-sticky z-index-sticky top-0">
        <div className="row">
          <div className="col-12">
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg blur border-radius-lg top-0 z-index-3 shadow position-absolute mt-4 py-2 start-0 end-0 mx-4">
              <div className="container-fluid">
                <a
                  className="navbar-brand font-weight-bolder ms-lg-0 ms-3 "
                  href="../pages/dashboard.html"
                >
                  Expense Tracker
                </a>
                <button
                  className="navbar-toggler shadow-none ms-2"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navigation"
                  aria-controls="navigation"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon mt-2">
                    <span className="navbar-toggler-bar bar1" />
                    <span className="navbar-toggler-bar bar2" />
                    <span className="navbar-toggler-bar bar3" />
                  </span>
                </button>
                <div className="collapse navbar-collapse" id="navigation">
                  <ul className="navbar-nav mx-auto">
                    <li className="nav-item">
                      <a
                        className="nav-link d-flex align-items-center me-2 active"
                        aria-current="page"
                        href="../pages/dashboard.html"
                      >
                        <i
                          className="fa fa-chart-pie opacity-6 text-dark me-1"
                          aria-hidden="true"
                        />
                        Dashboard
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link me-2" href="../pages/profile.html">
                        <i
                          className="fa fa-user opacity-6 text-dark me-1"
                          aria-hidden="true"
                        />
                        Profile
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link me-2" href="../pages/sign-up.html">
                        <i
                          className="fas fa-user-circle opacity-6 text-dark me-1"
                          aria-hidden="true"
                        />
                        Sign Up
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link me-2" href="../pages/sign-in.html">
                        <i
                          className="fas fa-key opacity-6 text-dark me-1"
                          aria-hidden="true"
                        />
                        Sign In
                      </a>
                    </li>
                  </ul>
                  <ul className="navbar-nav d-lg-block d-none">
                    <li className="nav-item">
                      <a
                        href="https://www.creative-tim.com/product/argon-dashboard"
                        className="btn btn-sm mb-0 me-1 btn-primary"
                      >
                        Free Download
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            {/* End Navbar */}
          </div>
        </div>
      </div>

      <main className="main-content mt-0 ps">
        <section>
          <div className="page-header min-vh-100">
            <div className="container">
              <div className="row">
                <div className="col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0 mx-auto">
                  <div className="card card-plain">
                    <div className="card-header pb-0 text-start">
                      <h4 className="font-weight-bolder">Sign In</h4>
                      <p className="mb-0">
                        Enter your email and password to sign in
                      </p>
                    </div>
                    <div className="card-body">
                      <form role="form">
                        <div className="mb-3">
                          <input
                            type="email"
                            className="form-control form-control-lg"
                            placeholder="Email"
                            aria-label="Email"
                          />
                        </div>
                        <div className="mb-3">
                          <input
                            type="email"
                            className="form-control form-control-lg"
                            placeholder="Password"
                            aria-label="Password"
                          />
                        </div>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="rememberMe"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="rememberMe"
                          >
                            Remember me
                          </label>
                        </div>
                        <div className="text-center">
                          <button
                            type="button"
                            className="btn btn-lg btn-primary btn-lg w-100 mt-4 mb-0"
                          >
                            Sign in
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="card-footer text-center pt-0 px-lg-2 px-1">
                      <p className="mb-4 text-sm mx-auto">
                        Don't have an account?
                        <a
                          href="javascript:;"
                          className="text-primary text-gradient font-weight-bold"
                        >
                          Sign up
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 end-0 text-center justify-content-center flex-column">
                  <div
                    className="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"
                    style={{
                      backgroundImage:
                        'url("https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg")',
                      backgroundSize: 'cover',
                    }}
                  >
                    <span className="mask bg-gradient-primary opacity-6" />
                    <h4 className="mt-5 text-white font-weight-bolder position-relative">
                      "Attention is the new currency"
                    </h4>
                    <p className="text-white position-relative">
                      The more effortless the writing looks, the more effort the
                      writer actually put into the process.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="ps__rail-x" style={{ left: 0, bottom: 0 }}>
          <div
            className="ps__thumb-x"
            tabIndex={0}
            style={{ left: 0, width: 0 }}
          />
        </div>
        <div className="ps__rail-y" style={{ top: 0, right: 0 }}>
          <div
            className="ps__thumb-y"
            tabIndex={0}
            style={{ top: 0, height: 0 }}
          />
        </div>
      </main>
    </>
  );
};
