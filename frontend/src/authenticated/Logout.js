import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deleteToken } from '../utils'
import { logOut } from '../store/actions/actions'
import StyledLogout from '../styles/StyledLogout'

const Logout = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const logOutHandler = () => {
    deleteToken()
    dispatch(logOut())
    history.push('/')
  }

  return <StyledLogout onClick={logOutHandler}>Log out</StyledLogout>
}

export default Logout
