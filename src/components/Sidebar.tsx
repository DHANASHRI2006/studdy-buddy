
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight, Home, BookOpen, BarChart3, Calendar, MessageSquare, Settings, Star, BookMarked } from "lucide-react";

interface NavItem {
  title: string;
  icon: React.ElementType;
  path: string;
}

const navItems: NavItem[] = [
  { title: "Dashboard", icon: Home, path: "/" },
  { title: "Courses", icon: BookOpen, path: "/courses" },
  { title: "Study Chat", icon: MessageSquare, path: "/chat" },
  { title: "Progress", icon: BarChart3, path: "/progress" },
  { title: "Schedule", icon: Calendar, path: "/schedule" },
  { title: "Saved", icon: BookMarked, path: "/saved" },
  { title: "Favorites", icon: Star, path: "/favorites" },
  { title: "Settings", icon: Settings, path: "/settings" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className={`${
        collapsed ? "w-16" : "w-64"
      } transition-all duration-300 border-r bg-background h-screen fixed left-0 top-0 z-40`}
    >
      <div className="flex flex-col h-full">
        <div className="h-16 border-b flex items-center justify-between px-4">
          {!collapsed && (
            <div className="font-bold text-xl">
              <span className="text-study-primary">Study</span>
              <span className="text-study-secondary">Buddy</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </Button>
        </div>
        <ScrollArea className="flex-1 py-4">
          <div className="space-y-1 px-2">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant={location.pathname === item.path ? "secondary" : "ghost"}
                className={`w-full justify-start ${
                  collapsed ? "px-2" : "px-4"
                }`}
                onClick={() => navigate(item.path)}
              >
                <item.icon className={`h-5 w-5 ${location.pathname === item.path ? "text-study-primary" : ""}`} />
                {!collapsed && <span className="ml-2">{item.title}</span>}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
