import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Search from './Search'
import { useDispatch } from 'react-redux'
import { toggleTheme } from '../store/actions/actions'
import useUser from '../utils/customHooks/useUser'

const SideBar = props => {
  const user = useUser()
  const dispatch = useDispatch()
  const [isDark, setIsDark] = useState(false)

  const themeToggler = () => {
    setIsDark(!isDark)
    dispatch(toggleTheme(isDark))
  }

  return (
    <nav className="side-nav-bar">
      <ul className="side-nav-bar-list">
        {!user && (
          <li>
            <a href="http://localhost:4000/auth/google">login</a>
          </li>
        )}
        <li>
          <Link to="/">home</Link>
        </li>
        <li>
          <Link to="/stats"> stats</Link>
        </li>
        <li>
          <Link to="/categories"> categories</Link>
        </li>
        <li>
          <Search />
        </li>
        <li>
          {/* for testing purposes - will be implemented after rebase/merge */}
          <button onClick={themeToggler}>theme</button>
        </li>
      </ul>
    </nav>
  )
}

export default SideBar
