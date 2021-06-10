import React from 'react'

const LogInButton = props => {
  const { REACT_APP_API_URL: API_URL } = process.env
  const { className } = props

  return (
    <a className={className} href={`${API_URL}/auth/google`}>
      log in
    </a>
  )
}
export default LogInButton
