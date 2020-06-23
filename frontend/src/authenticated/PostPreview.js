import React from 'react'
import CopyPostURL from '../components/CopyURL'
import Markdown from '../components/Markdown'
import PostCategories from '../components/PostCategories'
// import ReactionBar from '../components/ReactionBar'
import useUser from '../utils/customHooks/useUser'
import { Link } from 'react-router-dom'

const PostPreview = ({ body, title, categories }) => {
  const user = useUser()

  return (
    <article className="post -preview">
      <div className="post__header">
        <div className="post__details">
          <img src={user.image} className="user__image" alt="author-img" />
          <div className="post__text-details">
            <div>
              {user.firstName} {user.lastName}
            </div>
            <div>date</div>
          </div>
        </div>
        <CopyPostURL postId={null} />
      </div>
      <Link className="post__title" to={'not-yet'}>
        {title}
      </Link>
      <div className="post__body">
        <Markdown source={body} />
      </div>
      <div className="post__footer">
        <PostCategories categories={categories} />
        {/* <ReactionBar post={post} /> */}
      </div>
    </article>
  )
}

export default PostPreview
