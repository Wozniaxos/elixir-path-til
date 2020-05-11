import React, { useEffect, useState } from 'react'
import { convertReactions } from '../utils'
import StyledReactionBar from '../styles/StyledReactionBar'
import Reaction from './Reaction'

const ReactionBar = ({ post }) => {
  const [reactions, setReactions] = useState()

  useEffect(() => {
    const reactionArray = convertReactions(post.reactions)
    setReactions(reactionArray)
  }, [post.reactions])

  if (!reactions) return null

  return (
    <StyledReactionBar>
      {reactions.map(reaction => (
        <Reaction post={post} reaction={reaction} key={reaction.type} />
      ))}
    </StyledReactionBar>
  )
}

export default ReactionBar
