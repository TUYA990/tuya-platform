'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [isOnline, setIsOnline] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
        <div className="text-white text-center">
          <p className="text-2xl font-bold">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">🚗 TUYA Driver</h1>
          <div className="flex items-center gap-4">
            <span className={`px-4 py-2 rounded-full font-semibold ${isOnline ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
              {isOnline ? 'Online' : 'Offline'}
            </span>
            <button
              onClick={() => setIsOnline(!isOnline)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {isOnline ? 'Go Offline' : 'Go Online'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Stats Cards */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Today's Earnings</h3>
            <p className="text-3xl font-bold text-blue-600">2,500 SDG</p>
            <p className="text-gray-500 text-sm mt-2">+12 rides completed</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Rating</h3>
            <p className="text-3xl font-bold text-yellow-500">4.8 ⭐</p>
            <p className="text-gray-500 text-sm mt-2">Based on 156 reviews</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Active Rides</h3>
            <p className="text-3xl font-bold text-blue-500">1</p>
            <p className="text-gray-500 text-sm mt-2">Heading to Airport</p>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-600 text-lg font-semibold">📍 Map View</p>
              <p className="text-gray-500 text-sm">Your location and available rides will appear here</p>
            </div>
          </div>
        </div>

        {/* Available Rides */}
        {isOnline && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Available Rides</h2>
            <div className="space-y-4">
              {[
                { from: 'Downtown', to: 'Airport', distance: '15 km', price: 3500, rating: 4.8 },
                { from: 'Nile Street', to: 'Mall', distance: '8 km', price: 2000, rating: 4.9 },
              ].map((ride, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center hover:shadow-md transition">
                  <div>
                    <p className="font-semibold text-gray-800">{ride.from} → {ride.to}</p>
                    <p className="text-sm text-gray-600">{ride.distance}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-blue-600">{ride.price} SDG</p>
                    <p className="text-sm text-yellow-500">⭐ {ride.rating}</p>
                  </div>
                  <button className="ml-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Accept
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <Link href="/earnings" className="bg-white rounded-lg shadow-lg p-4 text-center hover:shadow-xl transition">
            <p className="text-2xl mb-2">💰</p>
            <p className="font-semibold text-gray-800">Earnings</p>
          </Link>
          <Link href="/history" className="bg-white rounded-lg shadow-lg p-4 text-center hover:shadow-xl transition">
            <p className="text-2xl mb-2">📋</p>
            <p className="font-semibold text-gray-800">History</p>
          </Link>
          <Link href="/profile" className="bg-white rounded-lg shadow-lg p-4 text-center hover:shadow-xl transition">
            <p className="text-2xl mb-2">👤</p>
            <p className="font-semibold text-gray-800">Profile</p>
          </Link>
          <Link href="/support" className="bg-white rounded-lg shadow-lg p-4 text-center hover:shadow-xl transition">
            <p className="text-2xl mb-2">🆘</p>
            <p className="font-semibold text-gray-800">Support</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
