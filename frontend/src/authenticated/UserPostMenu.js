import React from 'react'
import { Link } from 'react-router-dom'
import DeletePost from '../authenticated/DeletePost'

const UserPostMenu = ({ post }) => {
  return (
    <>
      <hr className="post__hr" />
      <div className="post__user-menu">
        <Link to={`/edit-post/${post.id}`}>
          <button className="edit-post-btn">Edit</button>
        </Link>
        <DeletePost postId={post.id} />
      </div>
    </>
  )
}

export default UserPostMenu
