import React from 'react'
import { getCurrentURL } from '../utils'

const CopyPostURL = ({ postId }) => {
  const copyURL = () => {
    let currentURL = getCurrentURL()

    if (postId) {
      currentURL = currentURL + `posts/${postId}`
    }

    navigator.clipboard.writeText(currentURL)
  }

  return <button onClick={copyURL}>Copy post Url</button>
}

export default CopyPostURL
