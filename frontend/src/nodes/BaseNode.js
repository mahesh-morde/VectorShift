// frontend/src/nodes/BaseNode.js
import { Handle, Position } from 'reactflow';

export const BaseNode = ({ id, data, type, label, children, handles = [] }) => {
    return (
        <div className="base-node">
            {/* Node Title */}
            <div className="base-node-title">
                {label}
            </div>

            {/* Node Content (Inputs, Dropdowns, etc.) */}
            <div className="base-node-content">
                {children}
            </div>

            {/* Render Handles Dynamically */}
            {handles.map((handle, index) => (
                <Handle
                    key={index}
                    type={handle.type} // "source" or "target"
                    position={handle.position} // Position.Left or Position.Right
                    id={`${id}-${handle.id}`}
                    style={handle.style || {}}
                    className="custom-handle"
                />
            ))}
        </div>
    );
};