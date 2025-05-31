// radioNode.js

import { useState } from "react";
import { BaseNode } from "./baseNode";

export const LogicGateNode = ({ id, data }) => {
  const [gateType, setGateType] = useState(data?.text || "{{input}}");
  const [radioValue, setRadioValue] = useState();

  const handleGateTypeChange = (e) => {
    setGateType(e.target.value);
  };

  const handleRadioValueChange = (e) => {
    setRadioValue(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Logic Gate"
      handles={[
        {
          type: "target",
          position: "Left",
          id: "one",
          style: { top: `${100 / 3}%` },
        },
        {
          type: "target",
          position: "Left",
          id: "two",
          style: { top: `${200 / 3}%` },
        },
        { type: "source", position: "Right", id: "out" },
      ]}
      preDefinedChild={[
        {
          type: "radio",
          label: "Primary Value:",
          value: radioValue,
          onChange: handleRadioValueChange,
          options: ["Input 1", "Input 2"],
        },
        {
          type: "select",
          label: "Gate Type",
          value: gateType,
          onChange: handleGateTypeChange,
          options: ["AND", "OR", "XOR", "NAND"],
        },
      ]}
    />
  );
};
