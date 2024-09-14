import React, { createContext, useState } from 'react';

const AuthContext = createContext(); // Create context

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    localStorage.setItem('user', 'loggedInUser');
   
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  // Check login status on provider mount
  React.useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLogin, handleLogout , setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => React.useContext(AuthContext); // Custom hook for context

export { AuthProvider , useAuth };
