import React, { useState } from 'react'
import 'react-mde/lib/styles/css/react-mde-all.css'
import { request, convertToSelectOptions } from '../utils'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { saveAllPosts } from '../store/actions/actions'
import CreatableSelect from 'react-select/creatable'
import customStyles from '../styles/ReactSelectCustomStyles/customStyles'
import errorToast from '../utils/toasts/errorToast'
import Checkboxes from '../authenticated/Checkboxes'
import Markdown from '../components/Markdown'
import postSuccessToast from '../utils/toasts/postSuccessToast'
import PostPreview from '../authenticated/PostPreview'
import ReactMde from 'react-mde'
import StyledAddPost from '../styles/StyledAddPost'

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

  /*
    style reactMDe using external classes
    style react select - ask designer maybes
      selecting categories can look as title
      with placeholder "categories"
    remove Markdown component
      render Post comp instead
      pass markdown, title and cats 

  */

  return (
    <StyledAddPost>
      <div className="add-post-main">
        <div className="add-post-header">Create a post</div>
        <form>
          <input
            className="add-post-title"
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
        title={title || 'your title'}
        body={markdown || 'your content'}
      />

      {/* <button className="add-post" disabled={buttonState} onClick={savePost}>
        Save Post */}
      {/* </button> */}
    </StyledAddPost>
  )
}

export default AddPost
