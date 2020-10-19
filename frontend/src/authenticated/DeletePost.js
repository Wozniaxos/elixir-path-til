import React, { useState } from 'react'
import { request } from '../utils'
import { useDispatch } from 'react-redux'
import { saveAllPosts, saveCurrentUser } from '../store/actions/actions'
import DeleteModal from './DeleteModal'
import postSuccessToast from '../utils/toasts/postSuccessToast'

const { API_URL } = process.env

const DeletePost = ({ postId }) => {
  const dispatch = useDispatch()
  const [isModalOpen, setIsOpenModal] = useState(false)

  const toggleModal = () => {
    setIsOpenModal(!isModalOpen)
  }

  const deletePost = async () => {
    const isDeleted = await request('DELETE', `${API_URL}/api/me/posts/${postId}`)

    if (isDeleted.ok) {
      dispatch(saveAllPosts())
      dispatch(saveCurrentUser())
      postSuccessToast('Post deleted successfully.')
    }
  }

  return (
    <>
      <button className="delete-post-btn" onClick={toggleModal}>
        Delete
      </button>
      {isModalOpen && (
        <DeleteModal deletePost={deletePost} toggleModal={toggleModal} />
      )}
    </>
  )
}

export default DeletePost
