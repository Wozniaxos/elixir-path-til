import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchUserPosts } from "../utils";

const UserPosts = props => {
  const [userPosts, setUserPosts] = useState([]);
  const { id } = useParams();
  const user = useSelector(state => {
    const user = state.users.find(user => user.uuid === id);

    return user;
  });

  useEffect(() => {
    const posts = async () => {
      const posts = await fetchUserPosts("/api/users/", id);

      setUserPosts(posts);
    };

    posts();
  }, [id]);

  if (!user) {
    return <p>loading</p>;
  }

  return (
    <>
      <h3>Users posts</h3>
      {userPosts.map(post => (
        <Link to={`/posts/${post.id}`} key={post.id}>
          <p>{post.title}</p>
        </Link>
      ))}
    </>
  );
};

export default UserPosts;
