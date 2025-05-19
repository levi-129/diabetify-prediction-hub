
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Activity, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-lg border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-medical-600" />
          <span className="font-medium text-lg">DiabetesPredict</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-1">
          <Link to="/">
            <Button 
              variant={location.pathname === "/" ? "default" : "ghost"} 
              className={cn(
                "flex items-center gap-2",
                location.pathname === "/" && "bg-medical-600 hover:bg-medical-700"
              )}
            >
              <Home className="h-4 w-4" />
              Home
            </Button>
          </Link>
          <Link to="/predict">
            <Button 
              variant={location.pathname === "/predict" ? "default" : "ghost"}
              className={cn(
                "flex items-center gap-2",
                location.pathname === "/predict" && "bg-medical-600 hover:bg-medical-700"
              )}
            >
              <Activity className="h-4 w-4" />
              Predict
            </Button>
          </Link>
        </div>
        
        <div className="md:hidden">
          <div className="flex space-x-1">
            <Link to="/">
              <Button 
                variant={location.pathname === "/" ? "default" : "ghost"} 
                size="sm"
                className={cn(
                  location.pathname === "/" && "bg-medical-600 hover:bg-medical-700"
                )}
              >
                <Home className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/predict">
              <Button 
                variant={location.pathname === "/predict" ? "default" : "ghost"} 
                size="sm"
                className={cn(
                  location.pathname === "/predict" && "bg-medical-600 hover:bg-medical-700"
                )}
              >
                <Activity className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
