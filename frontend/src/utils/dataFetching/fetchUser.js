import { getToken } from '../auth'

// FETCH USER
export const fetchUser = async url => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
    },
  })

  return response.json()
}
