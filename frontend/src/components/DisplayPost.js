import React, { useState, useEffect } from 'react'
import { fetchSinglePost } from '../utils'
import { useParams } from 'react-router-dom'
import Post from '../components/Post'

const DisplayPost = () => {
  const [post, setPost] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    const fetchPost = async () => {
      const post = await fetchSinglePost('/api/posts/', id)
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
