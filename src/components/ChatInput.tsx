import { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { CAREERS } from '../data/careers';

export default function ChatInput() {
  const {
    currentCareerId,
    addChatMessage,
    theme,
    getAIResponse,
    recordInteraction
  } = useAppContext();
  
  const [input, setInput] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const career = CAREERS.find(c => c.id === currentCareerId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !currentCareerId || !career) return;
    
    setIsLoading(true);
    
    try {
      // 1. Add user message immediately
      addChatMessage({ speaker: 'user', message: input });
      
      // 2. Get AI-generated response
      const aiResponse = await getAIResponse(input);
      
      // 3. Add AI response to chat
      addChatMessage({ speaker: 'expert', message: aiResponse });
      
      // 4. Record interaction with analytics
      recordInteraction(input, aiResponse, rating || undefined);
      
      // 5. Reset input and rating
      setInput('');
      setRating(null);
      
    } catch (error) {
      addChatMessage({ 
        speaker: 'expert', 
        message: "Sorry, I encountered an error. Please try again." 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const themeClasses = {
    light: {
      input: 'bg-white border-gray-300 text-gray-800',
      button: 'bg-blue-600 hover:bg-blue-700 text-white',
      rating: 'bg-gray-100 text-gray-800'
    },
    dark: {
      input: 'bg-gray-700 border-gray-600 text-white',
      button: 'bg-blue-700 hover:bg-blue-800 text-white',
      rating: 'bg-gray-800 text-white'
    },
    blue: {
      input: 'bg-blue-800 border-blue-700 text-white',
      button: 'bg-blue-500 hover:bg-blue-600 text-white',
      rating: 'bg-blue-900 text-white'
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-3">
      <div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={`w-full p-3 rounded-lg border ${themeClasses[theme].input}`}
          placeholder="Ask your career question..."
          rows={3}
          disabled={isLoading}
        />
      </div>
      
      {currentCareerId && (
        <div className={`p-3 rounded-lg ${themeClasses[theme].rating}`}>
          <label className="block mb-2 font-medium">
            Rate this response (optional):
          </label>
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  rating === star 
                    ? 'bg-yellow-500 text-white' 
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                {star}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading || !input.trim()}
        className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
          themeClasses[theme].button
        } ${
          isLoading || !input.trim() ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isLoading ? 'Thinking...' : 'Send Question'}
      </button>
    </form>
  );
}
