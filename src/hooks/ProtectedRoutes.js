import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { LogIn1 } from '../component/User/LogIn1';
import { LandingPage } from '../component/LandingPage';

// const useAuth = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     if (localStorage.getItem('userId') != null) {
//       setIsAuthenticated(true);
//     } else {
//       setIsAuthenticated(false);
//     }
//   }, [localStorage]);

//   return isAuthenticated;
// };

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    setIsAuthenticated(userId !== null);
  }, []);

  return isAuthenticated;
};

export const ProtectedRoutes = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (auth === null) {
  //     // If authentication status is null, reload the page
  //     window.location.reload();
  //   }
  // }, [auth]);

  console.log('auth......', auth);

  return auth ? <Outlet /> : <LogIn1 />;
};
