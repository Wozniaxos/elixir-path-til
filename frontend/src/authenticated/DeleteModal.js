import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'

const DeleteModal = ({ deletePost, toggleModal }) => {
  const [isModalOpen, setIsModalOpen] = useState(true)

  /* backdrop-filter: blur(2px); */
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-90%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#272B2F',
      border: 'none',
      width: '576px',
    },
  }
  useEffect(() => {
    Modal.setAppElement('#root')
  }, [])

  const handleDelete = () => {
    deletePost()
    setIsModalOpen(false)
    toggleModal()
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    toggleModal()
  }

  return (
    <Modal
      isOpen={isModalOpen}
      style={customStyles}
      shouldCloseOnOverlayClick={true}
      overlayClassName="Overlay"
    >
      <h3 className="delete-modal__header">
        Are you sure you want to delete this post?
      </h3>
      <div className="delete-modal">
        <button className="cancel-button" onClick={handleCancel}>
          Cancel
        </button>
        <button onClick={handleDelete} className="delete-post-btn">
          Delete
        </button>
      </div>
    </Modal>
  )
}

export default DeleteModal
