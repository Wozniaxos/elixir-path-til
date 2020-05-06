import { checkForToken } from '../auth'

export const fetchSearchedPosts = async query => {
  const optionsToken = checkForToken()

  const response = await fetch(`/api/posts?q=${query}`, optionsToken)

  const data = response.json()

  return data
}
