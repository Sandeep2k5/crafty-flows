import { useCallback } from 'react';
import * as React from 'react';
import { useDroppable } from '@dnd-kit/core';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  Connection,
  Edge,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { WorkflowNode } from './WorkflowNode';
import { Plus, Play, Save, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const nodeTypes = {
  workflow: WorkflowNode,
};

interface WorkflowCanvasProps {
  nodes: any[];
}

export const WorkflowCanvas = ({ nodes }: WorkflowCanvasProps) => {
  const [reactFlowNodes, setNodes, onNodesChange] = useNodesState(nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const { setNodeRef } = useDroppable({
    id: 'workflow-canvas',
  });

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  // Update nodes when props change
  React.useEffect(() => {
    setNodes(nodes);
  }, [nodes, setNodes]);

  return (
    <div className="flex-1 flex flex-col bg-workflow-canvas">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-foreground">Workflow Canvas</h1>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {reactFlowNodes.length} nodes
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button size="sm" className="bg-gradient-primary">
              <Play className="w-4 h-4 mr-2" />
              Run Workflow
            </Button>
            <Button variant="ghost" size="sm">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div ref={setNodeRef} className="flex-1 relative">
        <ReactFlow
          nodes={reactFlowNodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          className="bg-workflow-canvas"
          connectionLineStyle={{ 
            stroke: 'hsl(var(--workflow-connection))', 
            strokeWidth: 2 
          }}
          defaultEdgeOptions={{
            style: { 
              stroke: 'hsl(var(--workflow-connection))', 
              strokeWidth: 2 
            },
          }}
        >
          <Background 
            variant={BackgroundVariant.Dots} 
            gap={20} 
            size={1}
            color="hsl(var(--border))"
          />
          <Controls 
            className="bg-card border border-border rounded-lg"
            showInteractive={false}
          />
          <MiniMap 
            className="bg-card border border-border rounded-lg"
            nodeColor="hsl(var(--primary))"
            maskColor="hsl(var(--background) / 0.8)"
          />
        </ReactFlow>
        
        {/* Empty State */}
        {reactFlowNodes.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center max-w-md">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Plus className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Start Building Your Workflow
              </h3>
              <p className="text-muted-foreground mb-4">
                Drag tools from the sidebar to create your automated workflow. 
                Connect nodes to define the flow of data and actions.
              </p>
              <Badge variant="outline" className="bg-primary/5 border-primary/20">
                Drag & Drop to Begin
              </Badge>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};