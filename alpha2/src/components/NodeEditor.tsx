import { useCallback, useState, useRef } from 'react';
import {
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    Handle,
    Position,
    ConnectionLineType
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

//

const initialNodes = [
    // { id: '1', position: { x: 0, y: 0 }, data: { label: '1', inputs: [0], outputs: [0] } },
    // { id: '2', position: { x: 0, y: 100 }, data: { label: '2', inputs: [0], outputs: [0] } },
];

const initialEdges = [
  // { id: 'e1-2', source: '1', target: '2' }
];

// MOVE
function EditableNode({ data , selected }) {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(data.label);

    const onDoubleClick = () => setIsEditing(true);
    const onBlur = () => {
        setIsEditing(false);
        data.label = text;
    };

    // Node height is dynamic; we can use ref to get height if needed
    const nodeRef = useRef(null);

    return (


        <div
      ref={nodeRef}
      onDoubleClick={onDoubleClick}
      style={{
        height: "15px",
        // background: '#333',
        color: '#fff',
        background: selected ? '#444' : '#333',
        border: selected ? '1px solid #4fc3f7' : '1px solid #555',
        padding: '10px',
        borderRadius: '5px',
        minWidth: '40px',
        textAlign: 'left',
        cursor: 'pointer',
        fontFamily: 'monospace',
        fontSize: '16px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',  // vertically center content
      }}
    >
      {/* Input on */}

      
       <Handle
        type="target"
        position={Position.Left}
        id="input"
        style={{
          left: -8,                // shift outside node
          top: '50%',
          transform: 'translateY(-50%)',
          background: '#fff',
          width: 10,
          height: 10,
          borderRadius: '50%',
        }}
      />

      {/* Node text */}
      {isEditing ? (
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={onBlur}
          autoFocus
          style={{
            background: '#444',
            color: '#fff',
            border: 'none',
            outline: 'none',
            width: '100%',
            fontFamily: 'monospace',
            fontSize: '16px',
          }}
        />
      ) : (
        <div style={{ flex: 1 }}>{text}</div>
      )}

      {/* Output on */}
      <Handle
        type="source"
        position={Position.Right}
        id="output"
        style={{
          right: -8,               // shift outside node
          top: '50%',
          transform: 'translateY(-50%)',
          background: '#fff',
          width: 10,
          height: 10,
          borderRadius: '50%',
        }}
      />
    </div>
    );
}

export default function NodeEditor({
    nodes = [],
    edges = [],

    onDrop = (event)=>{},
    onDragOver = (event)=>{},

    onNodesChange = (event)=>{},
    onEdgesChange = (event)=>{},
    onConnect = (event)=>{}

}){
    return (
    <div
        style={{ flex: 1,  width: '70vw', height: '100%' }}
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <ReactFlow
    nodes={nodes}
    edges={edges}
    onNodesChange={onNodesChange}
    onEdgesChange={onEdgesChange}
    onConnect={onConnect}
    colorMode = "dark"
    handlepositions = "left-right"
    connectionLineType={ConnectionLineType.Straight} // ✅ use enum, wrapped in {}
    snapToGrid={true}    
    snapGrid={[20,20]}  
    // onPaneDoubleClick={handlePaneDoubleClick}
    nodeTypes={{ default: EditableNode }}>

    <Background
    gap={40}               // distance between grid lines
    size={0.25}               // thickness of grid lines
    color="#222"           // grid line color
    variant="lines"        // "lines" (default) or "dots"
  />

        </ReactFlow>
      </div>
      );
}