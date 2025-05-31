// inputNode.js

import { useState } from "react";
import { BaseNode } from "./baseNode";

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );
  const [inputType, setInputType] = useState(data.inputType || "Text");

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Input"
      handles={[{ type: "source", position: "Right", id: "value" }]}
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
          value: inputType,
          onChange: handleTypeChange,
          options: ["Text", "File"],
        },
      ]}
    />
  );
};
