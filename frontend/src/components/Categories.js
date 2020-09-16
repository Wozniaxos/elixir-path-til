import React from 'react'
import { useSelector } from 'react-redux'

const Categories = () => {
  const categories = useSelector(state => state.categories)

  return categories.map(category => (
    <div key={category.name} className="categories__single-category">
      <div className="categories__icon">
        <i className={`devicon-${category.name}-plain`}></i>
      </div>
      <div className="categories__name">{category.name}</div>
    </div>
  ))
}

export default Categories
