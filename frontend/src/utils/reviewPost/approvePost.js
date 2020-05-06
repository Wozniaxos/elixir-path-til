import { getToken } from '../auth'

// APPROVE POST
export const approvePost = async url => {
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
    },
  })

  return response.ok
}
