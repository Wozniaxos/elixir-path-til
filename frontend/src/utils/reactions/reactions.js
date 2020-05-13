// REACTIONS

// todo import more icons when they are ready
import { ReactComponent as Smile } from '../../assets/icons/smile.svg'

// assign imported icons to reactions
export const convertReactions = reactions => {
  const reactionsType = [
    { type: 'like', Icon: Smile },
    { type: 'funny', Icon: Smile },
    { type: 'love', Icon: Smile },
    { type: 'surprised', Icon: Smile },
  ]

  let filteredReactions = []

  reactionsType.forEach(reaction => {
    const result = reactions.filter(el => el.type === reaction.type)
    const reactionObj = {
      type: reaction.type,
      whoReacted: result,
      Icon: reaction.Icon,
    }

    filteredReactions.push(reactionObj)
  })

  return filteredReactions
}

export const checkHasReacted = (reaction, userId) => {
  const reactionArray = reaction.map(reaction => reaction.user_uuid)

  return reactionArray.includes(userId)
}
