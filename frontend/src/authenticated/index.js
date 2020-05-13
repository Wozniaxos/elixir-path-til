import React from 'react'
import { Switch, Route } from 'react-router-dom'
import AddPost from '../authenticated/AddPost'
import AppHeader from '../components/AppHeader'
import EditPost from '../authenticated/EditPost'
import MainRoutes from '../components/MainRoutes'
import UserProfile from '../authenticated/UserProfile'
import ReviewPost from './ReviewPost'
import SideNav from '../components/SideNav'
import StyledApp from '../styles/StyledApp'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AuthenticatedApp = () => {
  return (
    <>
      <ToastContainer />
      <StyledApp>
        <AppHeader />
        <SideNav />
        <div className="main-routes">
          <MainRoutes />
          {/* authenticated user routes */}
          <Switch>
            <Route exact path="/add-post">
              <AddPost />
            </Route>
            <Route path="/edit-post/:id">
              <EditPost />
            </Route>
            <Route path="/profile">
              <UserProfile />
            </Route>
            <Route path="/review-posts">
              <ReviewPost />
            </Route>
          </Switch>
        </div>
      </StyledApp>
    </>
  )
}

export default AuthenticatedApp
