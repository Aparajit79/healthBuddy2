
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, User, Menu } from "lucide-react";

interface HeaderProps {
  language: string;
  handleLanguageChange: (value: string) => void;
}

const Header = ({ language, handleLanguageChange }: HeaderProps) => {
  return (
    <header className="bg-gradient-to-r from-cyan-700 via-blue-700 to-cyan-700 p-4 shadow-lg border-b border-cyan-500/30">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 p-2 shadow-md">
            <User className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Health Assistant</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Bell className="h-5 w-5 hover:text-cyan-300 transition-colors cursor-pointer" />
            <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center text-xs">2</span>
          </div>
          <Select defaultValue={language} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-32 bg-cyan-700/50 border border-cyan-500/30 text-white focus:ring-cyan-400">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border border-cyan-600/30">
              <SelectItem value="en" className="text-white hover:bg-cyan-700/30">English</SelectItem>
              <SelectItem value="es" className="text-white hover:bg-cyan-700/30">Español</SelectItem>
              <SelectItem value="hi" className="text-white hover:bg-cyan-700/30">हिन्दी</SelectItem>
              <SelectItem value="ta" className="text-white hover:bg-cyan-700/30">தமிழ்</SelectItem>
            </SelectContent>
          </Select>
          <Menu className="h-5 w-5 md:hidden hover:text-cyan-300 transition-colors cursor-pointer" />
        </div>
      </div>
    </header>
  );
};

export default Header;
