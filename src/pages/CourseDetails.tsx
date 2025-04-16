
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, FileText, BookOpen, Download, Link, Users, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect } from "react";

interface CompletionData {
  userId: string;
  userName: string;
  completedAt: string;
}

export default function CourseDetails() {
  const { id } = useParams();
  const [completions, setCompletions] = useState<CompletionData[]>([]);
  const [userRole, setUserRole] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    // In a real app, this would come from your backend
    setUserRole(localStorage.getItem("userRole") || "student");
    setUserName(localStorage.getItem("userName") || "");

    // Simulate fetching completion data
    const storedCompletions = JSON.parse(localStorage.getItem(`course-${id}-completions`) || "[]");
    setCompletions(storedCompletions);
    
    // Check if current user has completed the course
    const hasCompleted = storedCompletions.some(
      (completion: CompletionData) => completion.userName === userName
    );
    setIsCompleted(hasCompleted);
  }, [id, userName]);

  // For demo purposes, this would come from an API in a real app
  const courseData = {
    id,
    title: "Introduction to Programming",
    description: "Learn the basics of programming",
    videos: [
      { id: 1, title: "Getting Started", duration: "10:00", url: "https://example.com/video1" },
      { id: 2, title: "Variables & Data Types", duration: "15:00", url: "https://example.com/video2" },
    ],
    notes: [
      { id: 1, title: "Lecture Notes 1", format: "PDF", url: "https://example.com/notes1" },
      { id: 2, title: "Code Examples", format: "PDF", url: "https://example.com/notes2" },
    ],
    quizzes: [
      { id: 1, title: "Basic Concepts Quiz", questions: ["What is a variable?", "What is a function?"] },
      { id: 2, title: "Variables Quiz", questions: ["What types of variables exist?", "What is scope?"] },
    ]
  };

  const handleCopyLink = () => {
    const courseLink = window.location.href;
    navigator.clipboard.writeText(courseLink);
    toast.success("Course link copied to clipboard!");
  };

  const handleDownload = (url: string, title: string) => {
    // In a real app, this would trigger a file download
    window.open(url, '_blank');
    toast.success(`Downloading ${title}`);
  };

  const handleWatchVideo = (url: string) => {
    window.open(url, '_blank');
    toast.success("Opening video in new tab");
  };

  const handleStartQuiz = (quizId: number) => {
    // In a real app, this would navigate to the quiz page
    toast.success("Starting quiz...");
  };

  const handleMarkAsComplete = () => {
    const completion: CompletionData = {
      userId: userName,
      userName: userName,
      completedAt: new Date().toISOString(),
    };

    const updatedCompletions = [...completions, completion];
    localStorage.setItem(`course-${id}-completions`, JSON.stringify(updatedCompletions));
    setCompletions(updatedCompletions);
    setIsCompleted(true);
    toast.success("Course marked as completed!");
  };

  return (
    <div className="container py-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{courseData.title}</h1>
          <p className="text-muted-foreground">{courseData.description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleCopyLink}>
            <Link className="h-4 w-4 mr-2" />
            Share Course
          </Button>
          {userRole === "student" && !isCompleted && (
            <Button onClick={handleMarkAsComplete}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark as Complete
            </Button>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Videos Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="h-5 w-5" />
              Course Videos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {courseData.videos.map((video) => (
                <div key={video.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">{video.title}</p>
                    <p className="text-sm text-muted-foreground">{video.duration}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => handleWatchVideo(video.url)}
                  >
                    Watch
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notes Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Course Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {courseData.notes.map((note) => (
                <div key={note.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">{note.title}</p>
                    <p className="text-sm text-muted-foreground">{note.format}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => handleDownload(note.url, note.title)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quizzes Section */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Quizzes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4">
              {courseData.quizzes.map((quiz) => (
                <div key={quiz.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <p className="font-medium">{quiz.title}</p>
                  <Button onClick={() => handleStartQuiz(quiz.id)}>Start Quiz</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Completions Section (Teacher Only) */}
        {userRole === "teacher" && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Course Completions
              </CardTitle>
            </CardHeader>
            <CardContent>
              {completions.length > 0 ? (
                <div className="space-y-4">
                  {completions.map((completion, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">{completion.userName}</p>
                        <p className="text-sm text-muted-foreground">
                          Completed on {new Date(completion.completedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No students have completed this course yet.</p>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
