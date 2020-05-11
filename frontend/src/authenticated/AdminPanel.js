import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logout from './Logout'
import StyledAdminPanel from '../styles/StyledAdminPanel'
import useUser from '../utils/customHooks/useUser'
import chevron from '../assets/chevron.png'
import classNames from 'classnames'

const AdminPanel = () => {
  const [isHidden, setIsHidden] = useState(true)
  const [backgroundClass, setBackgroundClass] = useState('')
  const [imgRotate, setImgRotate] = useState(false)
  const user = useUser()

  const toggleDropdown = () => {
    setIsHidden(!isHidden)
    setBackgroundClass(backgroundClass === 'bg-light' ? '' : 'bg-light')
    setImgRotate(!imgRotate)
  }

  const dropDownClasses = classNames({
    hidden: isHidden,
    [`${backgroundClass}`]: true,
    'drop-down-menu': true,
  })

  const chevronClasses = classNames({
    chevron: true,
    'img-rotate': imgRotate,
  })

  const profileClasses = classNames({
    [`${backgroundClass}`]: true,
    profile: true,
  })

  return (
    <StyledAdminPanel>
      <Link to="/add-post" className="add-post-btn">
        ADD POST
      </Link>
      <div className={profileClasses} onClick={toggleDropdown}>
        <div className="user-info">
          <img src={user.image} alt="user-img" />
          <p className="user-name">
            {user.firstName} {user.lastName}
          </p>
          <img src={chevron} alt="chevron" className={chevronClasses} />
        </div>
        <div className={dropDownClasses}>
          <Link to="/profile" className="profile-link">
            Profile
          </Link>
          <Logout />
        </div>
      </div>
    </StyledAdminPanel>
  )
}

export default AdminPanel
