import React, { useState, useEffect } from 'react'
import 'react-mde/lib/styles/css/react-mde-all.css'
import { request, fetchSinglePost, convertToSelectOptions } from '../utils'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { saveAllPosts } from '../store/actions/actions'
import PostPreview from '../authenticated/PostPreview'
import ReactMde from 'react-mde'
import Select from 'react-select'
import postSuccessToast from '../utils/toasts/postSuccessToast'
import StyledAddPost from '../styles/StyledAddPost'

const EditPost = () => {
  const [buttonState, setButtonState] = useState(true)
  const [markdown, setMarkdown] = useState('')
  const [title, setTitle] = useState('')
  // user categories as strings
  const [categories, setCategories] = useState([])
  // select friendly categories used to pass to select options
  const [categoriesOptions, setCategoriesOptions] = useState('')
  // select friendly user options
  const [userCategoriesOptions, setUserCategoriesOptions] = useState([])
  // allCategories from redux in form {id: 1, name: "java"}
  const allCategories = useSelector(state => state.categories)
  const dispatch = useDispatch()
  const history = useHistory()
  const { id } = useParams()

  useEffect(() => {
    const fetchPost = async () => {
      const post = await fetchSinglePost('/api/posts/', id)

      setMarkdown(post.body)
      setTitle(post.title)
      setCategories(post.categories)
    }

    fetchPost()
  }, [id])

  useEffect(() => {
    setCategoriesOptions(convertToSelectOptions(allCategories))
  }, [allCategories])

  useEffect(() => {
    const userCategories = allCategories.filter(category =>
      categories.includes(category.name)
    )
    const userCategoriesOptions = convertToSelectOptions(userCategories)

    setUserCategoriesOptions(userCategoriesOptions)
  }, [allCategories, categories])

  const updatePost = async () => {
    const markdownPost = {
      body: markdown,
      title: title,
      categories: categories,
    }
    const post = await request(
      'PATCH',
      '/api/me/posts/' + id,
      JSON.stringify(markdownPost)
    )

    if (post.ok) {
      dispatch(saveAllPosts())
      history.push(`/posts/${id}`)
      postSuccessToast('Post updated successfully')
    }
  }

  const handleInput = input => {
    setMarkdown(input)

    if (input.length) {
      setButtonState(false)
    } else {
      setButtonState(true)
    }
  }

  const handleTitle = event => {
    setButtonState(false)

    setTitle(event.target.value)
  }

  const handleSelect = selectedOptions => {
    setButtonState(false)

    if (!selectedOptions) {
      setCategories([])

      return
    }

    const categories = selectedOptions.map(obj => obj.label)

    setCategories(categories)
  }

  const handleCancel = () => {
    history.push('/')
  }

  return (
    <StyledAddPost>
      <div className="add-post-main">
        {/* todo - name it :) */}
        <div className="to-be-named">
          <div className="add-post-header">Update your post</div>
          <form>
            <input
              className="add-post-title"
              type="text"
              name="name"
              placeholder="Title"
              value={title}
              onChange={handleTitle}
            />
            <Select
              isMulti
              name="colors"
              value={userCategoriesOptions}
              options={categoriesOptions}
              onChange={handleSelect}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </form>
          <ReactMde
            classes={{
              toolbar: 'no-show',
              textArea: 'text-area',
              reactMde: 'react-mde',
              grip: 'grip',
            }}
            onChange={handleInput}
            value={markdown}
          />
        </div>
        <PostPreview
          categories={categories}
          title={title || 'your title'}
          body={markdown || 'your content'}
        />
      </div>
      <div className="add-post-buttons">
        <button
          className="add-post-button"
          disabled={buttonState}
          onClick={updatePost}
        >
          update Post
        </button>
        <button onClick={handleCancel} className="cancel-post-button">
          Cancel
        </button>
      </div>
    </StyledAddPost>
  )
}

export default EditPost
