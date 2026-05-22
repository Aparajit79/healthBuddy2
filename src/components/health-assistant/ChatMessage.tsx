import React from "react";

interface ChatMessageProps {
  role: string;
  content: string;
  isLast?: boolean;
}

// Bug fix: was checking role === "bot" but messages were stored as role === "system".
// Now correctly checks role === "assistant" (matches what useHealthAssistant stores).
const ChatMessage = ({ role, content, isLast = false }: ChatMessageProps) => {
  const isBot = role === "assistant";

  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"}`}>
      {isBot && (
        <div className="flex-shrink-0 mr-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
          </div>
        </div>
      )}

      <div
        className={`max-w-[80%] p-4 rounded-lg shadow-md ${
          isBot
            ? "bg-gray-800 text-gray-100 border border-gray-700"
            : "bg-gradient-to-r from-cyan-600 to-blue-600 text-white"
        } ${isLast ? "animate-chat-bubble" : ""}`}
      >
        <p className={`whitespace-pre-wrap ${isBot ? "text-cyan-50" : "text-white"}`}>
          {content}
        </p>
      </div>

      {!isBot && (
        <div className="flex-shrink-0 ml-3">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
