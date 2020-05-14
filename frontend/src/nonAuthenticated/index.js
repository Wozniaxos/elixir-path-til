import React from 'react'
import AppHeader from '../components/AppHeader'
import SideNav from '../components/SideNav'
import StyledApp from '../styles/StyledApp'
import MainRoutes from '../components/MainRoutes'

const NonAuthenticatedApp = () => {
  return (
    <>
      <StyledApp>
        <AppHeader />
        <SideNav />
        <div className="main-routes">
          <MainRoutes />
        </div>
      </StyledApp>
    </>
  )
}

export default NonAuthenticatedApp
