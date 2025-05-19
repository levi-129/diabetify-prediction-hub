
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, AlertCircle, Activity } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Types
interface PredictionResult {
  prediction: number;
  probability: number;
  confidence: string;
}

interface FormData {
  pregnancies: number;
  glucose: number;
  bloodPressure: number;
  skinThickness: number;
  insulin: number;
  bmi: number;
  dpf: number;
  age: number;
}

const initialFormData: FormData = {
  pregnancies: 0,
  glucose: 100,
  bloodPressure: 70,
  skinThickness: 20,
  insulin: 100,
  bmi: 25,
  dpf: 0.5,
  age: 30,
};

const ParameterInfo = ({ title, description }: { title: string; description: string }) => (
  <div className="flex items-start gap-2">
    <div className="mt-0.5">
      <Info className="h-4 w-4 text-medical-600" />
    </div>
    <div>
      <h4 className="font-medium text-sm">{title}</h4>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  </div>
);

const Predict = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("form");

  const handleSliderChange = (name: keyof FormData, value: number[]) => {
    setFormData({
      ...formData,
      [name]: value[0],
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Convert to number and validate
    const numValue = parseFloat(value);
    
    if (!isNaN(numValue)) {
      setFormData({
        ...formData,
        [name]: numValue,
      });
    } else if (value === "") {
      // Allow empty field for typing
      setFormData({
        ...formData,
        [name]: "",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // API call
      const response = await fetch('http://localhost:5050/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pregnancies: formData.pregnancies,
          glucose: formData.glucose,
          blood_pressure: formData.bloodPressure,
          skin_thickness: formData.skinThickness,
          insulin: formData.insulin,
          bmi: formData.bmi,
          dpf: formData.dpf,
          age: formData.age,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      setResult({
        prediction: data.prediction,
        probability: data.probability,
        confidence: data.confidence,
      });
      
      // Switch to result tab
      setActiveTab("result");
      
      toast({
        title: "Prediction Complete",
        description: "Your diabetes risk assessment is ready.",
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "There was a problem processing your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-12 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col text-center space-y-4 mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Diabetes Risk Assessment
          </h1>
          <p className="text-muted-foreground">
            Enter your health parameters to assess your diabetes risk using our AI prediction model.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="form">Enter Parameters</TabsTrigger>
            <TabsTrigger value="result" disabled={!result}>View Results</TabsTrigger>
          </TabsList>
          
          <TabsContent value="form">
            <Card>
              <CardHeader>
                <CardTitle>Health Parameters</CardTitle>
                <CardDescription>
                  Fill in the form below with your health metrics for prediction.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    {/* Pregnancies */}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="pregnancies">
                          Pregnancies: {formData.pregnancies}
                        </Label>
                        <span className="text-xs text-muted-foreground">
                          Range: 0-17
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Slider
                          id="pregnancies"
                          min={0}
                          max={17}
                          step={1}
                          defaultValue={[formData.pregnancies]}
                          value={[typeof formData.pregnancies === "number" ? formData.pregnancies : 0]}
                          onValueChange={(value) => handleSliderChange("pregnancies", value)}
                          className="flex-1"
                        />
                        <Input
                          type="number"
                          name="pregnancies"
                          value={formData.pregnancies}
                          onChange={handleInputChange}
                          className="w-16"
                          min={0}
                          max={17}
                        />
                      </div>
                      <ParameterInfo
                        title="Pregnancies"
                        description="Number of times pregnant"
                      />
                    </div>

                    {/* Glucose */}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="glucose">
                          Glucose: {formData.glucose} mg/dL
                        </Label>
                        <span className="text-xs text-muted-foreground">
                          Range: 0-199
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Slider
                          id="glucose"
                          min={0}
                          max={199}
                          step={1}
                          defaultValue={[formData.glucose]}
                          value={[typeof formData.glucose === "number" ? formData.glucose : 0]}
                          onValueChange={(value) => handleSliderChange("glucose", value)}
                          className="flex-1"
                        />
                        <Input
                          type="number"
                          name="glucose"
                          value={formData.glucose}
                          onChange={handleInputChange}
                          className="w-16"
                          min={0}
                          max={199}
                        />
                      </div>
                      <ParameterInfo
                        title="Glucose"
                        description="Plasma glucose concentration at 2 hours in oral glucose tolerance test"
                      />
                    </div>

                    {/* Blood Pressure */}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="bloodPressure">
                          Blood Pressure: {formData.bloodPressure} mm Hg
                        </Label>
                        <span className="text-xs text-muted-foreground">
                          Range: 0-122
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Slider
                          id="bloodPressure"
                          min={0}
                          max={122}
                          step={1}
                          defaultValue={[formData.bloodPressure]}
                          value={[typeof formData.bloodPressure === "number" ? formData.bloodPressure : 0]}
                          onValueChange={(value) => handleSliderChange("bloodPressure", value)}
                          className="flex-1"
                        />
                        <Input
                          type="number"
                          name="bloodPressure"
                          value={formData.bloodPressure}
                          onChange={handleInputChange}
                          className="w-16"
                          min={0}
                          max={122}
                        />
                      </div>
                      <ParameterInfo
                        title="Blood Pressure"
                        description="Diastolic blood pressure (mm Hg)"
                      />
                    </div>

                    {/* Skin Thickness */}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="skinThickness">
                          Skin Thickness: {formData.skinThickness} mm
                        </Label>
                        <span className="text-xs text-muted-foreground">
                          Range: 0-99
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Slider
                          id="skinThickness"
                          min={0}
                          max={99}
                          step={1}
                          defaultValue={[formData.skinThickness]}
                          value={[typeof formData.skinThickness === "number" ? formData.skinThickness : 0]}
                          onValueChange={(value) => handleSliderChange("skinThickness", value)}
                          className="flex-1"
                        />
                        <Input
                          type="number"
                          name="skinThickness"
                          value={formData.skinThickness}
                          onChange={handleInputChange}
                          className="w-16"
                          min={0}
                          max={99}
                        />
                      </div>
                      <ParameterInfo
                        title="Skin Thickness"
                        description="Triceps skin fold thickness (mm)"
                      />
                    </div>

                    {/* Insulin */}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="insulin">
                          Insulin: {formData.insulin} μU/ml
                        </Label>
                        <span className="text-xs text-muted-foreground">
                          Range: 0-846
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Slider
                          id="insulin"
                          min={0}
                          max={846}
                          step={1}
                          defaultValue={[formData.insulin]}
                          value={[typeof formData.insulin === "number" ? formData.insulin : 0]}
                          onValueChange={(value) => handleSliderChange("insulin", value)}
                          className="flex-1"
                        />
                        <Input
                          type="number"
                          name="insulin"
                          value={formData.insulin}
                          onChange={handleInputChange}
                          className="w-16"
                          min={0}
                          max={846}
                        />
                      </div>
                      <ParameterInfo
                        title="Insulin"
                        description="2-Hour serum insulin (μU/ml)"
                      />
                    </div>

                    {/* BMI */}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="bmi">
                          BMI: {formData.bmi} kg/m²
                        </Label>
                        <span className="text-xs text-muted-foreground">
                          Range: 0-67.1
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Slider
                          id="bmi"
                          min={0}
                          max={67.1}
                          step={0.1}
                          defaultValue={[formData.bmi]}
                          value={[typeof formData.bmi === "number" ? formData.bmi : 0]}
                          onValueChange={(value) => handleSliderChange("bmi", value)}
                          className="flex-1"
                        />
                        <Input
                          type="number"
                          name="bmi"
                          value={formData.bmi}
                          onChange={handleInputChange}
                          className="w-16"
                          min={0}
                          max={67.1}
                          step={0.1}
                        />
                      </div>
                      <ParameterInfo
                        title="BMI"
                        description="Body mass index (weight in kg/(height in m)²)"
                      />
                    </div>

                    {/* Diabetes Pedigree Function */}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="dpf">
                          Diabetes Pedigree: {formData.dpf}
                        </Label>
                        <span className="text-xs text-muted-foreground">
                          Range: 0.078-2.42
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Slider
                          id="dpf"
                          min={0.078}
                          max={2.42}
                          step={0.001}
                          defaultValue={[formData.dpf]}
                          value={[typeof formData.dpf === "number" ? formData.dpf : 0.078]}
                          onValueChange={(value) => handleSliderChange("dpf", value)}
                          className="flex-1"
                        />
                        <Input
                          type="number"
                          name="dpf"
                          value={formData.dpf}
                          onChange={handleInputChange}
                          className="w-16"
                          min={0.078}
                          max={2.42}
                          step={0.001}
                        />
                      </div>
                      <ParameterInfo
                        title="Diabetes Pedigree Function"
                        description="Diabetes pedigree function (genetic score)"
                      />
                    </div>

                    {/* Age */}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="age">
                          Age: {formData.age} years
                        </Label>
                        <span className="text-xs text-muted-foreground">
                          Range: 21-81
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Slider
                          id="age"
                          min={21}
                          max={81}
                          step={1}
                          defaultValue={[formData.age]}
                          value={[typeof formData.age === "number" ? formData.age : 21]}
                          onValueChange={(value) => handleSliderChange("age", value)}
                          className="flex-1"
                        />
                        <Input
                          type="number"
                          name="age"
                          value={formData.age}
                          onChange={handleInputChange}
                          className="w-16"
                          min={21}
                          max={81}
                        />
                      </div>
                      <ParameterInfo
                        title="Age"
                        description="Age in years"
                      />
                    </div>
                  </div>

                  <Alert className="bg-medical-100 border-medical-300">
                    <AlertCircle className="h-4 w-4 text-medical-600" />
                    <AlertTitle>Important</AlertTitle>
                    <AlertDescription>
                      This prediction tool is for educational purposes only and should not replace professional medical advice.
                    </AlertDescription>
                  </Alert>

                  <div className="flex justify-center pt-4">
                    <Button 
                      type="submit" 
                      className="w-full sm:w-auto bg-medical-600 hover:bg-medical-700"
                      disabled={isLoading}
                    >
                      {isLoading ? "Processing..." : "Get Prediction"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="result">
            {result && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-center text-2xl">
                    <Activity className="h-6 w-6 mr-2 text-medical-600" />
                    Diabetes Risk Assessment Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex flex-col items-center justify-center text-center space-y-2">
                      <div className="text-xl font-medium">
                        Prediction: {result.prediction === 1 ? "Diabetic" : "Non-Diabetic"}
                      </div>
                      <div className={`text-lg font-bold ${
                        result.prediction === 1 ? "text-red-500" : "text-green-500"
                      }`}>
                        {result.prediction === 1 
                          ? "Indicators suggest positive for diabetes"
                          : "Indicators suggest negative for diabetes"
                        }
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Probability of Diabetes:</span>
                          <span className="font-medium">{(result.probability * 100).toFixed(2)}%</span>
                        </div>
                        <Progress value={result.probability * 100} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Probability of Non-Diabetes:</span>
                          <span className="font-medium">{((1 - result.probability) * 100).toFixed(2)}%</span>
                        </div>
                        <Progress value={(1 - result.probability) * 100} className="h-2" />
                      </div>
                      
                      <div className="flex justify-between pt-2">
                        <span>Confidence Level:</span>
                        <span className={`font-medium ${
                          result.confidence === "High" 
                            ? "text-green-500" 
                            : result.confidence === "Moderate" 
                              ? "text-yellow-500" 
                              : "text-red-500"
                        }`}>
                          {result.confidence}
                        </span>
                      </div>
                    </div>
                    
                    <Alert>
                      <AlertTitle>What does this mean?</AlertTitle>
                      <AlertDescription>
                        {result.prediction === 1 
                          ? "Based on your parameters, our model indicates a risk of diabetes. It's recommended to consult with a healthcare professional."
                          : "Based on your parameters, our model indicates low risk of diabetes. However, maintaining a healthy lifestyle is always beneficial."
                        }
                      </AlertDescription>
                    </Alert>
                    
                    <div className="flex justify-center pt-4">
                      <Button 
                        onClick={() => setActiveTab("form")} 
                        variant="outline"
                        className="mr-4"
                      >
                        Return to Form
                      </Button>
                      <Button 
                        onClick={() => window.print()} 
                        className="bg-medical-600 hover:bg-medical-700"
                      >
                        Print Results
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {!result && (
              <div className="text-center p-8">
                <p>No prediction results available yet. Please complete the form.</p>
                <Button 
                  onClick={() => setActiveTab("form")} 
                  className="mt-4 bg-medical-600 hover:bg-medical-700"
                >
                  Go to Form
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Predict;
