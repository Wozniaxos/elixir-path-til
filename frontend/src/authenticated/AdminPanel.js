import React from "react";
import Logout from "./Logout";
import { Link } from "react-router-dom";

const AdminPanel = ({ setIsLoggedIn }) => {
  return (
    <div className="admin-panel">
      <Logout setIsLoggedIn={setIsLoggedIn} />
      <Link to="/add-post">
        <p>add post</p>
      </Link>
      <Link to="/profile">
        <p>profile</p>
      </Link>
    </div>
  );
};

export default AdminPanel;
