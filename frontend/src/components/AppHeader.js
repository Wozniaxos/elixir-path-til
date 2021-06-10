import React from 'react'
import AdminPanel from '../authenticated/AdminPanel'
import useUser from '../utils/customHooks/useUser'
import LogInButton from './LogInButton'

const AppHeader = () => {
  const user = useUser()

  return (
    <div className="app-header">
      {user ? <AdminPanel /> : <LogInButton className="login-link" />}
    </div>
  )
}

export default AppHeader
