import React from 'react'
import { useSelector } from 'react-redux'
import PostsList from '../components/PostsList'

const SearchedPosts = () => {
  const searchedPosts = useSelector(state => state.searchedPosts)

  if (!searchedPosts.length) {
    return <p>nothing found</p>
  }

  return <PostsList posts={searchedPosts} />
}

export default SearchedPosts
