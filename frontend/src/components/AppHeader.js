import React from 'react'
import AdminPanel from '../authenticated/AdminPanel'
import useUser from '../utils/customHooks/useUser'

const AppHeader = () => {
  const user = useUser()

  return (
    <div className="app-header">
      {user ? (
        <AdminPanel />
      ) : (
        <a className="login-link" href="http://localhost:4000/auth/google">
          log in
        </a>
      )}
    </div>
  )
}

export default AppHeader
