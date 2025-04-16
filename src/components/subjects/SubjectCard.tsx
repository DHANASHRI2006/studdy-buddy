
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, CheckCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export interface Subject {
  id: string;
  name: string;
  icon: string;
  description: string;
  progress: number;
  color: string;
  totalLessons: number;
  completedLessons: number;
  estimatedTime: string;
}

interface SubjectCardProps {
  subject: Subject;
}

export function SubjectCard({ subject }: SubjectCardProps) {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    setUserRole(localStorage.getItem("userRole") || "student");
  }, []);

  // For students to mark lessons as complete
  const handleMarkAsComplete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (subject.progress < 100) {
      // In a real app this would update in a database
      toast.success(`Marked lesson as completed for ${subject.name}!`);
    } else {
      toast.info(`You've already completed all lessons for ${subject.name}.`);
    }
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardHeader className={`p-4 ${subject.color}`}>
        <div className="flex justify-between items-center">
          <div className="font-bold text-white text-xl">{subject.name}</div>
          <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
            <img 
              src={subject.icon} 
              alt={subject.name} 
              className="h-6 w-6"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder.svg";
              }}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground mb-4">{subject.description}</p>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span className="font-medium">{subject.progress}%</span>
          </div>
          <Progress value={subject.progress} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{subject.completedLessons} / {subject.totalLessons} lessons</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {subject.estimatedTime}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="w-full">
          <Button 
            variant="ghost" 
            className="w-full justify-between mb-2"
            onClick={() => navigate(`/courses/${subject.id}`)}
          >
            {userRole === "teacher" ? "View Course" : "Continue Learning"}
            <ArrowRight className="h-4 w-4" />
          </Button>
          
          {userRole === "student" && (
            <Button 
              variant="outline" 
              className="w-full flex items-center gap-2 justify-center"
              onClick={handleMarkAsComplete}
              disabled={subject.progress >= 100}
            >
              <CheckCircle className="h-4 w-4" />
              Mark Lesson Complete
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
