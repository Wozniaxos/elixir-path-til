import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { saveSearchedPosts, saveSearchedQuery } from '../store/actions/actions'
import { useOnRouteLeave } from '../utils/customHooks/useOnRouteLeave'
import { ReactComponent as SearchIcon } from '../assets/icons/search.svg'
import { toast } from 'react-toastify'
import { useIsOnRoute } from '../utils/customHooks/useIsOnRoute'

const Search = () => {
  const [input, setInput] = useState('')
  const [timeoutID, setTimeoutID] = useState(null)
  const dispatch = useDispatch()
  const history = useHistory()
  const hasLeavedRoute = useOnRouteLeave('/search')
  const disable = useIsOnRoute(['add', 'edit'])

  useEffect(() => {
    if (hasLeavedRoute) {
      dispatch(saveSearchedQuery(''))
      setInput('')
    }
  }, [hasLeavedRoute, dispatch])

  const handleInput = event => {
    const targetValue = event.target.value

    setInput(targetValue)
    clearTimeout(timeoutID)

    if (targetValue) {
      const timeout = setTimeout(() => {
        history.push('/search')

        dispatch(saveSearchedPosts(targetValue))
      }, 300)
      setTimeoutID(timeout)
    }
  }

  const handleClick = () => {
    return disable ? toast("Can't search while post is creating/editing") : null
  }

  return (
    <div className="search-box" onClick={handleClick}>
      <input
        className="search-box__input"
        type="text"
        placeholder="Search"
        value={input}
        disabled={disable}
        onChange={handleInput}
      />

      <SearchIcon className="search-box__icon" />
    </div>
  )
}

export default Search
