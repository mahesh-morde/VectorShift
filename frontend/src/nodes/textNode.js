import { useState, useEffect, useRef } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [handles, setHandles] = useState([]);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [currText]);

  useEffect(() => {
    const regex = /{{(.*?)}}/g;
    const matches = [];
    let match;

    while ((match = regex.exec(currText)) !== null) {
      const varName = match[1].trim();
      if (varName && !matches.includes(varName)) {
        matches.push(varName);
      }
    }

    const newHandles = [
      {
        type: 'source',
        position: Position.Right,
        id: 'output'
      },
      ...matches.map((varName, index) => ({
        type: 'target',
        position: Position.Left,
        id: varName,
        style: { top: `${(index + 1) * 30 + 40}px` }
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
            height: 'auto',
            minHeight: '40px',
            resize: 'none',
            overflow: 'hidden',
          }}
        />
      </label>

      <div style={{ fontSize: '10px', color: '#666', marginTop: '5px' }}>
        Tip: Type <code>{'{{var}}'}</code> to create inputs.
      </div>
    </BaseNode>
  );
};