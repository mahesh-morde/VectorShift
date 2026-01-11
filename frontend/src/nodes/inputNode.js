import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handles = [
    { type: 'source', position: Position.Right, id: 'value' }
  ];

  return (
    <BaseNode id={id} data={data} label="Input" handles={handles}>
      <label>
        Name:
        <input
          type="text"
          value={currName}
          onChange={(e) => setCurrName(e.target.value)}
          className="nodrag"
        />
      </label>

      <label>
        Type:
        <select
          value={inputType}
          onChange={(e) => setInputType(e.target.value)}
          className="nodrag">
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </BaseNode>
  );
};