import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { handleReaction, checkHasReacted } from '../utils'
import { saveAllPosts, saveAllUsers } from '../store/actions/actions'
import useUser from '../utils/customHooks/useUser'

const Reaction = ({ post, reaction }) => {
  const { id } = post
  const { type, whoReacted, Icon } = reaction
  const [hasReacted, setHasReacted] = useState(false)
  const [reactionNumber, setReactionNumber] = useState(0)
  const user = useUser()
  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      const didReact = checkHasReacted(whoReacted, user.uuid)

      setHasReacted(didReact)
      setReactionNumber(whoReacted.length)
    }
  }, [user, whoReacted])

  const toggleReaction = async () => {
    if (hasReacted) {
      await handleReaction(id, 'DELETE', type)
        .then(() => {
          setHasReacted(!hasReacted)
          setReactionNumber(reactionNumber - 1)
          dispatch(saveAllPosts())
          dispatch(saveAllUsers())
        })
        .catch(err => console.error(err))
    } else {
      await handleReaction(id, 'POST', type)
        .then(() => {
          setHasReacted(!hasReacted)
          setReactionNumber(reactionNumber + 1)
          dispatch(saveAllPosts())
          dispatch(saveAllUsers())
        })
        .catch(err => console.error(err))
    }
  }

  const iconFillColor = hasReacted ? 'green' : '#8a8a8a'

  return (
    <div className="post__single-reaction" onClick={toggleReaction}>
      <Icon width="28px" fill={iconFillColor} />
      <div>{reactionNumber}</div>
    </div>
  )
}

export default Reaction
