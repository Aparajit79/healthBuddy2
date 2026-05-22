
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, ShieldPlus, LightbulbIcon, Activity } from "lucide-react";
import { healthTipsService } from "@/services/healthTipsService";

const HealthTips: React.FC = () => {
  const [currentTip, setCurrentTip] = useState(healthTipsService.getRandomTip());
  const [animating, setAnimating] = useState(false);

  const getNewTip = () => {
    setAnimating(true);
    setTimeout(() => {
      setCurrentTip(healthTipsService.getRandomTip());
      setAnimating(false);
    }, 300);
  };

  useEffect(() => {
    // Change tip automatically every minute
    const interval = setInterval(() => {
      getNewTip();
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  const getCategoryIcon = () => {
    switch (currentTip.category) {
      case 'nutrition':
        return <Heart className="h-5 w-5 text-green-400" />;
      case 'fitness':
        return <Activity className="h-5 w-5 text-blue-400" />;
      case 'sleep':
        return <ShieldPlus className="h-5 w-5 text-purple-400" />;
      default:
        return <LightbulbIcon className="h-5 w-5 text-yellow-400" />;
    }
  };

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-950 border-cyan-500/30 shadow-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-cyan-700 via-blue-700 to-cyan-700">
        <CardTitle className="text-white flex items-center text-lg">
          <LightbulbIcon className="mr-2 h-5 w-5 text-cyan-300" />
          Health Tips
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className={`transition-opacity duration-300 ${animating ? 'opacity-0' : 'opacity-100'}`}>
          <div className="flex items-start mb-3">
            <div className="rounded-full bg-gray-800 p-2 mr-3 flex-shrink-0">
              {getCategoryIcon()}
            </div>
            <div>
              <h3 className="text-lg font-medium text-white mb-1">{currentTip.title}</h3>
              <div className="inline-block bg-gray-800/50 rounded-full px-3 py-0.5 text-xs font-medium text-gray-300 mb-2 capitalize">
                {currentTip.category}
              </div>
            </div>
          </div>
          <p className="text-gray-300 mb-4">{currentTip.content}</p>
          <Button 
            onClick={getNewTip}
            variant="outline" 
            size="sm"
            className="text-sm text-cyan-400 border-cyan-700/50 hover:bg-cyan-900/20"
          >
            Next Tip <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthTips;
