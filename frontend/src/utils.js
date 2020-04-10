import { useLocation } from "react-router-dom";
const localStorageKey = "til_token";

// FETCH POSTS
export const fetchData = async url => {
  let optionsToken = null;

  if (getToken()) {
    optionsToken = {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json"
      }
    };
  }

  const response = await fetch(url, optionsToken);
  const data = await response.json();

  return data;
};

export const fetchSinglePost = async (url, id) => {
  let optionsToken = null;

  if (getToken()) {
    optionsToken = {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json"
      }
    };
  }

  const response = await fetch(url + id, optionsToken);
  const post = response.json();

  return post;
};

export const fetchReviewPost = async url => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json"
    }
  });

  return response.json();
};

// APPROVE POST
export const approvePost = async url => {
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json"
    }
  });

  return response.ok;
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

// REACTIONS
export const handleReaction = async (postId, method, reaction) => {
  let ending = "";

  if (method === "DELETE") {
    ending = `/${reaction}`;
  }

  const response = await fetch(
    `api/posts/${postId}/reactions${ending}`,
    {
      method: `${method}`,
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ type: reaction })
    }
  );

  return response.ok;
};

export const convertReactions = reactions => {
  const reactionsType = ["like", "funny", "love", "surprised"];

  let filteredReactions = [];

  reactionsType.forEach(reaction => {
    const result = reactions.filter(el => el.type === reaction);
    const reactionObj = { type: reaction, whoReacted: result };
    filteredReactions.push(reactionObj);
  });

  return filteredReactions;
};

export const checkHasReacted = (reaction, userId) => {
  const reactionArray = reaction.map(reaction => reaction.user_uuid);

  return reactionArray.includes(userId);
};
