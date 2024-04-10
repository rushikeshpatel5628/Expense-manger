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
import { useState } from 'react';
import SignUp from './component/User/SignUp.jsx';
import GoalList from './component/Goal/GoalList.jsx';
import { AddGoal } from './component/Goal/AddGoal.jsx';
import { Goals } from './component/Goal/Goals.jsx';
import { GoalExpenses } from './component/Goal/GoalExpenses.jsx';
import { LogIn1 } from './component/User/LogIn1.jsx';
import { Charts } from './component/Charts/Charts.jsx';
import { Groups } from './component/User Group/Groups.jsx';
import GroupListPage from './component/User Group/GroupListPage.jsx';
import GroupDetailsPage from './component/User Group/GroupDetailsPage.jsx';
import { Charts2 } from './component/Charts/Charts2.jsx';
import { Chart3 } from './component/Charts/Chart3.jsx';
import { UserProfile } from './component/User/UserProfile.jsx';
import { GroupExpense } from './component/User Group/GroupExpense.jsx';
import { AddGroupExpense } from './component/User Group/AddGroupExpense.jsx';
import { UpdateGroupExpense } from './component/User Group/UpdateGroupExpense.jsx';
import { ForgotPassword } from './component/User/ForgotPassword.jsx';
import { ResetPassword } from './component/User/ResetPassword.jsx';
import { PayeeManage } from './component/User/PayeeManage.jsx';
import { CategoryManage } from './component/User/CategoryManage.jsx';
import UserContextProvider from './context/UserContextProvider.jsx';

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

  const [selectedLink, setSelectedLink] = useState('Dashboard');
  const handleLinkSelect = name => {
    setSelectedLink(name);
  };

  return (
    <body>
      <Routes>
        <Route path="/" element={<LogIn1 />} />
        <Route path="/user/signup" element={<SignUp />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route
          path="/*"
          element={
            pathname === '/' || pathname === '/login' || pathname === '' ? (
              <LogIn1 />
            ) : (
              <div className="wrapper">
                <Sidebar onLinkSelect={handleLinkSelect} />
                <div className="main-panel">
                  <Navbar selectedLink={selectedLink} />
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
                        <Route path="/user/goal" element={<Goals />} />
                        <Route path="/goal/add" element={<AddGoal />} />{' '}
                        <Route
                          path="/goal/expenses/:id"
                          element={<GoalExpenses />}
                        />{' '}
                        <Route path="/user/charts" element={<Charts />} />
                        <Route path="/user/charts2" element={<Charts2 />} />
                        <Route path="/user/charts3" element={<Chart3 />} />
                        <Route path="/user/profile" element={<UserProfile />} />
                        <Route path="/user/groups" element={<Groups />} />
                        <Route
                          path="/user/groups2"
                          element={<GroupListPage />}
                        />
                        <Route
                          path="/group-details/:id"
                          element={<GroupDetailsPage />}
                        />
                        <Route
                          path="/group/expenses/:groupid/"
                          element={<GroupExpense />}
                        />
                        <Route
                          path="/addgroupexp/:groupid"
                          element={<AddGroupExpense />}
                        />
                        <Route
                          path="/groupexp/update/:groupid/:expenseid"
                          element={<UpdateGroupExpense />}
                        />
                        <Route
                          path="/user/payee"
                          element={<CategoryManage />}
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
