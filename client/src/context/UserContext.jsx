import { createContext, useEffect, useReducer, useState } from "react";
export const UserContext = createContext();
const initialState = {
  user: null,
  user_id: null,
  token: null,
  setAuthToken: () => {},
  setUserId: () => {},
  setUser: () => {},
};
export function UserContextProvider({ children }) {
  const [authToken, setAuthToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState("");
  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("user_id");
    setAuthToken(null);
    setUserId(null);
    setUser(null);
  };
  const contextValue = {
    user: user,
    user_id: userId,
    token: authToken,
    setAuthToken: setAuthToken,
    setUserId: setUserId,
    setUser: setUser,
    logout: logout,
  };
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}
