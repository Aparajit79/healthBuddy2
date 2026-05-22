import React, { useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";

interface ChatBoxProps {
  chatHistory: { role: string; content: string }[];
  isProcessing?: boolean;
}

// Improvement: added typing indicator bubble when isProcessing is true
// (isProcessing existed in the original hook but was never rendered in the UI)
const ChatBox = ({ chatHistory, isProcessing = false }: ChatBoxProps) => {
  const chatboxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [chatHistory, isProcessing]);

  return (
    <div
      ref={chatboxRef}
      className="h-[450px] overflow-y-auto p-4 space-y-4 bg-gray-900/50 backdrop-blur-sm"
    >
      {chatHistory.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center text-gray-400">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-gray-700 p-3 animate-pulse">
                <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
            </div>
            <p className="text-lg font-medium">No messages yet</p>
            <p className="text-sm">Send a message to start the conversation</p>
          </div>
        </div>
      ) : (
        <>
          {chatHistory.map((chat, index) => (
            <ChatMessage
              key={index}
              role={chat.role}
              content={chat.content}
              isLast={index === chatHistory.length - 1 && !isProcessing}
            />
          ))}

          {/* Typing indicator — shown while AI is processing */}
          {isProcessing && (
            <div className="flex justify-start">
              <div className="flex-shrink-0 mr-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
              </div>
              <div className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 flex gap-1.5 items-center">
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ChatBox;
