import React, { useState } from "react";
import { deleteData } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import {
  saveAllPosts,
  saveCurrentUserPosts
} from "../store/actions/actions";
import DeleteModal from "./DeleteModal";

const DeletePost = ({ postId }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsOpenModal] = useState(false);
  const userId = useSelector(state => state.currentUser.uuid);

  const toggleModal = () => {
    setIsOpenModal(!isModalOpen);
  };

  const deletePost = () => {
    deleteData(`/api/posts/${postId}`);
    dispatch(saveAllPosts());
    dispatch(saveCurrentUserPosts(userId));
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
