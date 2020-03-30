import { useLocation } from "react-router-dom";
const localStorageKey = "til_token";

// FETCH POSTS
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

// FETCH USERS POSTS
export const fetchUserPosts = async (url, id) => {
  try {
    const response = await fetch(url + id);
    const user = await response.json();
    const userPosts = user.posts;

    return userPosts;
  } catch (error) {
    console.warn(error);
  }
};

// LIKES
export const handleLike = async (postId, method) => {
  const response = await fetch(`api/posts/${postId}/likes`, {
    method: `${method}`,
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json"
    }
  });

  return response.ok;
};

export const checkHasLiked = (likes, userId) => {
  const likesArray = likes.map(like => like.user_uuid);

  return likesArray.includes(userId);
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

// FETCH USER
export const fetchUser = async url => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json"
    }
  });

  return response.json();
};

// HELPERS
export const convertToSelectOptions = data => {
  return data.map(el => ({ value: el.id, label: el.name }));
};
