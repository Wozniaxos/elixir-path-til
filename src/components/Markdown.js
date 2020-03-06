import React from "react";
import ReactMarkdown from "react-markdown";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

class CodeBlock extends React.PureComponent {
  render() {
    const { language, value } = this.props;

    return (
      <SyntaxHighlighter style={atomDark} language={language}>
        {value}
      </SyntaxHighlighter>
    );
  }
}

class Markdown extends React.PureComponent {
  render() {
    return (
      <ReactMarkdown
        source={this.props.source}
        renderers={{
          code: CodeBlock
        }}
      />
    );
  }
}

export default Markdown;
