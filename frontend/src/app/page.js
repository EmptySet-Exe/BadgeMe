"use client";

import { useState } from 'react';
import Badge from '../components/Badge';

export default function Home() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [wallet, setWallet] = useState('');

  async function handleVerify(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/status?wallet=${wallet}`);
      const data = await res.json();
      setStatus(data);
    } catch (e) {
      setStatus({ verified: false });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-100 flex items-center justify-center p-8">
      <div className="text-center w-full max-w-md">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Welcome to BadgeMe</h1>
        <p className="text-lg text-gray-600 mb-8">zk-KYC Verification Demo</p>
        <form onSubmit={handleVerify} className="mb-6">
          <input
            type="text"
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
            placeholder="Enter wallet address (e.g., 0x123...)"
            className="w-full p-2 border border-gray-300 text-black rounded-lg mb-4 focus:border-blue-500 focus:outline-none"
            disabled={loading}
          />
          <button
            type="submit"
            className="w-full px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Verify KYC'}
          </button>
        </form>
        {status && <Badge 
          verified={status.verified} 
          flags={status.flags} 
          badge={status.badge}
          region={status.region}
          expiryDate={status.expiryDate}
          addressInfo={status.addressInfo}
        />}
      </div>
    </main>
  );
}
