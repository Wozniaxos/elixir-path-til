import { getToken } from "../auth";

export const fetchReviewPost = async url => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json"
    }
  });

  return response.json();
};
