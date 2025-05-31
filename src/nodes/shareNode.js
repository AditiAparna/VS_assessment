// shareNode.js

import { useState } from "react";
import { BaseNode } from "./baseNode";

export const ShareNode = ({ id, data }) => {
  const [userName, setUserName] = useState(
    data?.inputName || id.replace("customShare-", "share_")
  );
  const [orgName, setOrgName] = useState(data?.text || "{{orgName}}");
  const [inputType, setInputType] = useState(data.inputType || "Text");

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  const handleOrgChange = (e) => {
    setOrgName(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Share"
      handles={[{ type: "target", position: "Left", id: "value" }]}
      preDefinedChild={[
        {
          type: "select",
          label: "Object Type:",
          value: inputType,
          onChange: handleTypeChange,
          options: ["Knowledge Base", "Other"],
        },
        {
          type: "text",
          label: "User Identifier:",
          value: userName,
          onChange: handleUserNameChange,
        },
        {
          type: "text",
          label: "Organization Name:",
          value: orgName,
          onChange: handleOrgChange,
        },
      ]}
    />
  );
};
