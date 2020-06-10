import React from 'react'
import {useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {useState} from 'react'
import {saveAllPosts} from '../store/actions/actions'
import Post from '../components/Post'
import {useQuery, fetchReviewPost, approvePost} from '../utils'

const ReviewPost = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const query = useQuery()
  const [post, setPost] = useState(null)
  const [hash, setHash] = useState(null)

  useEffect(() => {
    const fetchpost = async () => {
      const hash = query.get('hashed_id')
      const post = await fetchReviewPost(`/api/posts/${hash}/review`)
      setHash(hash)
      setPost(post)
    }

    fetchpost()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const approvePostHandler = () => {
    const response = approvePost(`/api/posts/${hash}/review`)
    if (response) {
      dispatch(saveAllPosts())
      history.push('/')
    }
  }

  if (!post) {
    return <p>...loading...</p>
  }

  if (post.errors) {
    return <p>{post.errors.detail}</p>
  }


  return (
    <>
      <Post post={post} />
      <button onClick={approvePostHandler}>approve?</button>
    </>
  )
}

export default ReviewPost
