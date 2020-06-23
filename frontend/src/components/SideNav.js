import React from 'react'
import Categories from '../components/Categories'
import Search from './Search'

const SideNav = () => (
  <div className="side-nav">
    <ul className="side-nav__menu">
      <li className="side-nav__menu-item">
        <Search />
      </li>
      <li className="side-nav__menu-item">Users</li>
      <li className="side-nav__menu-item">Stats </li>
    </ul>
    <div className="categories">
      <Categories />
    </div>
  </div>
)

export default SideNav
