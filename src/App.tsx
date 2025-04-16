
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { AuthLayout } from "./layouts/AuthLayout";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import CourseDetails from "./pages/CourseDetails";
import Schedule from "./pages/Schedule";
import Saved from "./pages/Saved";
import Favorites from "./pages/Favorites";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Initial redirect */}
          <Route path="/" element={<Index />} />
          
          {/* Auth route */}
          <Route 
            path="/auth" 
            element={
              <AuthLayout>
                <Auth />
              </AuthLayout>
            } 
          />

          {/* Main application routes */}
          <Route 
            path="/dashboard" 
            element={
              <MainLayout>
                <Dashboard />
              </MainLayout>
            } 
          />
          
          <Route 
            path="/chat" 
            element={
              <MainLayout>
                <Chat />
              </MainLayout>
            } 
          />
          
          <Route 
            path="/courses" 
            element={
              <MainLayout>
                <Dashboard />
              </MainLayout>
            } 
          />
          
          <Route 
            path="/courses/:id" 
            element={
              <MainLayout>
                <CourseDetails />
              </MainLayout>
            } 
          />
          
          <Route 
            path="/schedule" 
            element={
              <MainLayout>
                <Schedule />
              </MainLayout>
            } 
          />
          
          <Route 
            path="/saved" 
            element={
              <MainLayout>
                <Saved />
              </MainLayout>
            } 
          />
          
          <Route 
            path="/favorites" 
            element={
              <MainLayout>
                <Favorites />
              </MainLayout>
            } 
          />
          
          <Route 
            path="/settings" 
            element={
              <MainLayout>
                <Settings />
              </MainLayout>
            } 
          />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
