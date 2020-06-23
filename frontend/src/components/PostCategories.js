import React from 'react'

const PostCategories = ({ categories, preview }) => {
  if (!categories) {
    return null
  }

  let howManyCategories = 3

  if (preview) {
    howManyCategories = 2
  }

  const slicedCategories = categories.slice(0, howManyCategories)

  let moreCategories = null

  if (categories.length > howManyCategories) {
    moreCategories = (
      <p className="post__more-categories">
        + {categories.length - howManyCategories} more...
      </p>
    )
  }

  return (
    <div className="post__categories">
      {slicedCategories.map((category, index) => (
        <p key={index} className="post__single-category">
          {category}
        </p>
      ))}
      {moreCategories}
    </div>
  )
}

export default PostCategories
