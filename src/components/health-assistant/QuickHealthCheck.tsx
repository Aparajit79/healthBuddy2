
import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface QuickHealthCheckProps {
  heartRate: number | null;
  checkHeartRate: () => void;
  isLoading: boolean;
}

const QuickHealthCheck = ({ heartRate, checkHeartRate, isLoading }: QuickHealthCheckProps) => {
  return (
    <div className="space-y-4 pt-4">
      <Button 
        onClick={checkHeartRate} 
        className="w-full bg-cyan-600 hover:bg-cyan-700"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <LoaderCircle className="h-4 w-4 mr-2 animate-spin" />
            Measuring...
          </>
        ) : (
          "Check Heart Rate"
        )}
      </Button>
      
      {isLoading && (
        <div className="text-center p-3 bg-gray-700 rounded-lg animate-pulse">
          <p className="text-sm mb-2 text-cyan-300">Processing health data...</p>
          <Progress 
            value={65} 
            className="h-2 bg-cyan-900/50" 
          />
        </div>
      )}
      
      {heartRate !== null && !isLoading && (
        <div className="text-center p-3 bg-gray-700 rounded-lg animate-fadeIn">
          <p className="text-2xl font-bold text-cyan-400">{heartRate} BPM</p>
          <p className="text-sm text-gray-300">
            {heartRate < 60
              ? "Below normal range"
              : heartRate > 100
              ? "Above normal range"
              : "Within normal range"}
          </p>
        </div>
      )}
      
      <Separator />
      <div>
        <h3 className="font-medium mb-2 text-cyan-400">Medical Resources</h3>
        <a
          href="https://www.webmd.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
        >
          <span>WebMD</span>
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
};

export default QuickHealthCheck;
