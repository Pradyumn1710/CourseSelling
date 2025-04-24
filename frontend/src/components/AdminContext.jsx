import React, { createContext, useState, useContext,useEffect} from 'react';

// Create context
const AdminContext = createContext();

// Create a custom hook to use AdminContext
export const useAdmin = () => {
  return useContext(AdminContext);
};

// AdminProvider component to provide the state to the entire app
export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null); // Initial state: null, true, or false

  // Simulate a call to verify the token and set the admin state
  const verifyToken = async () => {
    try {
      const response = await fetch('http://localhost:3000/routes/other/verifytoken', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      setAdmin(data.admin); // assuming the response contains the admin field
    } catch (error) {
      console.error('Error verifying token:', error);
    }
  };

  // Call verifyToken on component mount
  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <AdminContext.Provider value={{ admin, setAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};
