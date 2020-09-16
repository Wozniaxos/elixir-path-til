import React from 'react'
import Highlighter from 'react-highlight-words'
import { useSelector } from 'react-redux'

const TextBlock = ({ value }) => {
  const searchedPhrase = useSelector(state => {
    if (!state.searchQuery.length) {
      return null
    }

    return state.searchQuery
  })

  return (
    <Highlighter
      highlightClassName="YourHighlightClass"
      searchWords={[searchedPhrase]}
      autoEscape={true}
      textToHighlight={value}
    />
  )
}

export default TextBlock
