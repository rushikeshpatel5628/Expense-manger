import logo from "./logo.svg";
import "./App.css";
import { Sidebar } from "./component/Sidebar";
import { Navbar } from "./component/Navbar";
import { Route, Routes } from "react-router-dom";
import { Login } from "./component/Login";
import { UserDashBoard } from "./component/UserDashBoard";
import { Expenses } from "./component/Expenses";
import { AddExpense } from "./component/AddExpense";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import { UpdateExpense } from "./component/UpdateExpense.jsx";



function App() {
  const path = window.location.pathname;
  console.log(path);

  return (
    <body>
      <Routes>
        <Route path="/" element={<Login />}></Route>
      </Routes>
      {path === "/" || path === "/login" || path === "" ? null : (
        <div className="wrapper">
          {path === "/" || path === "/login" || path === "" ? null : (
            <Sidebar />
          )}
          <div className="main-panel">
            {path === "/" || path === "/login" || path === "" ? null : (
              <Navbar />
            )}
            <div className="content">
              <Routes>
                <Route path="/user/dashboard" element={<UserDashBoard />} ></Route>
                <Route path="/user/expenses" element={<Expenses />}></Route>
                <Route path="/expense/form" element={<AddExpense />}></Route>
                <Route path="/expense/update/:id" element={<UpdateExpense />}></Route>
              </Routes>
            </div>
          </div>
        </div>
      )}
    </body>
  );
}

export default App;
