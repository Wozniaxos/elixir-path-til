import React from 'react';
import { deleteToken } from "../utils";

const Logout = ({ setIsLoggedIn }) => {
  const logOut = () => {
    setIsLoggedIn(false);
    deleteToken();
  };

  return (
    <button onClick={logOut}>log out</button>
  );
};

export default Logout;
