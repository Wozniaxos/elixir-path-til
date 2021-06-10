import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchUserPosts } from '../utils'

const { REACT_APP_API_URL: API_URL } = process.env

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
      {userPosts.map(({ id, title }) => (
        <Link to={`/posts/${id}`} key={id}>
          <p>{title}</p>
        </Link>
      ))}
    </>
  )
}

export default UserPosts
