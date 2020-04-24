import React, { useEffect, useState } from "react";
import ProfilePosts from "./ProfilePosts";
import useUser from "../utils/customHooks/useUser";

const UserProfile = props => {
  const [userPosts, setUserPosts] = useState(null);
  const user = useUser();

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
