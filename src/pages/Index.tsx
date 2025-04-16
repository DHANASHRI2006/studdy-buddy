
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in - for this demo we'll simulate a check
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/auth");
    }
  }, [navigate]);

  return null;
};

export default Index;
