import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { handleReaction, checkHasReacted } from '../utils'
import { saveAllPosts, saveAllUsers } from '../store/actions/actions'
import useUser from '../utils/customHooks/useUser'

const Reaction = props => {
  const { id } = props.post
  const { type, whoReacted, Icon } = props.reaction
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

  return (
    <div className="reaction" onClick={toggleReaction}>
      <Icon width="28px" fill={hasReacted ? 'green' : '#8a8a8a'} />
      <p>{reactionNumber}</p>
    </div>
  )
}

export default Reaction
