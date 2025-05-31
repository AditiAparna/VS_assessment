// submit.js
import { useCallback } from "react";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);

  const handleSubmit = useCallback(async () => {

    const transformedNodes = nodes.map((node) => ({
      id: node.id,
      type: node.type,
      data: node.data,
    }));

    const transformedEdges = edges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      sourceHandle: edge.sourceHandle,
      targetHandle: edge.targetHandle,
    }));

    const payload = {
      nodes: transformedNodes,
      edges: transformedEdges,
    };

    try {
      const response = await fetch("http://localhost:8001/pipelines/parse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${errorText}`);
      }

      const data = await response.json();

      const message =
        `Pipeline Analysis Results:\n\n` +
        `Number of Nodes: ${data.num_nodes}\n` +
        `Number of Edges: ${data.num_edges}\n` +
        `Is DAG: ${data.is_dag ? "Yes" : "No"}`;

      alert(message);
    } catch (error) {
      alert("Error submitting pipeline: " + error.message);
    }
  }, [nodes, edges]);

  return (
    <div className="d-flex align-items-center justify-content-center">
      <button
        onClick={handleSubmit}
        className="text-white border border-white rounded-2"
        style={{
          background: "#6466f1",
          padding: "8px 16px",
          cursor: "pointer",
        }}
      >
        Submit
      </button>
    </div>
  );
};
