import React from 'react'
import DeletePost from './DeletePost'
import { Link } from 'react-router-dom'

const ProfilePosts = props => {
  const { post } = props

  return (
    <div>
      <p>{post.title}</p>
      <Link to={`/edit-post/${post.id}`}>
        <button>edit</button>
      </Link>
      <DeletePost postId={post.id} />
    </div>
  )
}

export default ProfilePosts
