
// Common type definitions for the application

export interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
}

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

export interface Recommendation {
  id: string;
  title: string;
  subject: string;
  time: string;
  reason: string;
  type: "lesson" | "practice" | "revision";
  path: string;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface StudySession {
  id: string;
  subject: string;
  duration: number; // in minutes
  date: Date;
  completed: boolean;
}
