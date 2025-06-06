import { useState } from "react";
import { BaseNode } from "./baseNode";

export const PreviewNode = ({ id }) => {
  const [message, setMessage] = useState("Hiii");
  const [botReply, setBotReply] = useState("Heyyy");

  const handleMessageUpdate = (e) => {
    setMessage(e.target.value);
  };

  const handleBotReplyUpdate = (e) => {
    setBotReply(e.target.value);
  };
  return (
    <BaseNode
      id={id}
      title="Preview"
      handles={[{ id: "input", type: "target", position: "Left" }]}
      preDefinedChild={[
        {
          type: "text",
          label: "User: ",
          value: message,
          onChange: handleMessageUpdate,
        },
        {
          type: "text",
          label: "Bot: ",
          value: botReply,
          onChange: handleBotReplyUpdate,
        },
      ]}
      customChild={
        <div
          style={{
            borderRadius: 4,
            background: "#eef2ff",
            border: "1px solid #d0d9fe",
            padding: "6px 8px",
            marginTop: "4px",
          }}
        >
          <p style={{ margin: 0 }}>
            <strong>User:</strong> {message}
          </p>
          <p style={{ margin: 0 }}>
            <strong>Bot:</strong> {botReply}
          </p>
        </div>
      }
    />
  );
};
