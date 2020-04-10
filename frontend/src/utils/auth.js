const localStorageKey = "til_token";

// TOKENS
export const deleteToken = () => {
  window.localStorage.removeItem(localStorageKey);
};

export const getToken = () => {
  return window.localStorage.getItem(localStorageKey);
};

// AUTHENTICATION
export const isAuthenticated = () => {
  const token = getToken();
  if (token) {
    return true;
  }

  return false;
};
