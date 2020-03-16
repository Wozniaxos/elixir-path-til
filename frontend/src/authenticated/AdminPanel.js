import React from "react";
import { deleteToken } from "../utils";

const AdminPanel = ({ setIsLoggedIn }) => {
  const logOut = () => {
    setIsLoggedIn(false);
    deleteToken();
  };

  return (
    <div>
      <button onClick={logOut}>log out</button>
      <p>AdminPanel here</p>
    </div>
  );
};

export default AdminPanel;
