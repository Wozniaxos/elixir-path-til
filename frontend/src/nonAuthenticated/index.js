import React from 'react'
import MainRoutes from '../components/MainRoutes'
import AppHeader from '../components/AppHeader'

const NonAuthenticatedApp = () => {
  return (
    <>
      <AppHeader />
      <MainRoutes />
    </>
  )
}

export default NonAuthenticatedApp
