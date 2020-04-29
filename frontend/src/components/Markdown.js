import React from 'react'
import ReactMarkdown from 'react-markdown'
import CodeBlock from './CodeBlock'
import TextBlock from './TextBlock'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Markdown = props => {
  const searchQuery = useSelector(state => state.searchQuery)
  const location = useLocation()

  const renderers = {
    code: CodeBlock,
  }

  if (searchQuery && location.pathname === '/search') {
    renderers.text = TextBlock
  }

  return <ReactMarkdown source={props.source} renderers={renderers} />
}

export default Markdown
