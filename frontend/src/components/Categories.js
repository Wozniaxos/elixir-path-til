import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { saveCategoryPosts } from '../store/actions/actions'
import Icon from './UI/Icon'
import { sortCategories } from '../utils/array/helpers.js'

const Categories = () => {
  const categories = useSelector(state => state.categories)
  const dispatch = useDispatch()

  const handleClick = id => {
    dispatch(saveCategoryPosts(id))
  }
  const sortedCategories = sortCategories(categories)

  return sortedCategories.map(category => (
    <div key={category.name} className="categories__single-category">
      <div className="categories__icon">
        <Icon categoryName={category.name} />
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
