import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);   

  const [user, setUser] = useState(null);

  // Function   
 //to set authentication state and user data
  const setAuth = (isAuthenticated, user) => {
    setIsAuthenticated(isAuthenticated);
    setUser(user);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export { AuthProvider };