import React from 'react'
import Post from './Post'
import '../App.css'

const PostsList = ({ posts }) => {
  if (!posts) {
    return null
  }

  return (
    <div className='posts'>
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  )
}

export default PostsList
