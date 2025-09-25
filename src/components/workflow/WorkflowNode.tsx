import { Handle, Position } from '@xyflow/react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Globe, 
  Mail, 
  MessageCircle, 
  Webhook, 
  Database, 
  Brain,
  Settings,
  MoreHorizontal,
  Play
} from 'lucide-react';

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

export const WorkflowNode = ({ data }: { data: any }) => {
  const IconComponent = getIcon(data.icon);

  return (
    <Card className="min-w-[250px] bg-workflow-node border-border hover:border-primary/50 transition-all duration-200 hover:shadow-lg">
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 !bg-workflow-connection border-2 border-background"
      />
      
      <div className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div 
            className="p-2 rounded-lg"
            style={{ backgroundColor: data.color, opacity: 0.1 }}
          >
            <IconComponent 
              className="w-5 h-5" 
              style={{ color: data.color }}
            />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">{data.name}</h3>
            <p className="text-sm text-muted-foreground">{data.description}</p>
          </div>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-2 mb-3">
          <Badge variant="outline" className="text-xs">
            {data.type}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Settings className="w-3 h-3 mr-1" />
            Configure
          </Button>
          <Button size="sm" className="bg-gradient-primary">
            <Play className="w-3 h-3 mr-1" />
            Test
          </Button>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 !bg-workflow-connection border-2 border-background"
      />
    </Card>
  );
};