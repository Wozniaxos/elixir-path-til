import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { saveCategoryPosts } from '../store/actions/actions'

const Categories = () => {
  const categories = useSelector(state => state.categories)
  const dispatch = useDispatch()

  const handleClick = id => {
    dispatch(saveCategoryPosts(id))
  }

  return categories.map(category => (
    <div key={category.name} className="categories__single-category">
      <div className="categories__icon">
        <i className={`devicon-${category.name}-plain`}></i>
      </div>
      <Link className="categories__name" to={`/category/${category.name}`}>
        <div
          className="categories__name"
          onClick={() => handleClick(category.id)}
        >
          {category.name}
        </div>
      </Link>
    </div>
  ))
}

export default Categories
