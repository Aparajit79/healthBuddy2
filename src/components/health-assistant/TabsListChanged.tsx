
import React from "react";
import { TabsList } from "@/components/ui/tabs";

interface TabsListChangedProps {
  children: React.ReactNode;
}

const TabsListChanged = ({ children }: TabsListChangedProps) => {
  return (
    <TabsList className="health-gradient w-full justify-start p-1 h-14 rounded-t-xl border-b-2 border-cyan-400/30 shadow-lg">
      {children}
    </TabsList>
  );
};

export default TabsListChanged;
