import { useLocation } from 'react-router-dom'

// URLS
export const getCurrentURL = () => {
  return document.URL
}

export const useQuery = () => {
  const queryString = useLocation().search

  return new URLSearchParams(queryString)
}
