const localStorageKey = 'til_token'

// TOKENS
export const deleteToken = () => {
  window.localStorage.removeItem(localStorageKey)
}

export const getToken = () => {
  return window.localStorage.getItem(localStorageKey)
}

export const checkForToken = () => {
  const optionsToken = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
    },
  }

  return getToken() ? optionsToken : null
}
