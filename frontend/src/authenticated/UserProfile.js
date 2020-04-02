import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProfilePosts from "./ProfilePosts";
import { saveCurrentUserPosts } from "../store/actions/actions";

const UserProfile = props => {
  const user = useSelector(state => state.currentUser);
  const userPosts = useSelector(state => state.currentUserPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(saveCurrentUserPosts(user.uuid));
    }
  }, [dispatch, user]);

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
