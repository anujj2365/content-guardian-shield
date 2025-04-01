
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-white dark:bg-gray-800 p-3 rounded-full shadow-md">
            <Shield className="h-10 w-10 text-guardian-primary" />
          </div>
        </div>
        <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">404</h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild className="bg-guardian-primary hover:bg-guardian-accent">
          <Link to="/" className="flex items-center gap-2">
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
