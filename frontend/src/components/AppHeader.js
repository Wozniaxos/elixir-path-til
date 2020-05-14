import React from 'react'
import { Link } from 'react-router-dom'
import AdminPanel from '../authenticated/AdminPanel'
import StyledAppHeader from '../styles/StyledAppHeader'
import useUser from '../utils/customHooks/useUser'

const AppHeader = () => {
  const user = useUser()

  return (
    <StyledAppHeader>
      <div className="home">
        <Link to="/" className="home-link">
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
    </StyledAppHeader>
  )
}

export default AppHeader
