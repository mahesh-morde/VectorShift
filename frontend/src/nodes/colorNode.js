import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const ColorNode = ({ id, data }) => {
    const [color, setColor] = useState('#ff0000');

    const handles = [
        { type: 'source', position: Position.Right, id: 'color' }
    ];

    return (
        <BaseNode id={id} data={data} label="Color Picker" handles={handles}>
            <div style={{
                width: '100%',
                height: '30px',
                backgroundColor: color,
                borderRadius: '4px',
                marginBottom: '5px'
            }} />
            <label>
                Pick:
                <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="nodrag"
                    style={{ border: 'none', background: 'none', height: '25px', width: '40px' }}
                />
            </label>
        </BaseNode>
    );
};