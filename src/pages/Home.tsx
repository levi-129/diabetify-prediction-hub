
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Activity, Info, Check, AlertTriangle } from "lucide-react";

const Home = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-medical-50 via-blue-50 to-medical-100">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12">
            <div className="flex flex-col space-y-4 text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">
                Early Diabetes <span className="text-medical-600">Detection</span> Through AI
              </h1>
              <p className="text-muted-foreground md:text-xl max-w-[600px]">
                Our machine learning model analyzes your health parameters to assess your diabetes risk with high accuracy.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <Link to="/predict">
                  <Button size="lg" className="bg-medical-600 hover:bg-medical-700">
                    Check Your Risk <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="rounded-xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Medical professional with patient" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is Diabetes */}
      <section className="py-12 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <div className="inline-block rounded-lg bg-medical-100 p-2 mb-2">
              <Info className="h-5 w-5 text-medical-600" />
            </div>
            <h2 className="text-3xl font-bold tracking-tighter">What is Diabetes?</h2>
            <p className="text-muted-foreground md:text-lg max-w-[800px]">
              Diabetes is a chronic condition that affects how your body turns food into energy.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Type 1 Diabetes</CardTitle>
                <CardDescription>Autoimmune condition</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>
                  The body doesn't produce insulin because the immune system attacks and destroys the cells in the pancreas that make insulin.
                </p>
                <p>
                  People with Type 1 diabetes need to take insulin every day to survive.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Type 2 Diabetes</CardTitle>
                <CardDescription>The most common type</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>
                  The body doesn't use insulin well and can't keep blood sugar at normal levels.
                </p>
                <p>
                  It develops over many years and is usually diagnosed in adults, but is increasingly being diagnosed in children and adolescents.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Global Statistics */}
      <section className="py-12 bg-gradient-to-b from-medical-50 to-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <div className="inline-block rounded-lg bg-medical-100 p-2 mb-2">
              <Activity className="h-5 w-5 text-medical-600" />
            </div>
            <h2 className="text-3xl font-bold tracking-tighter">Global Impact of Diabetes</h2>
            <p className="text-muted-foreground md:text-lg max-w-[800px]">
              Diabetes is a growing global health concern affecting millions worldwide.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            <Card className="bg-medical-50 border-medical-200">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-medical-700 mb-2">537M</div>
                <p className="text-muted-foreground">Adults with diabetes worldwide</p>
              </CardContent>
            </Card>
            
            <Card className="bg-medical-50 border-medical-200">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-medical-700 mb-2">1 in 10</div>
                <p className="text-muted-foreground">Adults are affected</p>
              </CardContent>
            </Card>
            
            <Card className="bg-medical-50 border-medical-200">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-medical-700 mb-2">50%</div>
                <p className="text-muted-foreground">Of cases are undiagnosed</p>
              </CardContent>
            </Card>
            
            <Card className="bg-medical-50 border-medical-200">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-medical-700 mb-2">6.7M</div>
                <p className="text-muted-foreground">Deaths annually due to diabetes</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Risk Factors */}
      <section className="py-12 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
            <div className="inline-block rounded-lg bg-medical-100 p-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-medical-600" />
            </div>
            <h2 className="text-3xl font-bold tracking-tighter">Diabetes Risk Factors</h2>
            <p className="text-muted-foreground md:text-lg max-w-[800px]">
              Understanding these risk factors can help with early detection and prevention.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Check className="h-5 w-5 mr-2 text-medical-600" />
                  Family History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Having a parent or sibling with diabetes increases your risk.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Check className="h-5 w-5 mr-2 text-medical-600" />
                  Weight
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Being overweight or obese increases insulin resistance.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Check className="h-5 w-5 mr-2 text-medical-600" />
                  Age
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Risk increases as you get older, particularly after 45.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Check className="h-5 w-5 mr-2 text-medical-600" />
                  Physical Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Being physically inactive increases your risk.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Check className="h-5 w-5 mr-2 text-medical-600" />
                  Blood Pressure
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  High blood pressure is linked to an increased risk.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Check className="h-5 w-5 mr-2 text-medical-600" />
                  Glucose Levels
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Abnormal blood glucose levels may indicate prediabetes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-medical-600 text-white">
        <div className="container px-4 md:px-6 flex flex-col items-center text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Take the First Step Towards Better Health
          </h2>
          <p className="mb-6 max-w-[600px]">
            Our AI-powered prediction tool can help you assess your risk of diabetes based on key health indicators.
          </p>
          <Link to="/predict">
            <Button variant="secondary" size="lg">
              Check Your Risk Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
