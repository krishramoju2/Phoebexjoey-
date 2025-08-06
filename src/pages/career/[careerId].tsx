import { useRouter } from 'next/router';
import { useAppContext } from '../../contexts/AppContext';
import Layout from '../../components/Layout';
import ChatBubble from '../../components/ChatBubble';
import ChatInput from '../../components/ChatInput';
import Dashboard from '../../components/Dashboard';
import { CAREERS } from '../../data/careers';

export default function CareerPage() {
  const router = useRouter();
  const { careerId } = router.query;
  const { currentCareerId, chatHistory, clearChatHistory, theme } = useAppContext();
  const career = CAREERS.find(c => c.id === careerId);

  if (!career) return (
    <Layout>
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Career not found</h1>
          <button 
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Back to careers
          </button>
        </div>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <div className={`min-h-screen p-4 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
        <button 
          onClick={() => router.push('/')}
          className="mb-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded"
        >
          ← Back
        </button>

        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <div className={`md:w-2/3 p-4 rounded-lg ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            } shadow`}>
              <h1 className="text-2xl font-bold mb-4">{career.id.replace(/-/g, ' ')} Advisor</h1>
              
              <div className={`mb-4 p-4 rounded max-h-64 overflow-y-auto ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
                {chatHistory.length === 0 ? (
                  <p>Start chatting with your advisor</p>
                ) : (
                  chatHistory.map((msg, i) => (
                    <ChatBubble key={i} speaker={msg.speaker} message={msg.message} />
                  ))
                )}
              </div>

              <ChatInput />
              
              <button
                onClick={clearChatHistory}
                className="mt-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded"
              >
                Clear Chat
              </button>
            </div>

            <div className={`md:w-1/3 p-4 rounded-lg ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            } shadow`}>
              <Dashboard />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
