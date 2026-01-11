import { Handle, Position } from 'reactflow';

export const BaseNode = ({ id, data, type, label, children, handles = [] }) => {
    return (
        <div className="base-node">
            <div className="base-node-title">
                {label}
            </div>

            <div className="base-node-content">
                {children}
            </div>
            {handles.map((handle, index) => (
                <Handle
                    key={index}
                    type={handle.type}
                    position={handle.position}
                    id={`${id}-${handle.id}`}
                    style={handle.style || {}}
                    className="custom-handle"
                />
            ))}
        </div>
    );
};