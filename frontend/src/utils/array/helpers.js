// HELPERS
export const convertToSelectOptions = data => {
  return data.map(el => ({ value: el.id, label: el.name }))
}

export const convertReactions = reactions => {
  const reactionsType = ['like', 'funny', 'love', 'surprised']
  let filteredReactions = []

  reactionsType.forEach(reaction => {
    const result = reactions.filter(el => el.type === reaction)
    const reactionObj = { type: reaction, whoReacted: result }
    filteredReactions.push(reactionObj)
  })

  return filteredReactions
}

export const checkHasReacted = (reaction, userId) => {
  const reactionArray = reaction.map(reaction => reaction.user_uuid)

  return reactionArray.includes(userId)
}

const compare = (a, b) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

export const sortCategories = (categories) => {
  return categories.sort(compare)
}
