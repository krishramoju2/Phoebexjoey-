import { useAppContext } from '../contexts/AppContext';

export default function Dashboard() {
  const { chatHistory, theme } = useAppContext();
  
  // Calculate stats
  const totalMessages = chatHistory.length;
  const userMessages = chatHistory.filter(m => m.speaker === 'user').length;
  const expertMessages = totalMessages - userMessages;

  // Theme classes
  const containerClass = theme === 'dark' 
    ? 'bg-gray-800 text-white' 
    : 'bg-white text-gray-800 border border-gray-200';
    
  const statClass = theme === 'dark' 
    ? 'bg-gray-700 text-white' 
    : 'bg-gray-100 text-gray-800';

  return (
    <div className={`p-4 rounded-lg shadow-sm ${containerClass}`}>
      <h2 className="text-xl font-bold mb-4">Chat Statistics</h2>
      
      <div className={`p-3 rounded mb-3 ${statClass}`}>
        <p className="font-medium">Total Messages: {totalMessages}</p>
      </div>
      
      <div className={`p-3 rounded mb-3 ${statClass}`}>
        <p className="font-medium">Your Questions: {userMessages}</p>
      </div>
      
      <div className={`p-3 rounded ${statClass}`}>
        <p className="font-medium">Advisor Responses: {expertMessages}</p>
      </div>
    </div>
  );
}
