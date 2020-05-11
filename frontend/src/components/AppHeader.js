import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AdminPanel from '../authenticated/AdminPanel'
import Search from './Search'
import StyledAppHeader from '../styles/StyledAppHeader'
import { useDispatch } from 'react-redux'
import { toggleTheme } from '../store/actions/actions'
import useUser from '../utils/customHooks/useUser'

const AppHeader = () => {
  const user = useUser()
  const dispatch = useDispatch()
  const [isDark, setIsDark] = useState(false)

  const themeToggler = () => {
    setIsDark(!isDark)
    dispatch(toggleTheme(isDark))
  }

  return (
    <StyledAppHeader>
      <ul>
        <li>
          <Link to="/" className="home">
            todayilearned
          </Link>
        </li>
        <li>
          <Search />
        </li>
        <li>
          {/* for testing purposes - will be implemented after rebase/merge */}
          <button onClick={themeToggler}>theme</button>
        </li>
        {user ? (
          <AdminPanel />
        ) : (
          <li>
            <a href="http://localhost:4000/auth/google">login</a>
          </li>
        )}
      </ul>
    </StyledAppHeader>
  )
}

export default AppHeader
