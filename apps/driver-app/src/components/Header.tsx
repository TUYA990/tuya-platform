import { Link } from 'react-router-dom';

interface HeaderProps {
  isOnline: boolean;
  setIsOnline: (value: boolean) => void;
}

export default function Header({ isOnline, setIsOnline }: HeaderProps) {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">🚗</span>
          </div>
          <h1 className="text-xl font-bold text-gray-800">TUYA Driver</h1>
        </Link>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsOnline(!isOnline)}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              isOnline
                ? 'bg-green-500 text-white'
                : 'bg-gray-300 text-gray-700'
            }`}
          >
            {isOnline ? '🟢 Online' : '⚫ Offline'}
          </button>
          <Link to="/profile" className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition">
            👤
          </Link>
        </div>
      </div>
    </header>
  );
}
