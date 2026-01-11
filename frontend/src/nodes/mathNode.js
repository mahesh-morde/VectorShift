// frontend/src/nodes/mathNode.js
import { useState, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const MathNode = ({ id, data }) => {
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [op, setOp] = useState('add');
    const [result, setResult] = useState(0);

    // The logic that "actually works"
    useEffect(() => {
        let r = 0;
        const n1 = parseFloat(num1) || 0;
        const n2 = parseFloat(num2) || 0;

        if (op === 'add') r = n1 + n2;
        if (op === 'sub') r = n1 - n2;
        if (op === 'mul') r = n1 * n2;
        if (op === 'div') r = n2 !== 0 ? n1 / n2 : 'Err';

        setResult(r);
    }, [num1, num2, op]);

    const handles = [
        { type: 'target', position: Position.Left, id: 'in1', style: { top: '30%' } },
        { type: 'target', position: Position.Left, id: 'in2', style: { top: '60%' } },
        { type: 'source', position: Position.Right, id: 'result' }
    ];

    return (
        <BaseNode id={id} data={data} label="Math Operator" handles={handles}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <div style={{ display: 'flex', gap: '5px' }}>
                    <input
                        type="number"
                        value={num1}
                        onChange={(e) => setNum1(e.target.value)}
                        className="nodrag"
                        style={{ width: '40px' }}
                    />
                    <select
                        value={op}
                        onChange={(e) => setOp(e.target.value)}
                        className="nodrag"
                    >
                        <option value="add">+</option>
                        <option value="sub">-</option>
                        <option value="mul">×</option>
                        <option value="div">÷</option>
                    </select>
                    <input
                        type="number"
                        value={num2}
                        onChange={(e) => setNum2(e.target.value)}
                        className="nodrag"
                        style={{ width: '40px' }}
                    />
                </div>
                <div style={{ fontWeight: 'bold', textAlign: 'center', marginTop: '5px', color: 'var(--primary)' }}>
                    Result: {result}
                </div>
            </div>
        </BaseNode>
    );
};