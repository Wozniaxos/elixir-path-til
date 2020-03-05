import React from "react";

import { createMarkup } from "../utils";

const Preview = ({ liveHtml, title }) => {
  return (
    <div className="preview">
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={createMarkup(liveHtml)} />
    </div>
  );
};

export default Preview;
