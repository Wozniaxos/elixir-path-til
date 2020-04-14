import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProfilePosts from "./ProfilePosts";

const UserProfile = props => {
  const [userPosts, setUserPosts] = useState(null);
  const user = useSelector(state => state.currentUser);

  useEffect(() => {
    if (user) {
      setUserPosts(user.posts);
    }
  }, [user]);

  return (
    <>
      {userPosts ? (
        userPosts.map(post => (
          <ProfilePosts post={post} key={post.id} />
        ))
      ) : (
        <p>loading</p>
      )}
    </>
  );
};

export default UserProfile;
