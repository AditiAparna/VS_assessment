import { Handle, Position } from "reactflow";

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
      style={{
        width: 'auto',
        height: 'auto',
        minHeight: 80,
        minWidth: 100,
        border: "1px solid black",
        padding: 5,
        display: "flex",
        flexDirection: "column",
        gap: 6,
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
              style={handle.style}
            />
          );
        })}
      <div>
        <span>{title}</span>
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
        <label key={key}>
          {child.label}
          <select value={child.value} onChange={(e) => child.onChange(e)}>
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
          <legend>{child.label}</legend>
          {child.options.map((opt) => (
            <label key={`${id}-radio-${opt}`}>
              <input
                type="radio"
                name={`${id}-${child.label}`}
                value={opt}
                checked={child.value === opt}
                onChange={(e) => child.onChange(e)}
              />
              {opt}
            </label>
          ))}
        </fieldset>
      );
    case "multiselect":
      return (
        <fieldset key={key}>
          <legend>{child.label}</legend>
          {child.options.map((opt) => (
            <label key={`${id}-multi-${opt}`}>
              <input
                type="checkbox"
                value={opt}
                checked={child.value.includes(opt)}
                onChange={(e) => child.onChange(e)}
              />
              {opt}
            </label>
          ))}
        </fieldset>
      );
    case "text":
    default:
      return (
        <label key={key}>
          {child.label}
          <input
            type="text"
            value={child.value}
            onChange={(e) => child.onChange(e)}
          />
        </label>
      );
  }
};