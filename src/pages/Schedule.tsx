
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Plus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface StudySession {
  date: Date;
  title: string;
  completed: boolean;
}

export default function Schedule() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [sessions, setSessions] = useState<StudySession[]>([]);

  useEffect(() => {
    // Load saved sessions from localStorage
    const savedSessions = localStorage.getItem('studySessions');
    if (savedSessions) {
      setSessions(JSON.parse(savedSessions).map((session: any) => ({
        ...session,
        date: new Date(session.date)
      })));
    }
  }, []);

  const handleAddEvent = () => {
    if (!date) {
      toast.error("Please select a date first");
      return;
    }

    const newSession: StudySession = {
      date: date,
      title: `Study Session on ${date.toLocaleDateString()}`,
      completed: false
    };

    const updatedSessions = [...sessions, newSession];
    setSessions(updatedSessions);
    localStorage.setItem('studySessions', JSON.stringify(updatedSessions));
    toast.success(`Study session scheduled for ${date.toLocaleDateString()}`);
  };

  const toggleSessionComplete = (index: number) => {
    const updatedSessions = sessions.map((session, i) => {
      if (i === index) {
        return { ...session, completed: !session.completed };
      }
      return session;
    });
    setSessions(updatedSessions);
    localStorage.setItem('studySessions', JSON.stringify(updatedSessions));
    toast.success(updatedSessions[index].completed ? "Session marked as completed" : "Session marked as incomplete");
  };

  return (
    <div className="container py-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Study Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </div>
            <div className="space-y-4">
              <h3 className="font-medium">Selected Date: {date?.toLocaleDateString()}</h3>
              <Button 
                className="w-full flex items-center gap-2" 
                onClick={handleAddEvent}
              >
                <Plus className="h-4 w-4" />
                Add Study Session
              </Button>
              
              <div className="space-y-2 mt-4">
                <h4 className="font-medium">Scheduled Sessions:</h4>
                {sessions.length > 0 ? (
                  sessions.map((session, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-3 bg-muted rounded-lg"
                    >
                      <div>
                        <p className={`font-medium ${session.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {session.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {session.date.toLocaleDateString()}
                        </p>
                      </div>
                      <Button
                        variant={session.completed ? "outline" : "default"}
                        size="sm"
                        onClick={() => toggleSessionComplete(index)}
                      >
                        {session.completed ? 'Undo Complete' : 'Mark Complete'}
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">No sessions scheduled yet.</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
