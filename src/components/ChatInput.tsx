import { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';

export default function ChatInput() {
  const { currentCareerId, addChatMessage, theme } = useAppContext();
  const [input, setInput] = useState('');
  const career = CAREERS.find(c => c.id === currentCareerId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !career) return;

    const response = career.responses[Math.floor(Math.random() * career.responses.length)];
    addChatMessage({ speaker: 'user', message: input });
    addChatMessage({ speaker: 'expert', message: response });
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className={`w-full p-2 rounded border ${
          theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
        }`}
        placeholder="Type your question..."
      />
      <button 
        type="submit"
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded w-full"
      >
        Send
      </button>
    </form>
  );
}
