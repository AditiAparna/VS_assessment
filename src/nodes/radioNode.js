// radioNode.js

import { useState } from "react";
import { BaseNode } from "./baseNode";

export const RadioNode = ({ id, data }) => {
  const [selectedValue, setSelectedValue] = useState(data?.text || "{{input}}");

  const handleSelectedValue = (e) => {
    setSelectedValue(e.target.value);
  };

  return (
    <BaseNode
      id="id"
      title="Choose One"
      handles={[
        { type: "target", position: "Left", id: "in" },
        { type: "source", position: "Right", id: "out" },
      ]}
      preDefinedChild={[
        {
          type: "radio",
          label: "Options",
          value: selectedValue,
          onChange: handleSelectedValue,
          options: ["Option A", "Option B", "Option C"],
        },
      ]}
    />
  );
};
