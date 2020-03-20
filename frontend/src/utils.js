import { useLocation } from "react-router-dom";
const localStorageKey = "til_token";

// FETCHING POSTS
export const fetchData = async url => {
  const response = await fetch(url);
  const data = response.json();

  return data;
};

export const fetchSinglePost = async (url, id) => {
  const response = await fetch(url + id);
  const post = response.json();

  return post;
};

// ADD POST
export const postData = async (url, data) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json"
    },
    body: data
  });

  return response.ok;
};

// UPDATE POST
export const updateData = async (url, data) => {
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json"
    },
    body: data
  });

  return response.ok;
};

// DELETE POST
export const deleteData = async (url, data) => {
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json"
    }
  });

  return response.ok;
};

// AUTHENTICATION
export const isAuthenticated = () => {
  const token = getToken();
  if (token) return true;

  return false;
};

// TOKENS
export const deleteToken = () => {
  window.localStorage.removeItem(localStorageKey);
};

export const getToken = () => {
  return window.localStorage.getItem(localStorageKey);
};

// URLS
export const getCurrentURL = () => {
  return document.URL;
};

export const useQuery = () => {
  const queryString = useLocation().search;

  return new URLSearchParams(queryString);
};

// HELPERS

export const convertToSelectOptions = data => {
  return data.map(el => ({ value: el.id, label: el.name }));
};

export const getUserCategories = (
  userCategoriesIds,
  categoriesArray
) => {
  const userCategoriesOptions = [];
  userCategoriesIds.forEach(categoryId => {
    categoriesArray.forEach(obj => {
      if (obj.value === categoryId) userCategoriesOptions.push(obj);
    });
  });
  return userCategoriesOptions;
};
