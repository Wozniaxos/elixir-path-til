import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const useIsOnRoute = paths => {
  const location = useLocation()
  const [isOnRoute, setIsOnRoute] = useState(false)

  useEffect(() => {
    setIsOnRoute(paths.some(path => location.pathname.includes(path)))
  }, [location, paths])

  return isOnRoute
}
