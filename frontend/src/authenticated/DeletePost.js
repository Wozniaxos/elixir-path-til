import React, { useState } from "react";
import { request } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import {
  saveAllPosts,
  saveCurrentUser
} from "../store/actions/actions";
import DeleteModal from "./DeleteModal";

const DeletePost = ({ postId }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsOpenModal] = useState(false);
  const userId = useSelector(state => state.currentUser.uuid);

  const toggleModal = () => {
    setIsOpenModal(!isModalOpen);
  };

  const deletePost = async () => {
    const isDeleted = await request(
      "DELETE",
      `/api/me/posts/${postId}`
    );

    if (isDeleted) {
      dispatch(saveAllPosts());
      dispatch(saveCurrentUser());
    }
  };

  return (
    <>
      <button onClick={toggleModal}>delete</button>
      {isModalOpen && (
        <DeleteModal
          deletePost={deletePost}
          toggleModal={toggleModal}
        />
      )}
    </>
  );
};

export default DeletePost;
