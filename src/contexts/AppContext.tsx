import React, { createContext, useContext, useState, useEffect } from 'react';

interface ChatMessage {
  speaker: 'user' | 'expert';
  message: string;
}

interface AppContextType {
  currentCareerId: string | null;
  setCurrentCareerId: (id: string | null) => void;
  chatHistory: ChatMessage[];
  addChatMessage: (msg: ChatMessage) => void;
  clearChatHistory: () => void;
  theme: string;
  setTheme: (theme: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentCareerId, setCurrentCareerId] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    const savedChat = JSON.parse(localStorage.getItem('chatHistory') || '[]');
    setChatHistory(savedChat);
  }, []);

  const addChatMessage = (msg: ChatMessage) => {
    setChatHistory(prev => {
      const newHistory = [...prev, msg];
      localStorage.setItem('chatHistory', JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const clearChatHistory = () => {
    setChatHistory([]);
    localStorage.removeItem('chatHistory');
  };

  return (
    <AppContext.Provider value={{
      currentCareerId,
      setCurrentCareerId,
      chatHistory,
      addChatMessage,
      clearChatHistory,
      theme,
      setTheme
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
}
