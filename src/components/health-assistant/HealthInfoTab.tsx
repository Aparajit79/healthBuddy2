
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ArrowRight, Thermometer, Activity, Pill, Stethoscope, Heart, Cross, LoaderCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface HealthInfoTabProps {
  isLoading?: boolean;
}

const HealthInfoTab = ({ isLoading = false }: HealthInfoTabProps) => {
  const commonHealthTopics = [
    {
      title: "Fever",
      content: "Fever is generally defined as a body temperature above 98.6°F (37°C). Common causes include infections, vaccinations, heat exposure, and inflammatory conditions.",
      link: "https://www.webmd.com/cold-and-flu/fever",
      icon: Thermometer
    },
    {
      title: "Common Cold",
      content: "The common cold is a viral infection primarily affecting the nose and throat. Symptoms include runny nose, sore throat, cough, congestion, and mild body aches.",
      link: "https://www.webmd.com/cold-and-flu/cold-guide",
      icon: Activity
    },
    {
      title: "Headache",
      content: "Headaches can be caused by stress, dehydration, lack of sleep, or underlying medical conditions. Different types include tension, migraine, and cluster headaches.",
      link: "https://www.webmd.com/migraines-headaches/default.htm",
      icon: Pill
    },
    {
      title: "Cough",
      content: "A cough is a reflex action to clear your airways of mucus and irritants. It may be caused by various conditions including common cold, allergies, or respiratory infections.",
      link: "https://www.webmd.com/cold-and-flu/cough-relief-12/default.htm",
      icon: Stethoscope
    },
    {
      title: "Hypertension",
      content: "High blood pressure (hypertension) is a common condition that can lead to serious health problems like heart disease and stroke if untreated.",
      link: "https://www.webmd.com/hypertension-high-blood-pressure/default.htm",
      icon: Heart
    },
    {
      title: "Diabetes",
      content: "Diabetes is a chronic condition that affects how your body turns food into energy, resulting in too much sugar in your bloodstream.",
      link: "https://www.webmd.com/diabetes/default.htm",
      icon: Pill
    },
    {
      title: "Sore Throat",
      content: "A sore throat is pain, scratchiness or irritation of the throat that often worsens when you swallow. Common causes include viral infections, bacterial infections, and allergies.",
      link: "https://www.webmd.com/cold-and-flu/understanding-sore-throat-basics",
      icon: Cross
    },
    {
      title: "Stomach Pain",
      content: "Stomach pain can range from mild discomfort to severe, sharp pain. Common causes include indigestion, acid reflux, gastritis, and food poisoning.",
      link: "https://www.webmd.com/digestive-disorders/digestive-diseases-stomach-pain",
      icon: Pill
    }
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-cyan-500 border shadow-lg">
          <CardHeader className="bg-gradient-to-r from-cyan-700 to-blue-800 rounded-t-lg">
            <CardTitle className="text-white flex items-center">
              <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
              Loading Health Information
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            {Array(8).fill(0).map((_, index) => (
              <Card key={index} className="bg-gradient-to-br from-gray-700 to-gray-800 border-cyan-700/50 border shadow-md">
                <CardHeader className="pb-2">
                  <Skeleton className="h-6 w-24 bg-gray-600" />
                </CardHeader>
                <CardContent className="pt-0">
                  <Skeleton className="h-4 w-full bg-gray-600 mb-2" />
                  <Skeleton className="h-4 w-3/4 bg-gray-600 mb-2" />
                  <Skeleton className="h-4 w-5/6 bg-gray-600" />
                </CardContent>
                <CardFooter className="pt-0">
                  <Skeleton className="h-4 w-20 bg-gray-600" />
                </CardFooter>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-cyan-500 border shadow-lg">
        <CardHeader className="bg-gradient-to-r from-cyan-700 to-blue-800 rounded-t-lg">
          <CardTitle className="text-white flex items-center">
            <Pill className="mr-2 h-5 w-5" />
            Health Information Library
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {commonHealthTopics.map((topic, index) => (
            <Card key={index} className="bg-gradient-to-br from-gray-700 to-gray-800 border-cyan-700/50 border shadow-md hover:shadow-cyan-700/20 hover:border-cyan-600 transition-all duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-cyan-300 flex items-center">
                  <topic.icon className="mr-2 h-4 w-4" />
                  {topic.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-gray-300">{topic.content}</p>
              </CardContent>
              <CardFooter className="pt-0">
                <a 
                  href={topic.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-cyan-400 hover:text-cyan-300 hover:underline text-sm flex items-center group"
                >
                  Learn more <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </CardFooter>
            </Card>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-cyan-500 border shadow-lg">
        <CardHeader className="bg-gradient-to-r from-cyan-700 to-blue-800 rounded-t-lg">
          <CardTitle className="text-white flex items-center">
            <Heart className="mr-2 h-5 w-5" />
            Prevention Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <div className="bg-gradient-to-r from-gray-700 to-gray-800 p-4 rounded-lg border border-cyan-700/30 hover:border-cyan-600/50 transition-colors duration-300">
            <h3 className="font-medium text-cyan-300 mb-2 flex items-center">
              <Activity className="mr-2 h-4 w-4" />
              Regular Exercise
            </h3>
            <p className="text-sm text-gray-300">Aim for at least 150 minutes of moderate activity per week. Regular exercise helps maintain weight and reduces risk of chronic diseases.</p>
          </div>
          <div className="bg-gradient-to-r from-gray-700 to-gray-800 p-4 rounded-lg border border-cyan-700/30 hover:border-cyan-600/50 transition-colors duration-300">
            <h3 className="font-medium text-cyan-300 mb-2 flex items-center">
              <Pill className="mr-2 h-4 w-4" />
              Balanced Diet
            </h3>
            <p className="text-sm text-gray-300">Focus on fruits, vegetables, whole grains and lean proteins. Limit processed foods, sugars and saturated fats.</p>
          </div>
          <div className="bg-gradient-to-r from-gray-700 to-gray-800 p-4 rounded-lg border border-cyan-700/30 hover:border-cyan-600/50 transition-colors duration-300">
            <h3 className="font-medium text-cyan-300 mb-2 flex items-center">
              <Stethoscope className="mr-2 h-4 w-4" />
              Adequate Sleep
            </h3>
            <p className="text-sm text-gray-300">Adults should aim for 7-9 hours of quality sleep per night. Good sleep improves immune function and mental health.</p>
          </div>
          <div className="bg-gradient-to-r from-gray-700 to-gray-800 p-4 rounded-lg border border-cyan-700/30 hover:border-cyan-600/50 transition-colors duration-300">
            <h3 className="font-medium text-cyan-300 mb-2 flex items-center">
              <Thermometer className="mr-2 h-4 w-4" />
              Regular Check-ups
            </h3>
            <p className="text-sm text-gray-300">Schedule routine medical check-ups to catch potential health issues early. Preventive care is key to maintaining long-term health.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthInfoTab;
