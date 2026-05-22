
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Activity, Scale } from "lucide-react";

const BMICalculator: React.FC = () => {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [height, setHeight] = useState<{ value: string, unit: string }>({ value: "", unit: "cm" });
  const [weight, setWeight] = useState<{ value: string, unit: string }>({ value: "", unit: "kg" });
  const [bmi, setBMI] = useState<number | null>(null);
  const [category, setCategory] = useState<string>("");

  const calculateBMI = () => {
    if (!height.value || !weight.value) return;

    let bmiValue: number;
    const weightValue = parseFloat(weight.value);
    const heightValue = parseFloat(height.value);

    if (unit === "metric") {
      // BMI = weight (kg) / [height (m)]²
      const heightInMeters = heightValue / 100;
      bmiValue = weightValue / (heightInMeters * heightInMeters);
    } else {
      // BMI = 703 × weight (lbs) / [height (inches)]²
      bmiValue = (703 * weightValue) / (heightValue * heightValue);
    }

    setBMI(parseFloat(bmiValue.toFixed(1)));
    
    // Determine BMI category
    if (bmiValue < 18.5) {
      setCategory("Underweight");
    } else if (bmiValue < 25) {
      setCategory("Normal weight");
    } else if (bmiValue < 30) {
      setCategory("Overweight");
    } else {
      setCategory("Obesity");
    }
  };

  const handleUnitChange = (value: string) => {
    const unitType = value as "metric" | "imperial";
    setUnit(unitType);
    if (unitType === "metric") {
      setHeight({ value: "", unit: "cm" });
      setWeight({ value: "", unit: "kg" });
    } else {
      setHeight({ value: "", unit: "in" });
      setWeight({ value: "", unit: "lbs" });
    }
    setBMI(null);
    setCategory("");
  };

  const getBMIColorClass = () => {
    if (!bmi) return "text-white";
    if (bmi < 18.5) return "text-blue-400";
    if (bmi < 25) return "text-green-400";
    if (bmi < 30) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-950 border-cyan-500/30 shadow-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-cyan-700 via-blue-700 to-cyan-700">
        <CardTitle className="text-white flex items-center text-lg">
          <Scale className="mr-2 h-5 w-5 text-cyan-300" />
          BMI Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="flex justify-center mb-2">
          <Select defaultValue={unit} onValueChange={handleUnitChange}>
            <SelectTrigger className="w-full bg-gray-800 border-cyan-600/50 text-white">
              <SelectValue placeholder="Select unit system" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-cyan-600/50 text-white">
              <SelectItem value="metric">Metric (cm, kg)</SelectItem>
              <SelectItem value="imperial">Imperial (in, lbs)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Height ({height.unit})</label>
            <Input
              type="number"
              placeholder={`Height in ${height.unit}`}
              value={height.value}
              onChange={(e) => setHeight({ ...height, value: e.target.value })}
              className="bg-gray-700/90 border-cyan-600/50 text-white focus:border-cyan-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Weight ({weight.unit})</label>
            <Input
              type="number"
              placeholder={`Weight in ${weight.unit}`}
              value={weight.value}
              onChange={(e) => setWeight({ ...weight, value: e.target.value })}
              className="bg-gray-700/90 border-cyan-600/50 text-white focus:border-cyan-400"
            />
          </div>
        </div>

        <Button 
          onClick={calculateBMI}
          className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:opacity-90 text-white"
        >
          Calculate BMI
        </Button>

        {bmi !== null && (
          <div className="mt-4 text-center">
            <div className="text-2xl font-bold mb-1">
              Your BMI: <span className={getBMIColorClass()}>{bmi}</span>
            </div>
            <div className="text-lg font-medium mb-3 text-gray-300">
              Category: <span className={getBMIColorClass()}>{category}</span>
            </div>
            <div className="grid grid-cols-4 gap-1 mt-3">
              <div className="bg-blue-500/20 p-2 text-xs text-center rounded-l-md border-t border-b border-l border-blue-500/30">
                <div className="font-bold text-blue-400">Underweight</div>
                <div className="text-gray-400">&lt; 18.5</div>
              </div>
              <div className="bg-green-500/20 p-2 text-xs text-center border-t border-b border-green-500/30">
                <div className="font-bold text-green-400">Normal</div>
                <div className="text-gray-400">18.5-24.9</div>
              </div>
              <div className="bg-yellow-500/20 p-2 text-xs text-center border-t border-b border-yellow-500/30">
                <div className="font-bold text-yellow-400">Overweight</div>
                <div className="text-gray-400">25-29.9</div>
              </div>
              <div className="bg-red-500/20 p-2 text-xs text-center rounded-r-md border-t border-b border-r border-red-500/30">
                <div className="font-bold text-red-400">Obesity</div>
                <div className="text-gray-400">&gt; 30</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BMICalculator;
