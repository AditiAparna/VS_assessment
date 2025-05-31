// outputNode.js

import { useState } from "react";
import { BaseNode } from "./baseNode";

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace("customOutput-", "output_")
  );
  const [outputType, setOutputType] = useState(data.outputType || "Text");

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Output"
      handles={[{ type: "target", position: "Left", id: "value" }]}
      preDefinedChild={[
        {
          type: "text",
          label: "Name:",
          value: currName,
          onChange: handleNameChange,
        },
        {
          type: "select",
          label: "Type:",
          value: outputType,
          onChange: handleTypeChange,
          options: ["Text", "File"],
        },
      ]}
    />
  );
};
