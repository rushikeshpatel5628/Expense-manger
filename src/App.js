import logo from './logo.svg';
import './App.css';
import { Sidebar } from './component/Sidebar';
import { Navbar } from './component/Navbar';
import { Route, Routes, useLocation } from 'react-router-dom';
import { UserDashBoard } from './component/UserDashBoard';
import { Expenses } from './component/Expenses';
import { AddExpense } from './component/AddExpense';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import { UpdateExpense } from './component/UpdateExpense.jsx';
import { LogIn } from './component/User/LogIn.jsx';
import { ProtectedRoutes } from './hooks/ProtectedRoutes.js';

function App() {
  // const path1 = window.location.pathname;
  // console.log(path1);

  // return (
  //   <body>
  //             <Routes>
  //               <Route path="/" element={<LogIn />}></Route>
  //             </Routes>
  //     {path1 === "/" || path1 === "/login" || path1 === "" ? null : (
  //       <div className="wrapper">
  //         {path1 === "/" || path1 === "/login" || path1 === "" ? null : (
  //           <Sidebar />
  //         )}
  //         <div className="main-panel">
  //           {path1 === "/" || path1 === "/login" || path1 === "" ? null : (
  //             <Navbar />
  //           )}
  //           <div className="content">
  //             <Routes>
  //               {/* <Route path="/" element={<LogIn />}></Route> */}
  //               <Route element = {<ProtectedRoutes/>}>
  //                   {/* <Route path="/user/dashboard" element={<UserDashBoard />} ></Route>
  //                    */}
  //                   <Route path="/user/dashboard" element = {<UserDashBoard />} ></Route>
  //                   <Route path="/user/expenses" element={<Expenses />}></Route>
  //                   <Route path="/expense/form" element={<AddExpense />}></Route>
  //                   <Route path="/expense/update/:id" element={<UpdateExpense />}></Route>
  //               </Route>
  //             </Routes>
  //           </div>
  //         </div>
  //       </div>
  //     )}
  //   </body>
  // );

  const location = useLocation();
  const { pathname } = location;

  return (
    <body>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route
          path="/*"
          element={
            pathname === '/' ||
            pathname === '/login' ||
            pathname === '' ? null : (
              <div className="wrapper">
                <Sidebar />
                <div className="main-panel">
                  <Navbar />
                  <div className="content">
                    <Routes>
                      <Route element={<ProtectedRoutes />}>
                        <Route
                          path="/user/dashboard"
                          element={<UserDashBoard />}
                        />
                        <Route path="/user/expenses" element={<Expenses />} />
                        <Route path="/expense/form" element={<AddExpense />} />
                        <Route
                          path="/expense/update/:id"
                          element={<UpdateExpense />}
                        />
                      </Route>
                    </Routes>
                  </div>
                </div>
              </div>
            )
          }
        />
      </Routes>
    </body>
  );
}

export default App;
