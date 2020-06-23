import React from 'react'
import { Link } from 'react-router-dom'
import AdminPanel from '../authenticated/AdminPanel'
import useUser from '../utils/customHooks/useUser'

const AppHeader = () => {
  const user = useUser()

  return (
    <div className="app-header">
      <div className="logo">
        <Link to="/" className="logo__link">
          todayilearned
        </Link>
      </div>
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
