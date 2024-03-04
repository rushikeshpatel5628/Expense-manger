import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { LogIn } from '../component/User/LogIn';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('userId') != null) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [localStorage]);

  return isAuthenticated;
};

export const ProtectedRoutes = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  console.log('auth......', auth);

  return auth ? <Outlet /> : <LogIn />;
};
