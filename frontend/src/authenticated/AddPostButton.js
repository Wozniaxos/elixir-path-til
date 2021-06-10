import React from 'react'
import { useIsOnRoute } from '../utils/customHooks/useIsOnRoute'
import { Link } from 'react-router-dom'

const AddPostButton = () => {
  const isOnAddRoute = useIsOnRoute(['add'])

  if (isOnAddRoute) {
    return null
  }

  return (
    <Link to="/add-post" className="add-post-btn">
      ADD POST
    </Link>
  )
}

export default AddPostButton
