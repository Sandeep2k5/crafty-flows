import { useState } from 'react';
import { ToolSidebar } from './ToolSidebar';
import { WorkflowCanvas } from './WorkflowCanvas';
import { DndContext, DragEndEvent } from '@dnd-kit/core';

export interface WorkflowTool {
  id: string;
  name: string;
  type: 'api' | 'email' | 'whatsapp' | 'webhook' | 'database' | 'ai';
  icon: string;
  description: string;
  color: string;
}

export const WorkflowOrchestrator = () => {
  const [workflowNodes, setWorkflowNodes] = useState([]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && over.id === 'workflow-canvas') {
      // Add new node to workflow
      const toolData = active.data.current as WorkflowTool;
      const newNode = {
        id: `${toolData.type}-${Date.now()}`,
        type: 'workflow',
        position: { x: 100, y: 100 },
        data: toolData,
      };
      
      setWorkflowNodes(prev => [...prev, newNode]);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex h-screen bg-background">
        <ToolSidebar />
        <WorkflowCanvas nodes={workflowNodes} />
      </div>
    </DndContext>
  );
};