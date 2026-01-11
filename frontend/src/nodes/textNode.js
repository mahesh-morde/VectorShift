// frontend/src/nodes/textNode.js
import { useState, useEffect, useRef } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [handles, setHandles] = useState([]);
  const textareaRef = useRef(null);

  // 1. Logic to auto-resize the textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [currText]);

  // 2. Logic to extract variables like {{name}} and create handles
  useEffect(() => {
    // Regex to find text inside {{ }}
    const regex = /{{(.*?)}}/g;
    const matches = [];
    let match;

    while ((match = regex.exec(currText)) !== null) {
      // Clean up variable name (remove spaces)
      const varName = match[1].trim();
      if (varName && !matches.includes(varName)) {
        matches.push(varName);
      }
    }

    // Create handles: One fixed output (Right) + Dynamic inputs (Left)
    const newHandles = [
      // Output handle (Right side)
      {
        type: 'source',
        position: Position.Right,
        id: 'output'
      },
      // Dynamic input handles (Left side) based on variables
      ...matches.map((varName, index) => ({
        type: 'target',
        position: Position.Left,
        id: varName,
        style: { top: `${(index + 1) * 30 + 40}px` } // Simple spacing logic
      }))
    ];

    setHandles(newHandles);
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      label="Text"
      handles={handles}
    >
      <label>
        Text:
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={handleTextChange}
          className="nodrag"
          style={{
            height: 'auto', // Handled by useEffect, but good initial state
            minHeight: '40px',
            resize: 'none',
            overflow: 'hidden',
          }}
        />
      </label>

      {/* Visual hint for variables */}
      <div style={{ fontSize: '10px', color: '#666', marginTop: '5px' }}>
        Tip: Type <code>{'{{var}}'}</code> to create inputs.
      </div>
    </BaseNode>
  );
};