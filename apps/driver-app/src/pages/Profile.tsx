import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Profile() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header isOnline={false} setIsOnline={() => {}} />
      <main className="flex-1 container py-8">
        <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">← Back</Link>
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Profile</h1>
        <div className="card">
          <p className="text-gray-600">Profile page coming soon...</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
