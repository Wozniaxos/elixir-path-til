import React from 'react'
import { Link } from 'react-router-dom'
import Search from './Search'
import useUser from '../utils/customHooks/useUser'

const SideBar = () => {
  const user = useUser()

  return (
    <nav className='side-nav-bar'>
      <ul className='side-nav-bar-list'>
        {!user && (
          <li>
            <a href='http://localhost:4000/auth/google'>login</a>
          </li>
        )}
        <li>
          <Link to='/'>home</Link>
        </li>
        <li>
          <Link to='/stats'> stats</Link>
        </li>
        <li>
          <Link to='/categories'> categories</Link>
        </li>
        <li>
          <Search />
        </li>
      </ul>
    </nav>
  )
}

export default SideBar
