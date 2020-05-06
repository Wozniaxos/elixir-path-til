import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

const DeleteModal = ({ deletePost, toggleModal }) => {
  const [isModalOpen, setIsModalOpen] = useState(true)

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
    <Modal isOpen={isModalOpen} style={customStyles} shouldCloseOnOverlayClick={true}>
      <h3>Are you sure?</h3>
      <button className='cancel-delete-btn' onClick={handleCancel}>
        No, thanks!
      </button>
      <button onClick={handleDelete} className='confirm-delete-btn'>
        Yes, delete Post!
      </button>
    </Modal>
  )
}

export default DeleteModal
