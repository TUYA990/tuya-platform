import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  const [isOnline, setIsOnline] = useState(false);
  const [earnings, setEarnings] = useState(2500);
  const [rating, setRating] = useState(4.8);
  const [activeRides, setActiveRides] = useState(1);

  useEffect(() => {
    // Simulate data loading
    console.log('Home page loaded');
  }, []);

  const rides = [
    { id: 1, from: 'Downtown', to: 'Airport', distance: '15 km', price: 3500, rating: 4.8 },
    { id: 2, from: 'Nile Street', to: 'Mall', distance: '8 km', price: 2000, rating: 4.9 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header isOnline={isOnline} setIsOnline={setIsOnline} />

      <main className="flex-1 container py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Today's Earnings</h3>
            <p className="text-3xl font-bold text-blue-600">{earnings} SDG</p>
            <p className="text-gray-500 text-sm mt-2">+12 rides completed</p>
          </div>

          <div className="card">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Rating</h3>
            <p className="text-3xl font-bold text-yellow-500">{rating} ⭐</p>
            <p className="text-gray-500 text-sm mt-2">Based on 156 reviews</p>
          </div>

          <div className="card">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Active Rides</h3>
            <p className="text-3xl font-bold text-blue-500">{activeRides}</p>
            <p className="text-gray-500 text-sm mt-2">Heading to Airport</p>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="card mb-8">
          <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-600 text-lg font-semibold">📍 Map View</p>
              <p className="text-gray-500 text-sm">Your location and available rides will appear here</p>
            </div>
          </div>
        </div>

        {/* Available Rides */}
        {isOnline && (
          <div className="card mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Available Rides</h2>
            <div className="space-y-4">
              {rides.map((ride) => (
                <div key={ride.id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center hover:shadow-md transition">
                  <div>
                    <p className="font-semibold text-gray-800">{ride.from} → {ride.to}</p>
                    <p className="text-sm text-gray-600">{ride.distance}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-blue-600">{ride.price} SDG</p>
                    <p className="text-sm text-yellow-500">⭐ {ride.rating}</p>
                  </div>
                  <button className="ml-4 btn-primary">Accept</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/earnings" className="card text-center hover:shadow-xl transition">
            <p className="text-2xl mb-2">💰</p>
            <p className="font-semibold text-gray-800">Earnings</p>
          </Link>
          <Link to="/history" className="card text-center hover:shadow-xl transition">
            <p className="text-2xl mb-2">📋</p>
            <p className="font-semibold text-gray-800">History</p>
          </Link>
          <Link to="/profile" className="card text-center hover:shadow-xl transition">
            <p className="text-2xl mb-2">👤</p>
            <p className="font-semibold text-gray-800">Profile</p>
          </Link>
          <Link to="/profile" className="card text-center hover:shadow-xl transition">
            <p className="text-2xl mb-2">🆘</p>
            <p className="font-semibold text-gray-800">Support</p>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
