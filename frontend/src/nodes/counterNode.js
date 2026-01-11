// frontend/src/nodes/counterNode.js
import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const CounterNode = ({ id, data }) => {
    const [count, setCount] = useState(0);

    const handles = [
        // ADDED THIS: A target handle on the left to accept connections
        { type: 'target', position: Position.Left, id: 'input' },
        // Existing source handle on the right
        { type: 'source', position: Position.Right, id: 'count' }
    ];

    return (
        <BaseNode id={id} data={data} label="Counter" handles={handles}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                <button onClick={() => setCount(count - 1)} className="nodrag">-</button>
                <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{count}</span>
                <button onClick={() => setCount(count + 1)} className="nodrag">+</button>
            </div>
            <div style={{ fontSize: '10px', color: 'var(--text-secondary)', textAlign: 'center', marginTop: '5px' }}>
                Connect here ↖
            </div>
        </BaseNode>
    );
};