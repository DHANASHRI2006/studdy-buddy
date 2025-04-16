
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, Clock, Target, BookOpen, BadgePlus } from "lucide-react";

export function ProgressStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Study Streak</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="font-bold text-2xl">7 days</div>
            <div className="h-10 w-10 rounded-full bg-study-light flex items-center justify-center text-study-primary">
              <ArrowUp className="h-5 w-5" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Keep it up! 3 days until new badge</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Study Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="font-bold text-2xl">3.5 hours</div>
            <div className="h-10 w-10 rounded-full bg-study-light flex items-center justify-center text-study-primary">
              <Clock className="h-5 w-5" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">This week (30% more than last week)</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Completed Lessons</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="font-bold text-2xl">12</div>
            <div className="h-10 w-10 rounded-full bg-study-light flex items-center justify-center text-study-primary">
              <BookOpen className="h-5 w-5" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">8 more to reach your weekly goal</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Mastery Points</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="font-bold text-2xl">1,250</div>
            <div className="h-10 w-10 rounded-full bg-study-light flex items-center justify-center text-study-primary">
              <BadgePlus className="h-5 w-5" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Level 3 (250 points to Level 4)</p>
        </CardContent>
      </Card>
    </div>
  );
}
