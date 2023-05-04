// import { createContext, useContext, useState } from "react";

// const UserContext = createContext();

// export const useUserContext = () => {
//   return useContext(UserContext);
// };

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   const value = {
//     user,
//     setUser,
//   };
//   return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
// };

// UserContext.js

import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const updateUser = (newUserData) => {
    setUser((prevUserData) => {
      return { ...prevUserData, ...newUserData };
    });
  };

  const value = {
    user,
    updateUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// AuthContext.js
