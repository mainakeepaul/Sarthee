'use client';
import { useState, useEffect } from 'react';

export default function SimpleDebug() {
  const [debugData, setDebugData] = useState(null);

  const runDebug = async () => {
    try {
      const response = await fetch('/api/debug/check-messages');
      const data = await response.json();
      setDebugData(data);
      console.log('Debug data:', data);
    } catch (error) {
      console.error('Debug error:', error);
      setDebugData({ error: error.message });
    }
  };

  useEffect(() => {
    runDebug();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Simple Database Debug</h1>
      
      <button 
        onClick={runDebug}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg mb-6 hover:bg-blue-600"
      >
        Refresh Data
      </button>

      {debugData && (
        <div className="bg-white p-6 rounded-lg shadow">
          <pre className="text-sm overflow-auto">
            {JSON.stringify(debugData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}