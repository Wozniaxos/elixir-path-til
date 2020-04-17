import React from "react";
import ReactMarkdown from "react-markdown";
import CodeBlock from "./CodeBlock";
import TextBlock from "./TextBlock";
import { useSelector } from "react-redux";

const Markdown = props => {
  const searchQuery = useSelector(state => state.searchQuery);

  const renderers = {
    code: CodeBlock
  };

  if (searchQuery) {
    renderers.text = TextBlock;
  }

  return (
    <ReactMarkdown source={props.source} renderers={renderers} />
  );
};

export default Markdown;
