import { checkForToken } from '../auth'

const { API_URL } = process.env

export const fetchSearchedPosts = async query => {
  const optionsToken = checkForToken()

  const response = await fetch(`${API_URL}/api/posts?q=${query}`, optionsToken)

  const data = response.json()

  return data
}
