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
    <label className="d-flex">
      <span className="fw-medium me-2" style={{ color: '#565c65' }}>{label}</span>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={onChange}
        className="border rounded p-2"
        style={{
          resize: "none",
          overflow: "hidden",
          fontSize: 14,
          borderColor: "#d0d9fe !important",
          boxSizing: "border-box",
          minWidth: 150,
          maxWidth: 300,
        }}
      />
      <div
        ref={spanRef}
        className="position-absolute p-2"
        style={{
          visibility: "hidden",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          fontSize: 14,
          fontFamily: "inherit",
          maxWidth: 300,
        }}
      />
    </label>
  );
};