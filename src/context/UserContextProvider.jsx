import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserContext from './UserContext';

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(
          `http://localhost:5000/users/user/${userId}`
        );
        const userData = response.data.data;
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
