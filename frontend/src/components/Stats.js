import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Stats = props => {
  const usersStats = useSelector(state => state.users);

  return (
    <>
      {usersStats.map(({ user, reactionsReceived, postCount }) => (
        <div key={user.uuid}>
          <Link to={`/user-posts/${user.uuid}`}>
            <p>
              {user.firstName} {user.lastName}
            </p>
          </Link>
          <p>Post count: {postCount}</p>
          <p>Reactions total: {reactionsReceived.total} </p>
          <p>Reaction like : {reactionsReceived.like} </p>
          <p>Reaction funny : {reactionsReceived.funny} </p>
          <p>Reaction love : {reactionsReceived.love} </p>
          <p>
            Reaction surprised : {reactionsReceived.surprised}{" "}
          </p>
        </div>
      ))}
    </>
  );
};

export default Stats;
