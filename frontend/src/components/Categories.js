import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { saveCategoryPosts } from '../store/actions/actions'
import Icon from './UI/Icon'
import { sortCategories } from '../utils/array/helpers.js'
import { toast } from 'react-toastify'
import { useIsOnRoute } from '../utils/customHooks/useIsOnRoute'

const Categories = () => {
  const categories = useSelector(state => state.categories)
  const dispatch = useDispatch()
  const disable = useIsOnRoute(['add', 'edit'])

  const blockSelection = e => {
    e.preventDefault()
    toast("Can't change view category while post is creating/editing")
  }
  const handleClick = (e, id) => {
    disable && blockSelection(e)
    dispatch(saveCategoryPosts(id))
  }
  const sortedCategories = sortCategories(categories)

  return sortedCategories.map(({ id, name }) => (
    <div key={name} className="categories__single-category">
      <div className="categories__icon">
        <Icon categoryName={name} />
      </div>
      <Link className="categories__name" to={`/category/${name}`}>
        <div className="categories__name" onClick={e => handleClick(e, id)}>
          {name}
        </div>
      </Link>
    </div>
  ))
}

export default Categories
