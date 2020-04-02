import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Stats = props => {
  const allUsers = useSelector(state => state.users);

  return allUsers.map(user => (
    <Link to={`/user-posts/${user.uuid}`} key={user.uuid}>
      <p>{user.email}</p>
    </Link>
  ));
};

export default Stats;
