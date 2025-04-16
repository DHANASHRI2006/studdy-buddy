import { Bell, Settings, User, Plus, ChevronDown, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CourseForm } from "@/components/courses/CourseForm";

export function Header() {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  
  useEffect(() => {
    setUserRole(localStorage.getItem("userRole") || "student");
    setUserName(localStorage.getItem("userName") || "User");
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    toast.success("Signed out successfully");
    navigate("/auth");
  };

  const handleAddCourse = () => {
    if (userRole === "teacher") {
      // The form will be shown through the Dialog component
    } else {
      toast.error("Only teachers can add new courses");
    }
  };

  return (
    <header className="border-b sticky top-0 z-30 bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <div 
            className="text-2xl font-bold text-study-primary cursor-pointer flex items-center"
            onClick={() => navigate("/")}
          >
            <span className="bg-study-primary text-white p-1 rounded-md mr-2">S</span>
            <span>Study</span>
            <span className="text-study-secondary">Buddy</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {userRole === "teacher" && (
            <CourseForm />
          )}
          <Button variant="ghost" size="icon" className="relative" onClick={() => toast.info("Coming soon: Notifications")}>
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-study-secondary text-[10px] font-bold text-white flex items-center justify-center">
              2
            </span>
          </Button>
          <Button variant="ghost" size="icon" onClick={() => navigate("/settings")}>
            <Settings className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 pr-1 pl-2 h-9">
                <Avatar className="h-7 w-7">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-study-secondary text-white">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start text-xs">
                  <span className="font-medium">{userName}</span>
                  <span className="text-muted-foreground capitalize">{userRole}</span>
                </div>
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/profile")}>
                Profile
              </DropdownMenuItem>
              {userRole === "teacher" && (
                <DropdownMenuItem onClick={() => navigate("/manage-courses")}>
                  Manage Courses
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => navigate("/settings")}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} className="text-red-500 flex gap-2">
                <LogOut className="h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
