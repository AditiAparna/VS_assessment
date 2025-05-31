import { useRef, useEffect } from "react";

export const ResizableTextarea = ({ label, value, onChange }) => {
  const textareaRef = useRef(null);
  const spanRef = useRef(null);

  useEffect(() => {
    const ta = textareaRef.current;
    const span = spanRef.current;
    if (!ta || !span) return;

    ta.style.height = "auto";

    span.textContent = value || " ";

    const newWidth = Math.min(span.offsetWidth + 20, 300);
    const newHeight = ta.scrollHeight;

    ta.style.width = `${newWidth}px`;
    ta.style.height = `${newHeight}px`;
  }, [value]);

  return (
    <label style={{ display: "flex", gap: 4 }}>
      {label}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={onChange}
        style={{
          resize: "none",
          overflow: "hidden",
          fontSize: 14,
          border: "1px solid #ccc",
          borderRadius: 4,
          padding: 6,
          boxSizing: "border-box",
          minWidth: 150,
          maxWidth: 300,
        }}
      />
      <div
        ref={spanRef}
        style={{
          position: "absolute",
          visibility: "hidden",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          fontSize: 14,
          fontFamily: "inherit",
          padding: 6,
          maxWidth: 300,
        }}
      />
    </label>
  );
};
