import React from 'react'
import Markdown from './Markdown'
import CopyPostURL from './CopyURL'
import PostCategories from './PostCategories'
import ReactionBar from './ReactionBar'
import StyledPost from '../styles/StyledPost'
import StyledPostInfo from '../styles/StyledPostInfo'
import StyledTitleLink from '../styles/StyledTitleLink'

const Post = ({ post }) => (
  <StyledPost className="styled-post">
    <article>
      <StyledPostInfo>
        <div className="author-info">
          <img src={post.author.image} alt="author-img" />
          <div className="date-author">
            <p className="author">
              {post.author.firstName} {post.author.lastName}
            </p>
            <p className="date">date</p>
          </div>
        </div>
        <CopyPostURL postId={post.id} />
      </StyledPostInfo>
      <StyledTitleLink to={`/posts/${post.id}`}>{post.title}</StyledTitleLink>
      <Markdown source={post.body} />
      <div className="post-footer">
        <PostCategories categories={post.categories} />
        <ReactionBar post={post} />
      </div>
    </article>
  </StyledPost>
)

export default Post
