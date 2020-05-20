import React from 'react'
import CopyPostURL from '../components/CopyURL'
import Markdown from '../components/Markdown'
import PostCategories from '../components/PostCategories'
import ReactionBar from '../components/ReactionBar'
import StyledPreviewPost from '../styles/StyledPreviewPost'
import StyledPostInfo from '../styles/StyledPostInfo'
import StyledTitleLink from '../styles/StyledTitleLink'
import useUser from '../utils/customHooks/useUser'

const PostPreview = ({ body, title, categories }) => {
  const user = useUser()
  console.log(categories)

  return (
    <StyledPreviewPost className="styled-post">
      <article>
        <StyledPostInfo>
          <div className="author-info">
            <img src={user.image} alt="author-img" />
            <div className="date-author">
              <p className="author">
                {user.firstName} {user.lastName}
              </p>
              <p className="date">date</p>
            </div>
          </div>
          <CopyPostURL postId="not-created-yet" />
        </StyledPostInfo>
        <StyledTitleLink to="/not-yet">{title}</StyledTitleLink>
        <Markdown source={body} />
        <div className="post-footer">
          <PostCategories categories={categories} />
          {/* todo -  what here?? fake post with zero reactions?? */}
          {/* <ReactionBar post={null} /> */}
        </div>
      </article>
    </StyledPreviewPost>
  )
}

export default PostPreview
