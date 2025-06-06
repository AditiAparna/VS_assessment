// draggableNode.js

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className={type}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        style={{ 
          cursor: 'grab', 
          minWidth: '80px', 
          height: '80px',
          width: 'auto',
          padding: '0px 5px',
          display: 'flex', 
          alignItems: 'center', 
          borderRadius: '8px',
          backgroundColor: '#f6f6f6',
          justifyContent: 'center', 
          flexDirection: 'column',
          border: '2px solid #f4f5f6'
        }} 
        draggable
      >
          <span style={{ color: '#282a34', fontWeight: 600 }}>{label}</span>
      </div>
    );
  };
  