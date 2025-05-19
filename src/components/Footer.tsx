
import { Link } from "react-router-dom";
import { Activity } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t py-8 mt-auto">
      <div className="container flex flex-col items-center justify-center">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="h-6 w-6 text-medical-600" />
          <span className="font-medium text-lg">DiabetesPredict</span>
        </div>
        <p className="text-sm text-muted-foreground text-center mb-4">
          Early detection is key to managing diabetes. Our AI-powered platform helps you assess your risk.
        </p>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-medical-600 transition-colors">Home</Link>
          <Link to="/predict" className="hover:text-medical-600 transition-colors">Predict</Link>
          <span>© {new Date().getFullYear()} DiabetesPredict</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
