import { Career } from '../data/careers';
import { useAppContext } from '../contexts/AppContext';

export default function CareerCard({ career, onClick }: { career: Career, onClick: () => void }) {
  const { theme } = useAppContext();
  
  return (
    <div 
      onClick={onClick}
      className={`p-4 rounded-lg shadow cursor-pointer transition-all ${
        theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'
      }`}
    >
      <div className="flex items-center mb-2">
        <span className="text-2xl mr-2">{career.icon}</span>
        <h2 className="text-xl font-bold">{career.id.replace(/-/g, ' ')}</h2>
      </div>
      <p className="text-sm">{career.description}</p>
    </div>
  );
}
