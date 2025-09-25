import { useDraggable } from '@dnd-kit/core';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { WorkflowTool } from './WorkflowOrchestrator';
import { 
  Globe, 
  Mail, 
  MessageCircle, 
  Webhook, 
  Database, 
  Brain,
  Zap,
  Settings,
  Search
} from 'lucide-react';

const tools: WorkflowTool[] = [
  {
    id: 'custom-api',
    name: 'Custom API',
    type: 'api',
    icon: 'Globe',
    description: 'Connect to any REST API endpoint',
    color: 'hsl(var(--primary))'
  },
  {
    id: 'email',
    name: 'Email',
    type: 'email', 
    icon: 'Mail',
    description: 'Send automated emails',
    color: 'hsl(var(--accent))'
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    type: 'whatsapp',
    icon: 'MessageCircle', 
    description: 'Send WhatsApp messages',
    color: '#25D366'
  },
  {
    id: 'webhook',
    name: 'Webhook',
    type: 'webhook',
    icon: 'Webhook',
    description: 'Trigger or receive webhooks',
    color: 'hsl(var(--destructive))'
  },
  {
    id: 'database',
    name: 'Database',
    type: 'database',
    icon: 'Database',
    description: 'Query and update databases',
    color: 'hsl(var(--muted-foreground))'
  },
  {
    id: 'ai-agent',
    name: 'AI Agent',
    type: 'ai',
    icon: 'Brain',
    description: 'AI-powered processing',
    color: 'hsl(var(--primary-glow))'
  }
];

const getIcon = (iconName: string) => {
  const icons = {
    Globe,
    Mail,
    MessageCircle,
    Webhook,
    Database,
    Brain
  };
  return icons[iconName as keyof typeof icons] || Globe;
};

const DraggableTool = ({ tool }: { tool: WorkflowTool }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: tool.id,
    data: tool
  });

  const IconComponent = getIcon(tool.icon);

  return (
    <Card
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`p-4 cursor-grab active:cursor-grabbing transition-all duration-200 hover:bg-workflow-node-hover border-border hover:border-primary/50 ${
        isDragging ? 'opacity-50 scale-95' : 'hover:scale-105'
      }`}
    >
      <div className="flex items-center gap-3">
        <div 
          className="p-2 rounded-lg"
          style={{ backgroundColor: tool.color, opacity: 0.1 }}
        >
          <IconComponent 
            className="w-5 h-5" 
            style={{ color: tool.color }}
          />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-foreground">{tool.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {tool.description}
          </p>
        </div>
      </div>
    </Card>
  );
};

export const ToolSidebar = () => {
  return (
    <div className="w-80 bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-6 h-6 text-primary" />
          <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Workflow Tools
          </h1>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search tools..."
            className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>
      
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Settings className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Integration Tools
            </span>
          </div>
          <Badge variant="outline" className="text-xs">
            Drag to canvas to use
          </Badge>
        </div>
        
        {tools.map((tool) => (
          <DraggableTool key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  );
};