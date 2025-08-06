import { useAppContext } from '../contexts/AppContext';

export default function Dashboard() {
  const { chatHistory, theme } = useAppContext();
  
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Chat Stats</h2>
      <div className={`p-3 rounded mb-4 ${
        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
      }`}>
        <p>Total messages: {chatHistory.length}</p>
        <p>Your questions: {chatHistory.filter(m => m.speaker === 'user').length}</p>
      </div>
    </div>
  );
}
