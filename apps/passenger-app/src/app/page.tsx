'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [pickupLocation, setPickupLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [showRideOptions, setShowRideOptions] = useState(false);

  const handleRequestRide = () => {
    if (pickupLocation && destination) {
      setShowRideOptions(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">🚕 TUYA</h1>
          <div className="flex items-center gap-4">
            <Link href="/profile" className="text-gray-600 hover:text-primary transition">
              👤 Profile
            </Link>
            <Link href="/history" className="text-gray-600 hover:text-primary transition">
              📋 History
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {!showRideOptions ? (
          <>
            {/* Map Placeholder */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <p className="text-gray-600 text-lg font-semibold">📍 Map View</p>
                  <p className="text-gray-500 text-sm">Your location will appear here</p>
                </div>
              </div>
            </div>

            {/* Ride Request Form */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-text mb-4">Request a Ride</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-text mb-2">📍 Pickup Location</label>
                  <input
                    type="text"
                    placeholder="Enter pickup location"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text mb-2">📍 Destination</label>
                  <input
                    type="text"
                    placeholder="Enter destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <button
                  onClick={handleRequestRide}
                  disabled={!pickupLocation || !destination}
                  className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-opacity-90 transition disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold"
                >
                  Request Ride
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Ride Options */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-xl font-bold text-text mb-4">Available Rides</h2>
              <p className="text-sm text-text-secondary mb-4">
                From: <span className="font-semibold">{pickupLocation}</span> → To: <span className="font-semibold">{destination}</span>
              </p>

              <div className="space-y-4">
                {[
                  { type: 'Economy', price: 2500, time: '5 min', cars: 12 },
                  { type: 'Premium', price: 4000, time: '3 min', cars: 5 },
                  { type: 'XL', price: 5500, time: '7 min', cars: 3 },
                ].map((option, idx) => (
                  <div key={idx} className="border border-border rounded-lg p-4 flex justify-between items-center hover:shadow-md transition">
                    <div>
                      <p className="font-semibold text-text">{option.type}</p>
                      <p className="text-sm text-text-secondary">~{option.time} away • {option.cars} cars available</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-secondary">{option.price} SDG</p>
                      <button className="mt-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition text-sm">
                        Book Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowRideOptions(false)}
                className="mt-6 w-full px-6 py-2 border border-border text-text rounded-lg hover:bg-gray-50 transition"
              >
                Back
              </button>
            </div>
          </>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <Link href="/favorites" className="bg-white rounded-lg shadow-lg p-4 text-center hover:shadow-xl transition">
            <p className="text-2xl mb-2">❤️</p>
            <p className="font-semibold text-text">Favorites</p>
          </Link>
          <Link href="/wallet" className="bg-white rounded-lg shadow-lg p-4 text-center hover:shadow-xl transition">
            <p className="text-2xl mb-2">💳</p>
            <p className="font-semibold text-text">Wallet</p>
          </Link>
          <Link href="/promotions" className="bg-white rounded-lg shadow-lg p-4 text-center hover:shadow-xl transition">
            <p className="text-2xl mb-2">🎁</p>
            <p className="font-semibold text-text">Promotions</p>
          </Link>
          <Link href="/support" className="bg-white rounded-lg shadow-lg p-4 text-center hover:shadow-xl transition">
            <p className="text-2xl mb-2">🆘</p>
            <p className="font-semibold text-text">Support</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
