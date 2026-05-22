
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="text-center p-8 bg-gray-800 rounded-lg shadow-lg border border-cyan-700 max-w-md w-full">
        <h1 className="text-6xl font-bold mb-4 text-cyan-500">404</h1>
        <p className="text-xl text-gray-300 mb-8">The page you're looking for doesn't exist</p>
        <Button 
          onClick={() => window.location.href = "/"} 
          className="bg-cyan-600 hover:bg-cyan-700"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
