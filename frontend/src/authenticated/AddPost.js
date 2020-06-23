import React, { useState } from 'react'
import 'react-mde/lib/styles/css/react-mde-all.css'
import { request, convertToSelectOptions } from '../utils'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { saveCurrentUser, saveAllPosts } from '../store/actions/actions'
import CreatableSelect from 'react-select/creatable'
import customStyles from '../styles/ReactSelectCustomStyles/customStyles'
import errorToast from '../utils/toasts/errorToast'
import Checkboxes from '../authenticated/Checkboxes'
import postSuccessToast from '../utils/toasts/postSuccessToast'
import PostPreview from '../authenticated/PostPreview'
import ReactMde from 'react-mde'

const AddPost = () => {
  const [buttonState, setButtonState] = useState(true)
  const [userCategories, setUserCategories] = useState([])
  const [markdown, setMarkdown] = useState('')
  const [title, setTitle] = useState('')
  const [isPublic, setIsPublic] = useState(false)
  const [isReviewNeeded, setIsReviewNeeded] = useState(false)
  const history = useHistory()
  const dispatch = useDispatch()
  const categoriesOptions = useSelector(state =>
    convertToSelectOptions(state.categories)
  )

  const savePost = async () => {
    const post = {
      body: markdown,
      title: title,
      categories: userCategories,
      is_public: isPublic,
      reviewed: !isReviewNeeded,
    }

    const savePost = await request('POST', '/api/posts', JSON.stringify(post))

    if (savePost.ok) {
      dispatch(saveAllPosts())
      dispatch(saveCurrentUser())
      postSuccessToast('Post added successfully!')
      history.push('/')
    } else {
      const errors = await savePost.json()

      errorToast(errors)
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
    setTitle(event.target.value)
  }
  const handleSelect = selectedOptions => {
    if (!selectedOptions) {
      setUserCategories([])

      return
    }

    const categories = selectedOptions.map(
      categoryOption => categoryOption.label
    )

    setUserCategories(categories)
  }

  const handlePublicCheckbox = () => {
    setIsPublic(!isPublic)
    ;(!isReviewNeeded || isPublic) && handleReviewCheckbox()
  }

  const handleReviewCheckbox = () => {
    setIsReviewNeeded(!isReviewNeeded)
  }

  const handleCancel = () => {
    history.push('/')
  }

  return (
    <div>
      <div className="add-post-container">
        <div className="add-post__post-create">
          <h2 className="add-post__header">Create a post</h2>
          <form>
            <input
              className="add-post__title"
              type="text"
              name="name"
              placeholder="Title"
              value={title}
              onChange={handleTitle}
            />
            <CreatableSelect
              className="basic-multi-select"
              classNamePrefix="select"
              isMulti
              name="colors"
              onChange={handleSelect}
              options={categoriesOptions}
              placeholder="Select categories"
              styles={customStyles}
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
            textAreaProps={{
              placeholder: 'Write away...',
            }}
            value={markdown}
          />
          <Checkboxes
            handlePublicCheckbox={handlePublicCheckbox}
            isPublic={isPublic}
            handleReviewCheckbox={handleReviewCheckbox}
            isReviewNeeded={isReviewNeeded}
          />
        </div>
        <PostPreview
          categories={userCategories}
          title={title || 'Title'}
          body={markdown || 'Your content'}
        />
      </div>
      <div className="buttons">
        <button
          className="buttons__button-primary"
          disabled={buttonState}
          onClick={savePost}
        >
          Save Post
        </button>
        <button onClick={handleCancel} className="buttons__button-cancel">
          Cancel
        </button>
      </div>
    </div>
  )
}

export default AddPost
