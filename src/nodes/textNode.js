// textNode.js

import { useState } from "react";
import { BaseNode } from "./baseNode";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "input");
  const [handleArray, setHandleArray] = useState([{ type: "source", position: "Right", id: "output" }])

  const handleTextChange = (e) => {
    const text = e.target.value;
    setCurrText(text);

    const matches = text.match(/\{\{.*?\}\}/g);
    const count = matches ? matches.length : 0;

    const newTargetHandles = Array.from({ length: count }, (_, i) => ({
        type: "target",
        position: "Left",
        id: `input-${i}`,
        style: { top: `${((i + 1) * 100) / (count + 1)}%` }
    }));

    setHandleArray([
        { type: "source", position: "Right", id: "output" },
        ...newTargetHandles
    ]);
};

  return (
    <BaseNode
      id={id}
      title="Text"
      handles={handleArray}
      preDefinedChild={[
        {
          type: "resizableTextarea",
          label: "Name:",
          value: currText,
          onChange: handleTextChange,
        },
      ]}
    />
  );
};
