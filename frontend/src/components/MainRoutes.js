import React from 'react'
import { Switch, Route } from 'react-router-dom'
// import Stats from '../components/Stats'
import PostsList from '../components/PostsList'
import DisplayPost from '../components/DisplayPost'
import UserPosts from './UsersPosts'
import SearchedPosts from './SearchedPosts'
import { useSelector } from 'react-redux'

const MainRoutes = () => {
  const posts = useSelector(state => state.posts)
  const categoryPosts = useSelector(state => state.categoryPosts?.posts)

  return (
    <Switch>
      <Route exact path="/">
        <PostsList posts={posts} />
      </Route>
      <Route path="/search">
        <SearchedPosts />
      </Route>
      <Route path="/posts/:id">
        <DisplayPost />
      </Route>
      <Route path="/category/:id">
        <PostsList posts={categoryPosts} />
      </Route>
      <Route path="/user-posts/:id">
        <UserPosts />
      </Route>
    </Switch>
  )
}

export default MainRoutes
