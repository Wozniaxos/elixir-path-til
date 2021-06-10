import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Logout from './Logout'
import useUser from '../utils/customHooks/useUser'
import chevron from '../assets/icons/chevron.png'
import classNames from 'classnames'
import AddPostButton from './AddPostButton'

const AdminPanel = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const user = useUser()
  const node = useRef()

  const toggleDropdown = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const userMenuClasses = classNames('user-panel__menu', {
    '-hidden': !isMenuOpen,
  })

  const chevronClasses = classNames('chevron', {
    ' -rotate': isMenuOpen,
  })

  const userPanelClasses = classNames('user-panel', {
    '-active': isMenuOpen,
  })

  const handleClickOutside = e => {
    if (node.current.contains(e.target)) {
      return
    }
    setIsMenuOpen(false)
  }

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen])

  return (
    <div className="user-panel-container" ref={node}>
      <AddPostButton />
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
