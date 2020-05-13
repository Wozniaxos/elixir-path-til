import React from 'react'
import { useSelector } from 'react-redux'
import CategoryIcon from '../components/CategoryIcon'

const Categories = () => {
  const categories = useSelector(state => state.categories)

  return categories.map(category => (
    <div key={category.name} className="post-category">
      {/* todo - remove hardcoded data when more icons available  */}
      <CategoryIcon name="html" />
      <div className="post-category-name">{category.name}</div>
    </div>
  ))
}

export default Categories
