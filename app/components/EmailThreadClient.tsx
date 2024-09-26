'use client';

import React, { useState, useEffect } from 'react';
import { EmailThread, fetchEmailThread, generateAIResponse, deleteMessage } from '@/lib/emailService';
import { AnimatePresence, motion } from 'framer-motion';
import { XCircle } from 'lucide-react'; // Import the X icon

export default function EmailThreadClient({ thread: initialThread }: { thread: EmailThread }) {
  const [thread, setThread] = useState<EmailThread>(initialThread);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateResponse = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await generateAIResponse(thread);
      setAiResponse(response);
    } catch (error) {
      console.error('Failed to generate AI response:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    try {
      await deleteMessage(thread.id, messageId);
      setThread((prevThread) => ({
        ...prevThread,
        messages: prevThread.messages.filter((msg) => msg.id !== messageId)
      }));
    } catch (error) {
      console.error('Error deleting message:', error);
      setError('Failed to delete message. Please try again.');
    }
  };

  const handleDeleteAIResponse = () => {
    setAiResponse(null);
  };

  return (
    <>
      {/* Render thread messages */}
      <div className="p-4 space-y-4 sm:p-6 sm:space-y-6">
        <AnimatePresence>
          {thread.messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className={`p-4 rounded-lg ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border border-gray-200`}
            >
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between items-center flex-wrap">
                  <span className="font-semibold text-base sm:text-lg text-indigo-600">{message.sender}</span>
                  <div className="flex items-center space-x-2 sm:space-x-4 mt-1 sm:mt-0">
                    <span className="text-xs sm:text-sm text-gray-500">{message.timestamp.toLocaleString()}</span>
                    <button
                      onClick={() => handleDeleteMessage(message.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                      aria-label="Delete message"
                    >
                      <XCircle size={18} />
                    </button>
                  </div>
                </div>
                <p className="text-gray-800 text-base sm:text-lg leading-relaxed">{message.content}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {aiResponse && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="p-4 rounded-lg bg-green-50 border border-green-200"
          >
            <div className="flex justify-between items-center mb-2 sm:mb-4">
              <div className="font-semibold text-base sm:text-lg text-green-600">AI Generated Response</div>
              <button
                onClick={handleDeleteAIResponse}
                className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                aria-label="Delete AI response"
              >
                <XCircle size={18} />
              </button>
            </div>
            <p className="text-gray-800 text-base sm:text-lg leading-relaxed">{aiResponse}</p>
          </motion.div>
        )}
      </div>
      <div className="px-4 py-4 sm:px-6 sm:py-6 bg-gray-100 flex justify-center">
        <button
          onClick={handleGenerateResponse}
          disabled={isLoading}
          className="w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition duration-300 ease-in-out"
        >
          {isLoading ? 'Generating...' : 'Generate AI Response'}
        </button>
      </div>
      {error && <div className="mt-4 p-3 sm:p-4 bg-red-100 text-red-700 text-sm sm:text-base rounded-lg">{error}</div>}
    </>
  );
}