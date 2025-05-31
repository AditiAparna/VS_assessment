// textNode.js

import { useState } from "react";
import { BaseNode } from "./baseNode";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Text"
      handles={[{ type: "source", position: "Right", id: "output" }]}
      preDefinedChild={[
        {
          type: "text",
          label: "Name:",
          value: currText,
          onChange: handleTextChange,
        },
      ]}
    />
  );
};
