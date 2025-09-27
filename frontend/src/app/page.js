"use client";

import { useEffect, useState } from 'react';
import Badge from '../components/Badge';

export default function Home() {
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStatus() {
      try {
        const res = await fetch('/api/status');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setStatus(data);
      } catch (e) {
        setError('Error loading data');
      }
    }
    fetchStatus();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-100 flex items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Welcome to BadgeMe</h1>
        <p className="text-lg text-gray-600 mb-8">zk-KYC Verification Demo</p>
        {error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : status ? (
          <Badge verified={status.verified} flags={status.flags} />
        ) : (
          <p className="text-gray-500 animate-pulse">Loading...</p>
        )}
      </div>
    </main>
  );
}