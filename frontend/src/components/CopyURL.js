import React from 'react'
import { getCurrentURL } from '../utils'
import { ReactComponent as Share } from '../assets/icons/share.svg'

const CopyPostURL = ({ postId }) => {
  const copyURL = () => {
    let currentURL = getCurrentURL()

    if (postId) {
      currentURL = currentURL + `posts/${postId}`
    }

    navigator.clipboard.writeText(currentURL)
  }

  return (
    <button onClick={copyURL} className="post__share-button">
      <Share />
      Share
    </button>
  )
}

export default CopyPostURL
