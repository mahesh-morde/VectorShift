// frontend/src/nodes/dateNode.js
import { useState, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const DateNode = ({ id, data }) => {
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    // Real-time clock logic
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handles = [
        { type: 'source', position: Position.Right, id: 'time' }
    ];

    return (
        <BaseNode id={id} data={data} label="Current Time" handles={handles}>
            <div style={{ fontSize: '18px', fontWeight: 'bold', textAlign: 'center' }}>
                {time}
            </div>
            <div style={{ fontSize: '10px', color: 'var(--text-secondary)', textAlign: 'center' }}>
                {new Date().toLocaleDateString()}
            </div>
        </BaseNode>
    );
};