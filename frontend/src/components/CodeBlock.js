import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/prism'

class CodeBlock extends React.PureComponent {
  render() {
    const { language, value } = this.props

    return (
      <SyntaxHighlighter style={darcula} language={language}>
        {value}
      </SyntaxHighlighter>
    )
  }
}

export default CodeBlock
