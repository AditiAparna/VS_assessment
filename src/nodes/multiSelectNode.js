import { useState } from "react";
import { BaseNode } from "./baseNode";

export const MultiSelectNode = ({ id }) => {
  const [selectedTags, setSelectedTags] = useState(["Chat GPT"]);

  const handleMultiSelect = (e) => {
    const val = e.target.value;
    const checked = e.target.checked;
    setSelectedTags((prev) =>
      checked ? [...prev, val] : prev.filter((v) => v !== val)
    );
  };

  return (
    <BaseNode
      id={id}
      title="Filter Tags"
      handles={[
        { id: "input", type: "target", position: "Left" },
        { id: "output", type: "source", position: "Right" },
      ]}
      preDefinedChild={[
        {
          type: "multiselect",
          label: "AI Agent",
          value: selectedTags,
          options: ["Claude", "Chat GPT", "Gemini", "DeepSeek"],
          onChange: handleMultiSelect,
        },
      ]}
    />
  );
};
