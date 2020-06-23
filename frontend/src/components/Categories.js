import React from 'react'
import { useSelector } from 'react-redux'
import CategoryIcon from '../components/CategoryIcon'

const Categories = () => {
  const categories = useSelector(state => state.categories)

  return categories.map(category => (
    <div key={category.name} className="categories__single-category">
      <CategoryIcon name="html" />
      <div className="categories__name">{category.name}</div>
    </div>
  ))
}

export default Categories
