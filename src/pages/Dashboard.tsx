
import { ProgressStats } from "@/components/dashboard/ProgressStats";
import { StudyRecommendation } from "@/components/dashboard/StudyRecommendation";
import { SubjectCard, Subject } from "@/components/subjects/SubjectCard";
import { Button } from "@/components/ui/button";
import { PlusCircle, ArrowRight, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState, useEffect } from "react";

interface Recommendation {
  id: string;
  title: string;
  subject: string;
  time: string;
  reason: string;
  type: "lesson" | "practice" | "revision";
  path: string;
}

interface CompletionStatus {
  [userId: string]: {
    [subjectId: string]: number; // progress percentage
  };
}

// Sample student completion data
const studentCompletions: CompletionStatus = {
  "student1": {
    "math-101": 65,
    "cs-101": 42,
    "bio-101": 78,
    "phys-101": 23,
  },
  "student2": {
    "math-101": 32,
    "cs-101": 54,
    "bio-101": 91,
    "phys-101": 45,
  },
};

const recommendations: Recommendation[] = [
  {
    id: "rec1",
    title: "Introduction to Machine Learning",
    subject: "Computer Science",
    time: "45 min",
    reason: "Based on your recent interest in AI",
    type: "lesson",
    path: "/courses/cs-101/lessons/intro-ml",
  },
  {
    id: "rec2",
    title: "Practice Algebra Equations",
    subject: "Mathematics",
    time: "20 min",
    reason: "You're close to mastering this topic",
    type: "practice",
    path: "/courses/math-101/practice/algebra",
  },
  {
    id: "rec3",
    title: "Revise Photosynthesis Concepts",
    subject: "Biology",
    time: "30 min",
    reason: "Your test is scheduled in 3 days",
    type: "revision",
    path: "/courses/bio-101/revision/photosynthesis",
  },
];

const subjects: Subject[] = [
  {
    id: "math-101",
    name: "Mathematics",
    icon: "/placeholder.svg",
    description: "Algebra, Calculus, and Statistics fundamentals",
    progress: 65,
    color: "bg-blue-600",
    totalLessons: 24,
    completedLessons: 16,
    estimatedTime: "2h remaining",
  },
  {
    id: "cs-101",
    name: "Computer Science",
    icon: "/placeholder.svg",
    description: "Programming, Algorithms, and Data Structures",
    progress: 42,
    color: "bg-study-primary",
    totalLessons: 30,
    completedLessons: 13,
    estimatedTime: "4h remaining",
  },
  {
    id: "bio-101",
    name: "Biology",
    icon: "/placeholder.svg",
    description: "Cells, Genetics, and Human Physiology",
    progress: 78,
    color: "bg-green-600",
    totalLessons: 18,
    completedLessons: 14,
    estimatedTime: "1h remaining",
  },
  {
    id: "phys-101",
    name: "Physics",
    icon: "/placeholder.svg",
    description: "Mechanics, Thermodynamics, and Electromagnetism",
    progress: 23,
    color: "bg-orange-600",
    totalLessons: 20,
    completedLessons: 5,
    estimatedTime: "5h remaining",
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [viewingStudentId, setViewingStudentId] = useState<string | null>(null);

  useEffect(() => {
    setUserRole(localStorage.getItem("userRole") || "student");
    setUserName(localStorage.getItem("userName") || "User");
  }, []);

  const handleAddNewCourse = () => {
    if (userRole === "teacher") {
      toast.info("Opening course creation form");
      // Here we would navigate to a course creation form in a real app
    } else {
      toast.error("Only teachers can add new courses");
    }
  };

  const handleViewAllCourses = () => {
    navigate("/courses");
  };

  // Function to update subject progress for the selected student
  const getSubjectsWithStudentProgress = (studentId: string) => {
    const studentData = studentCompletions[studentId] || {};
    
    return subjects.map(subject => ({
      ...subject,
      progress: studentData[subject.id] || 0,
      // Calculate completed lessons based on progress percentage
      completedLessons: Math.round((studentData[subject.id] || 0) / 100 * subject.totalLessons)
    }));
  };

  // For teacher view of student progress
  const [selectedStudentSubjects, setSelectedStudentSubjects] = useState<Subject[]>([]);

  // Switch between students for teacher view
  const handleSwitchStudent = (studentId: string) => {
    setViewingStudentId(studentId);
    setSelectedStudentSubjects(getSubjectsWithStudentProgress(studentId));
  };

  return (
    <div className="container py-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {userRole === "teacher" 
            ? "Teacher Dashboard" 
            : `Welcome back, ${userName || "Student"}!`}
        </h1>
        <p className="text-muted-foreground">
          {userRole === "teacher" 
            ? "Monitor student progress and manage courses" 
            : "Continue your learning journey. Here's your overview for today."}
        </p>
      </div>

      {userRole === "teacher" && (
        <div className="flex gap-4">
          <Button 
            variant={viewingStudentId === "student1" ? "default" : "outline"}
            onClick={() => handleSwitchStudent("student1")}
            className="flex gap-2"
          >
            <Users className="h-4 w-4" />
            Student 1
          </Button>
          <Button 
            variant={viewingStudentId === "student2" ? "default" : "outline"}
            onClick={() => handleSwitchStudent("student2")}
            className="flex gap-2"
          >
            <Users className="h-4 w-4" />
            Student 2
          </Button>
        </div>
      )}

      {userRole === "student" && <ProgressStats />}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">
              {userRole === "teacher" && viewingStudentId
                ? `Courses for ${viewingStudentId === "student1" ? "Student 1" : "Student 2"}`
                : "Your Courses"}
            </h2>
            {userRole === "teacher" && (
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-1"
                onClick={handleAddNewCourse}
              >
                <PlusCircle className="h-4 w-4" />
                Add New Course
              </Button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {userRole === "teacher" && viewingStudentId 
              ? selectedStudentSubjects.map((subject) => (
                  <SubjectCard 
                    key={subject.id} 
                    subject={subject}
                  />
                ))
              : subjects.map((subject) => (
                  <SubjectCard 
                    key={subject.id} 
                    subject={subject}
                  />
                ))
            }
          </div>
          <Button 
            variant="link" 
            className="mt-4 gap-1" 
            size="sm"
            onClick={handleViewAllCourses}
          >
            View all courses
            <ArrowRight className="h-3 w-3" />
          </Button>
        </div>

        <div>
          <StudyRecommendation recommendations={recommendations} />
        </div>
      </div>
    </div>
  );
}
