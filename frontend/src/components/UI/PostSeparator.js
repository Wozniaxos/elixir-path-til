import React from 'react'
import chevron from '../../assets/icons/chevron.png'

const PostSeparator = () => {
  return (
    <div className="post__separator">
      <div>
        <img src={chevron} alt="chevron" />
      </div>
    </div>
  )
}

export default PostSeparator
