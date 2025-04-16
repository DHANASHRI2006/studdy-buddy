import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Timer, ArrowRight, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Recommendation {
  id: string;
  title: string;
  subject: string;
  time: string;
  reason: string;
  type: "lesson" | "practice" | "revision";
  path: string;
}

interface StudyRecommendationProps {
  recommendations: Recommendation[];
}

export function StudyRecommendation({ recommendations }: StudyRecommendationProps) {
  const navigate = useNavigate();
  
  const getIcon = (type: string) => {
    switch (type) {
      case "lesson":
        return <Brain className="h-5 w-5" />;
      case "practice":
        return <Timer className="h-5 w-5" />;
      case "revision":
        return <BookOpen className="h-5 w-5" />;
      default:
        return <Brain className="h-5 w-5" />;
    }
  };
  
  const handleStartRecommendation = (path: string) => {
    navigate(path);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Recommended for you</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((item) => (
            <div 
              key={item.id} 
              className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted cursor-pointer transition-colors"
              onClick={() => handleStartRecommendation(item.path)}
            >
              <div className="h-10 w-10 rounded-full bg-study-secondary flex items-center justify-center text-white">
                {getIcon(item.type)}
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{item.title}</h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{item.subject}</span>
                  <span>•</span>
                  <span>{item.time}</span>
                </div>
                <p className="text-xs mt-1 text-study-primary">{item.reason}</p>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  handleStartRecommendation(item.path);
                }}
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
