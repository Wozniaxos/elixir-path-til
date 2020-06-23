import React from 'react'
import Markdown from './Markdown'
import CopyPostURL from './CopyURL'
import PostCategories from './PostCategories'
import ReactionBar from './ReactionBar'
import { Link } from 'react-router-dom'

const Post = ({ post }) => (
  <article className="post">
    <div className="post__header">
      <div className="post__details">
        <img src={post.author.image} className="user__image" alt="author-img" />
        <div className="post__text-details">
          <div>
            {post.author.firstName} {post.author.lastName}
          </div>
          <div>date</div>
        </div>
      </div>
      <CopyPostURL postId={post.id} />
    </div>
    <Link className="post__title" to={`/posts/${post.id}`}>
      {post.title}
    </Link>
    <div className="post__body">
      <Markdown source={post.body} />
    </div>
    <div className="post__footer">
      <PostCategories categories={post.categories} />
      <ReactionBar post={post} />
    </div>
  </article>
)

export default Post
