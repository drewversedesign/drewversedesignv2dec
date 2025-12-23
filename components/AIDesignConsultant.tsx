
import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from '../services/geminiService';
import { ChatMessage } from '../types';

export const AIDesignConsultant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hello! I'm your DrewVerse AI Consultant. I can help with design advice, market research, or finding our location in Kampala. What's on your mind?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Listen for external trigger events (e.g. from Service "Learn More" buttons)
  useEffect(() => {
    const handleOpenRequest = (e: any) => {
      const serviceName = e.detail?.service;
      setIsOpen(true);
      if (serviceName) {
        // Automatically send an inquiry message
        const message = `Tell me more about your ${serviceName} services.`;
        handleAutoInquiry(message);
      }
    };

    window.addEventListener('open-ai-consultant', handleOpenRequest);
    return () => window.removeEventListener('open-ai-consultant', handleOpenRequest);
  }, []);

  const handleAutoInquiry = async (message: string) => {
    const userMessage: ChatMessage = { role: 'user', text: message };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const isGeoQuery = /location|where|near|find|address|kampala/i.test(message);
      const response = await geminiService.getChatResponse(message, isGeoQuery);
      
      const aiMessage: ChatMessage = { 
        role: 'model', 
        text: response.text,
        sources: response.sources
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Failed to process auto-inquiry", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Use GEO context for specific queries
      const isGeoQuery = /location|where|near|find|address|kampala/i.test(input);
      const response = await geminiService.getChatResponse(input, isGeoQuery);
      
      const aiMessage: ChatMessage = { 
        role: 'model', 
        text: response.text,
        sources: response.sources
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Failed to send message", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 bg-primary hover:bg-primary-hover text-white rounded-full shadow-2xl shadow-orange-500/50 flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 hover:shadow-orange-500/80 ${!isOpen ? 'animate-pulse' : ''}`}
      >
        <span className="material-symbols-outlined text-3xl">
          {isOpen ? 'close' : 'manage_search'}
        </span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[350px] md:w-[450px] h-[550px] bg-white dark:bg-surface-dark rounded-2xl shadow-2xl border border-subtle-light dark:border-subtle-dark flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="p-4 bg-primary text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center transition-transform hover:scale-110">
                <span className="material-symbols-outlined">travel_explore</span>
              </div>
              <div>
                <h3 className="font-bold display-font text-sm uppercase">Research & Design AI</h3>
                <p className="text-[10px] opacity-80 uppercase tracking-widest">Grounded in Live Data</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:scale-110 transition-transform">
              <span className="material-symbols-outlined">keyboard_double_arrow_down</span>
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-[#0F0F0F] scroll-smooth">
            {messages.map((m, i) => (
              <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[90%] p-3 rounded-2xl text-sm transition-all hover:shadow-md ${
                  m.role === 'user' 
                    ? 'bg-primary text-white rounded-tr-none shadow-orange-500/10' 
                    : 'bg-white dark:bg-subtle-dark text-gray-800 dark:text-gray-200 shadow-sm border border-gray-100 dark:border-gray-800 rounded-tl-none'
                }`}>
                  <div className="prose prose-sm dark:prose-invert max-w-none break-words">
                    {m.text}
                  </div>
                  
                  {m.sources && m.sources.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                      <p className="text-[10px] uppercase font-bold text-gray-500 mb-2">Sources & Links:</p>
                      <div className="flex flex-wrap gap-2">
                        {m.sources.map((src, idx) => (
                          <a 
                            key={idx} 
                            href={src.uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[10px] bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-primary hover:underline truncate max-w-[150px] transition-all hover:scale-105"
                            title={src.title || src.uri}
                          >
                            {src.title || 'Source'}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-subtle-dark p-4 rounded-2xl rounded-tl-none border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-3">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                  <span className="text-[10px] uppercase text-gray-500 font-bold animate-pulse">Researching {isLoading ? 'request' : ''}...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 bg-white dark:bg-surface-dark border-t border-subtle-light dark:border-subtle-dark">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask for research or local info..."
                className="flex-1 bg-gray-100 dark:bg-subtle-dark border-none rounded-lg p-3 text-sm focus:ring-1 focus:ring-primary dark:text-white outline-none transition-all focus:bg-gray-200 dark:focus:bg-[#1E1E1E]"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="w-12 h-12 bg-primary hover:bg-primary-hover text-white rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-90 hover:shadow-lg disabled:opacity-50"
              >
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
            <p className="text-[9px] text-gray-400 mt-2 text-center">Powered by Gemini Real-time Grounding</p>
          </div>
        </div>
      )}
    </div>
  );
};
