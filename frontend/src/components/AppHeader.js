import React from 'react'
import AdminPanel from '../authenticated/AdminPanel'
import useUser from '../utils/customHooks/useUser'

const AppHeader = () => {
  const user = useUser()
  const { REACT_APP_API_URL: API_URL } = process.env

  return (
    <div className="app-header">
      {user ? (
        <AdminPanel />
      ) : (
          <a className="login-link" href={`${API_URL}/auth/google`} >
            log in
          </a>
        )
      }
    </div >
  )
}

export default AppHeader
