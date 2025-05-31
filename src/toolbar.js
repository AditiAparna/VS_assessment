// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div style={{ padding: '10px' }}>
            <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='share' label='Share' />
                <DraggableNode type='radio' label='Radio' />
                <DraggableNode type='logicGate' label='Logic Gate' />
                <DraggableNode type='multiSelect' label='Multi Select' />
                <DraggableNode type='preview' label='Preview' />
            </div>
        </div>
    );
};
