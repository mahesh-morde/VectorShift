import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TransformNode = ({ id, data }) => {
    const [input, setInput] = useState('');
    const [mode, setMode] = useState('upper');

    const transformed = mode === 'upper' ? input.toUpperCase() : input.toLowerCase();

    const handles = [
        { type: 'target', position: Position.Left, id: 'in' },
        { type: 'source', position: Position.Right, id: 'out' }
    ];

    return (
        <BaseNode id={id} data={data} label="Text Transform" handles={handles}>
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type here..."
                className="nodrag"
                style={{ height: '40px' }}
            />
            <select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="nodrag"
                style={{ margin: '5px 0' }}
            >
                <option value="upper">Uppercase</option>
                <option value="lower">Lowercase</option>
            </select>
            <div className="base-node-preview">
                <strong>Preview:</strong> {transformed}
            </div>
        </BaseNode>
    );
};