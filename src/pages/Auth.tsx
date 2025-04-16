
import { useState } from "react";
import { SignIn } from "@/components/auth/SignIn";
import { SignUp } from "@/components/auth/SignUp";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function Auth() {
  const [showSignIn, setShowSignIn] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignIn = (email: string, password: string, role: "student" | "teacher") => {
    // In a real app, this would call an authentication API
    console.log("Sign in:", email, password, role);
    
    // For demonstration, we'll just simulate successful authentication
    toast({
      title: `Signed in successfully as ${role}`,
      description: "Welcome back to StudyBuddy!",
    });
    
    navigate("/");
  };

  const handleSignUp = (name: string, email: string, password: string, role: "student" | "teacher") => {
    // In a real app, this would call an API to create a new user
    console.log("Sign up:", name, email, password, role);
    
    toast({
      title: "Account created",
      description: `Your StudyBuddy ${role} account has been created successfully!`,
    });
    
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left side - illustration/branding */}
        <div className="md:w-1/2 bg-study-primary p-8 flex flex-col justify-center items-center text-white">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">
              Smart Study<span className="text-study-accent">Buddy</span>
            </h1>
            <p className="text-lg mb-8">
              Your AI-powered personal tutor for adaptive, personalized learning
            </p>
            <div className="grid grid-cols-2 gap-4 text-center mb-8">
              <div className="p-4 bg-white/10 rounded-lg">
                <h3 className="font-bold text-study-accent text-lg">Personalized</h3>
                <p className="text-sm">Learning paths tailored to your style</p>
              </div>
              <div className="p-4 bg-white/10 rounded-lg">
                <h3 className="font-bold text-study-accent text-lg">Adaptive</h3>
                <p className="text-sm">AI that evolves with your progress</p>
              </div>
              <div className="p-4 bg-white/10 rounded-lg">
                <h3 className="font-bold text-study-accent text-lg">Interactive</h3>
                <p className="text-sm">Engaging learning experience</p>
              </div>
              <div className="p-4 bg-white/10 rounded-lg">
                <h3 className="font-bold text-study-accent text-lg">Real-time</h3>
                <p className="text-sm">Immediate feedback and assistance</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right side - authentication form */}
        <div className="md:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {showSignIn ? (
              <SignIn onSwitch={() => setShowSignIn(false)} onSubmit={handleSignIn} />
            ) : (
              <SignUp onSwitch={() => setShowSignIn(true)} onSubmit={handleSignUp} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
