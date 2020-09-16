import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logout from './Logout'
import useUser from '../utils/customHooks/useUser'
import chevron from '../assets/icons/chevron.png'
import classNames from 'classnames'

const AdminPanel = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const user = useUser()

  const toggleDropdown = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const userMenuClasses = classNames({
    'user-panel__menu': true,
    '-hidden': !isMenuOpen,
  })

  const chevronClasses = classNames({
    chevron: true,
    'chevron -rotate': isMenuOpen,
  })

  const userPanelClasses = classNames({
    'user-panel': true,
    '-active': isMenuOpen,
  })

  return (
    <div className="user-panel-container">
      <Link to="/add-post" className="add-post-btn">
        ADD POST
      </Link>
      <div onClick={toggleDropdown}>
        <div className={userPanelClasses}>
          <img
            className="user__image -margin"
            src={user.image}
            alt="user-img"
          />
          <p className="user__name">
            {user.firstName} {user.lastName}
          </p>
          <img src={chevron} alt="chevron" className={chevronClasses} />
          <div className={userMenuClasses}>
            <Link to="/profile" className="profile-link">
              Profile
            </Link>
            <Logout />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPanel
