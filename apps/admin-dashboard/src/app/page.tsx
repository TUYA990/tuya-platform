'use client';

import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary to-primary">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-secondary">⚙️ TUYA Admin</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Admin User</span>
            <button className="px-4 py-2 bg-error text-white rounded-lg hover:bg-opacity-90 transition">
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Drivers</h3>
            <p className="text-3xl font-bold text-secondary">245</p>
            <p className="text-green-500 text-sm mt-2">↑ 12 this week</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Active Rides</h3>
            <p className="text-3xl font-bold text-primary">89</p>
            <p className="text-green-500 text-sm mt-2">↑ 23 this hour</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Daily Revenue</h3>
            <p className="text-3xl font-bold text-accent">125,450 SDG</p>
            <p className="text-green-500 text-sm mt-2">↑ 8% vs yesterday</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Avg Rating</h3>
            <p className="text-3xl font-bold text-warning">4.7 ⭐</p>
            <p className="text-gray-500 text-sm mt-2">Based on 1,234 reviews</p>
          </div>
        </div>

        {/* Management Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Drivers Management */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-text mb-4">👥 Drivers Management</h2>
            <div className="space-y-3">
              <Link href="/drivers" className="block p-3 border border-border rounded-lg hover:bg-gray-50 transition">
                <p className="font-semibold text-text">View All Drivers</p>
                <p className="text-sm text-text-secondary">245 active drivers</p>
              </Link>
              <Link href="/drivers/pending" className="block p-3 border border-border rounded-lg hover:bg-gray-50 transition">
                <p className="font-semibold text-text">Pending Approvals</p>
                <p className="text-sm text-text-secondary">12 waiting for review</p>
              </Link>
              <Link href="/drivers/suspended" className="block p-3 border border-border rounded-lg hover:bg-gray-50 transition">
                <p className="font-semibold text-text">Suspended Drivers</p>
                <p className="text-sm text-text-secondary">3 currently suspended</p>
              </Link>
            </div>
          </div>

          {/* Rides Management */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-text mb-4">🚕 Rides Management</h2>
            <div className="space-y-3">
              <Link href="/rides" className="block p-3 border border-border rounded-lg hover:bg-gray-50 transition">
                <p className="font-semibold text-text">All Rides</p>
                <p className="text-sm text-text-secondary">89 active, 2,345 completed today</p>
              </Link>
              <Link href="/rides/issues" className="block p-3 border border-border rounded-lg hover:bg-gray-50 transition">
                <p className="font-semibold text-text">Issues & Complaints</p>
                <p className="text-sm text-text-secondary">5 pending resolution</p>
              </Link>
              <Link href="/rides/analytics" className="block p-3 border border-border rounded-lg hover:bg-gray-50 transition">
                <p className="font-semibold text-text">Analytics</p>
                <p className="text-sm text-text-secondary">View detailed reports</p>
              </Link>
            </div>
          </div>
        </div>

        {/* Additional Management */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Fraud Detection */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-text mb-4">🔒 Fraud Detection</h2>
            <div className="space-y-3">
              <Link href="/fraud/alerts" className="block p-3 border border-border rounded-lg hover:bg-gray-50 transition">
                <p className="font-semibold text-text">Active Alerts</p>
                <p className="text-sm text-text-secondary">3 suspicious activities detected</p>
              </Link>
              <Link href="/fraud/blocked" className="block p-3 border border-border rounded-lg hover:bg-gray-50 transition">
                <p className="font-semibold text-text">Blocked Accounts</p>
                <p className="text-sm text-text-secondary">12 accounts blocked this month</p>
              </Link>
              <Link href="/fraud/patterns" className="block p-3 border border-border rounded-lg hover:bg-gray-50 transition">
                <p className="font-semibold text-text">Fraud Patterns</p>
                <p className="text-sm text-text-secondary">View detected patterns</p>
              </Link>
            </div>
          </div>

          {/* System Monitoring */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-text mb-4">📊 System Monitoring</h2>
            <div className="space-y-3">
              <Link href="/monitoring/performance" className="block p-3 border border-border rounded-lg hover:bg-gray-50 transition">
                <p className="font-semibold text-text">Performance</p>
                <p className="text-sm text-text-secondary">API uptime: 99.9%</p>
              </Link>
              <Link href="/monitoring/logs" className="block p-3 border border-border rounded-lg hover:bg-gray-50 transition">
                <p className="font-semibold text-text">System Logs</p>
                <p className="text-sm text-text-secondary">View recent logs</p>
              </Link>
              <Link href="/monitoring/alerts" className="block p-3 border border-border rounded-lg hover:bg-gray-50 transition">
                <p className="font-semibold text-text">Alerts & Notifications</p>
                <p className="text-sm text-text-secondary">2 active alerts</p>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
