import { Handle, Position } from "reactflow";
import { ResizableTextarea } from "../components/resizableTextArea";

export const BaseNode = ({
  id,
  title,
  handles,
  preDefinedChild,
  style,
  customChild = null,
}) => {
  return (
    <div
      className="border border-2 bg-white rounded d-flex flex-column gap-2 p-1"
      style={{
        width: "auto",
        height: "auto",
        minHeight: 80,
        minWidth: 100,
        borderColor: "#bdbcf8 !important",
        ...style,
      }}
    >
      {handles &&
        handles.map((handle, index) => {
          return (
            <Handle
              key={`${index}-${handle.id}`}
              type={handle.type}
              position={Position[handle.position]}
              id={`${id}-${handle.id}`}
              style={{
                backgroundColor: "#5046e5",
                border: "1px solid #fff",
                outline: "1px solid #5046e5",
                left: handle.position === "Left" && "-2px",
                right: handle.position === "Right" && "-2px",
                outlineOffset: "0px",
                padding: 1,
                ...handle.style,
              }}
            />
          );
        })}
      <div
        className="border rounded d-flex justify-content-center p-1"
        style={{
          backgroundColor: "#eef2ff",
          borderColor: "#d0d9fe !important",
        }}
      >
        <span className="text-center fw-semibold">{title}</span>
      </div>
      {preDefinedChild &&
        preDefinedChild.map((child, index) =>
          renderPredefinedChild(child, index, id)
        )}
      {Array.isArray(customChild)
        ? customChild.map((child, index) => <div key={index}>{child}</div>)
        : customChild}
    </div>
  );
};

const renderPredefinedChild = (child, index, id) => {
  const key = `${index}-child-${child.label}`;
  switch (child.type) {
    case "select":
      return (
        <label key={key} className="d-flex">
          <span className="fw-medium me-2" style={{ color: "#565c65" }}>
            {child.label}
          </span>
          <select
            value={child.value}
            onChange={(e) => child.onChange(e)}
            className="flex-fill border rounded"
            style={{
              borderColor: "#d0d9fe !important",
              fontSize: 14,
            }}
          >
            {child.options.map((opt) => (
              <option key={`${id}-opt-${opt}`} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </label>
      );
    case "radio":
      return (
        <fieldset key={key}>
          <span className="fw-medium me-2" style={{ color: "#565c65" }}>
            {child.label}
          </span>
          {child.options.map((opt) => (
            <label key={`${id}-radio-${opt}`} className="me-3">
              <input
                type="radio"
                name={`${id}-${child.label}`}
                value={opt}
                checked={child.value === opt}
                onChange={(e) => child.onChange(e)}
              />
              <span className="ms-1" style={{ fontSize: 14 }}>
                {opt}
              </span>
            </label>
          ))}
        </fieldset>
      );
    case "multiselect":
      return (
        <fieldset key={key}>
          <span className="fw-medium me-2" style={{ color: "#565c65" }}>
            {child.label}
          </span>
          {child.options.map((opt) => (
            <label key={`${id}-multi-${opt}`} className="me-3">
              <input
                type="checkbox"
                value={opt}
                checked={child.value.includes(opt)}
                onChange={(e) => child.onChange(e)}
              />
              <span className="ms-1" style={{ fontSize: 14 }}>
                {opt}
              </span>
            </label>
          ))}
        </fieldset>
      );
    case "resizableTextarea":
      return (
        <ResizableTextarea
          key={key}
          label={child.label}
          value={child.value}
          onChange={child.onChange}
        />
      );
    case "text":
    default:
      return (
        <label key={key} className="d-flex">
          <span className="fw-medium me-2" style={{ color: "#565c65" }}>
            {child.label}
          </span>
          <input
            type="text"
            value={child.value}
            onChange={(e) => child.onChange(e)}
            className="flex-fill border rounded"
            style={{
              borderColor: "#d0d9fe !important",
              fontSize: 14,
            }}
          />
        </label>
      );
  }
};