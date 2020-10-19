import React, { useState, useEffect } from 'react'
import { fetchSinglePost } from '../utils'
import { useParams } from 'react-router-dom'
import Post from '../components/Post'

const { REACT_APP_API_URL: API_URL } = process.env

const DisplayPost = () => {
  const [post, setPost] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    const fetchPost = async () => {
      const post = await fetchSinglePost(`${API_URL}/api/posts/`, id)
      setPost(post)
    }
    fetchPost()
  }, [id])

  if (!post) {
    return <p>...loading...</p>
  }

  return <Post key={post.id} post={post} />
}

export default DisplayPost
