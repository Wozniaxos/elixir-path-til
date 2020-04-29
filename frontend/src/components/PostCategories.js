import React from 'react'

const PostCategories = ({ categories }) => {
  if (!categories) {
    return null
  }

  const slicedCategories = categories.slice(0, 3)

  let moreCategories = null
  if (categories.length > 3) {
    moreCategories = (
      <p className="more-categories">+ {categories.length - 3} more...</p>
    )
  }

  return (
    <div className="categories">
      {slicedCategories.map((category, index) => (
        <p key={index} className="category">
          {category}
        </p>
      ))}
      {moreCategories}
    </div>
  )
}

export default PostCategories
