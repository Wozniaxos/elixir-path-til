import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchUserPosts } from '../utils'

const { API_URL } = process.env

const UserPosts = () => {
  const [userPosts, setUserPosts] = useState([])
  const { id } = useParams()

  useEffect(() => {
    const posts = async () => {
      const posts = await fetchUserPosts(`${API_URL}/api/users/`, id)

      setUserPosts(posts)
    }

    posts()
  }, [id])

  return (
    <>
      <h3>Users posts</h3>
      {userPosts.map(post => (
        <Link to={`/posts/${post.id}`} key={post.id}>
          <p>{post.title}</p>
        </Link>
      ))}
    </>
  )
}

export default UserPosts
