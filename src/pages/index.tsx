import { useAppContext } from '../contexts/AppContext';
import CareerCard from '../components/CareerCard';
import Layout from '../components/Layout';
import { CAREERS } from '../data/careers';

export default function Home() {
  const { setCurrentCareerId, addChatMessage, theme } = useAppContext();

  return (
    <Layout>
      <div className={`min-h-screen p-4 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
        <h1 className="text-3xl font-bold mb-6 text-center">Career Advisors</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {CAREERS.map(career => (
            <CareerCard 
              key={career.id}
              career={career}
              onClick={() => {
                setCurrentCareerId(career.id);
                addChatMessage({
                  speaker: 'expert',
                  message: `Hello! I'm your ${career.id.replace(/-/g, ' ')} advisor. Ask me anything!`
                });
              }}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
