import { useAppContext } from '../contexts/AppContext';
import ThemeSelector from './ThemeSelector';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { theme } = useAppContext();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      <header className={`p-4 shadow ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">CareerOS</h1>
          <ThemeSelector />
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
