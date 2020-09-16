import React from 'react'
import classNames from 'classnames'

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
      <div className="post__more-categories">
        + {categories.length - howManyCategories} more...
      </div>
    )
  }

  const postCategoriesClassnames = classNames({
    post__categories: true,
    '-preview': preview,
  })

  return (
    <div className={postCategoriesClassnames}>
      {slicedCategories.map((category, index) => (
        <div key={index} className="post__single-category">
          {category}
        </div>
      ))}
      {moreCategories}
    </div>
  )
}

export default PostCategories
