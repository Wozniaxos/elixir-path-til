import { useLocation } from "react-router-dom";
const localStorageKey = 'til_token'

export const postData = async (url, data) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: data
  });

  return response.ok;
};

export const useQuery = () => {
  const queryString = useLocation().search;

  return new URLSearchParams(queryString);
};

export const isAuthenticated = () => {
  const token = window.localStorage.getItem(localStorageKey);
  if (token) return true;

  return false;
};

export const deleteToken = () => {
  window.localStorage.removeItem(localStorageKey);
};
