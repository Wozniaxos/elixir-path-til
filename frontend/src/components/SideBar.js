import React from "react";
import { Link } from "react-router-dom";

const SideBar = props => {
  return (
    <nav className="side-nav-bar">
      <p>this will go on the side like selleo til</p>
      <ul className="side-nav-bar-list">
        <li>
          <a href="http://localhost:4000/auth/google">login</a>
        </li>
        <li>link to search </li>
        <li>
          <Link to="/stats">link to stats</Link>
        </li>
        <li>
          <Link to="/random-post">link to random</Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideBar;
