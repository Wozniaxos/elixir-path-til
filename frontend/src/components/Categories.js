import React from 'react'
import { useSelector } from 'react-redux'

const Categories = () => {
  const categories = useSelector(state => state.categories)

  return categories.map(category => <p key={category.id}>{category.name}</p>)
}

export default Categories
