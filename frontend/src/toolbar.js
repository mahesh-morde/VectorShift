// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div className="toolbar">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />

                <DraggableNode type='math' label='Math' />
                <DraggableNode type='date' label='Date' />
                <DraggableNode type='transform' label='Transform' />
                <DraggableNode type='counter' label='Counter' />
                <DraggableNode type='color' label='Color' />
            </div>
        </div>
    );
};
