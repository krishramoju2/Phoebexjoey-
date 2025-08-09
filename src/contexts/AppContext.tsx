import React, { createContext, useContext, useState, useEffect } from 'react';

interface ChatMessage {
  speaker: 'user' | 'expert';
  message: string;
}

interface Interaction {
  timestamp: string;
  question: string;
  response: string;
  rating?: number;
  advisorType: string;
}

interface AnalyticsData {
  totalSessions: number;
  totalQuestions: number;
  averageRating: number;
  interactions: Interaction[];
  popularQuestions: Record<string, number>;
}

interface AppContextType {
  // Existing properties
  currentCareerId: string | null;
  setCurrentCareerId: (id: string | null) => void;
  chatHistory: ChatMessage[];
  addChatMessage: (msg: ChatMessage) => void;
  clearChatHistory: () => void;
  theme: string;
  setTheme: (theme: string) => void;
  
  // New AI and analytics properties
  getAIResponse: (prompt: string) => Promise<string>;
  analytics: AnalyticsData;
  recordInteraction: (question: string, response: string, rating?: number) => void;
  sessionStartTime: Date | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentCareerId, setCurrentCareerId] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [theme, setTheme] = useState('light');
  const [sessionStartTime] = useState<Date | null>(new Date());
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalSessions: 0,
    totalQuestions: 0,
    averageRating: 0,
    interactions: [],
    popularQuestions: {}
  });

  // Initialize from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    const savedChat = JSON.parse(localStorage.getItem('chatHistory') || '[]');
    setChatHistory(savedChat);
    
    const savedAnalytics = JSON.parse(localStorage.getItem('analytics') || 'null');
    if (savedAnalytics) {
      setAnalytics(savedAnalytics);
    } else {
      setAnalytics({
        totalSessions: 0,
        totalQuestions: 0,
        averageRating: 0,
        interactions: [],
        popularQuestions: {}
      });
    }
  }, []);

  // AI Response Generator
  const getAIResponse = async (prompt: string): Promise<string> => {
    if (!currentCareerId) return "Please select a career advisor first";
    
    // In a real implementation, this would call your AI API
    const responses = {
      'resume-builder': [
        "Focus on quantifiable achievements in your resume",
        "Use action verbs like 'developed', 'led', 'optimized'",
        "Tailor your resume for each job application"
      ],
      'interview-prep': [
        "Prepare 3-5 STAR method stories for behavioral questions",
        "Research the company's recent news and projects",
        "Practice explaining your thought process out loud"
      ],
      'career-path': [
        "Consider these emerging roles in your field...",
        "Based on your skills, you might excel in...",
        "Here are growth trajectories others in your position have taken..."
      ]
    };

    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    
    const careerResponses = responses[currentCareerId as keyof typeof responses] || 
      ["I'm still learning about this career path. Could you clarify your question?"];
    
    return careerResponses[Math.floor(Math.random() * careerResponses.length)];
  };

  // Analytics tracking
  const recordInteraction = (question: string, response: string, rating?: number) => {
    if (!currentCareerId) return;

    setAnalytics(prev => {
      const newInteraction: Interaction = {
        timestamp: new Date().toISOString(),
        question,
        response,
        rating,
        advisorType: currentCareerId
      };

      const newPopularQuestions = { ...prev.popularQuestions };
      newPopularQuestions[question] = (newPopularQuestions[question] || 0) + 1;

      const newTotalQuestions = prev.totalQuestions + 1;
      const newAverageRating = rating !== undefined ? 
        ((prev.averageRating * prev.interactions.length) + rating) / 
        (prev.interactions.length + 1) : prev.averageRating;

      const newData = {
        ...prev,
        totalQuestions: newTotalQuestions,
        averageRating: newAverageRating,
        interactions: [...prev.interactions, newInteraction],
        popularQuestions: newPopularQuestions
      };

      localStorage.setItem('analytics', JSON.stringify(newData));
      return newData;
    });
  };

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
      setTheme,
      getAIResponse,
      analytics,
      recordInteraction,
      sessionStartTime
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
