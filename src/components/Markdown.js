import React from "react";
import ReactMarkdown from "react-markdown";
import CodeBlock from "./CodeBlock";

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
