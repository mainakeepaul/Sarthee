'use client';
import { useState, useEffect } from 'react';

export default function LiveMonitor() {
  const [data, setData] = useState(null);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [error, setError] = useState(null);

  const checkMessages = async () => {
    try {
      setError(null);
      const response = await fetch('/api/debug/check-messages');
      const result = await response.json();
      
      if (result.success) {
        setData(result);
        console.log('Live monitor data:', result);
      } else {
        setError(result.error || 'Failed to fetch data');
      }
    } catch (error) {
      console.error('Monitor error:', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (isMonitoring) {
      checkMessages();
      const interval = setInterval(checkMessages, 3000);
      return () => clearInterval(interval);
    }
  }, [isMonitoring]);

  const sendTestMessage = async () => {
    try {
      const testMessage = {
        userId: 'live-test-user',
        content: `Test message at ${new Date().toLocaleTimeString()}`,
        isUser: true
      };

      console.log('Sending test message:', testMessage);
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testMessage)
      });
      
      const result = await response.json();
      console.log('Send result:', result);
      
      // Refresh data
      setTimeout(checkMessages, 500);
    } catch (error) {
      setError(error.message);
    }
  };

  // Safe way to handle collections data
  const collections = data?.collections ? Object.entries(data.collections) : [];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Live Database Monitor</h1>
      
      <div className="space-y-4 mb-6">
        <button
          onClick={() => setIsMonitoring(!isMonitoring)}
          className={`px-6 py-3 rounded-lg ${
            isMonitoring ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
          } text-white`}
        >
          {isMonitoring ? 'Stop Monitoring' : 'Start Live Monitoring'}
        </button>
        
        <button
          onClick={sendTestMessage}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 ml-4"
        >
          Send Test Message
        </button>
        
        <button
          onClick={checkMessages}
          className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 ml-4"
        >
          Refresh Now
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <strong>Error: </strong> {error}
        </div>
      )}

      {data && (
        <div className="space-y-6">
          {/* Database Info */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Database Information</h2>
            <p><strong>Database Name:</strong> {data.database || 'Unknown'}</p>
            <p><strong>Total Collections:</strong> {data.totalCollections || 0}</p>
            <p><strong>Last Updated:</strong> {new Date().toLocaleTimeString()}</p>
          </div>

          {/* Collections */}
          {collections.length > 0 ? (
            collections.map(([collectionName, collectionData]) => (
              <div key={collectionName} className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">
                  Collection: <span className="text-blue-600">{collectionName}</span>
                  <span className="ml-2 bg-gray-200 text-gray-800 px-2 py-1 rounded text-sm">
                    {collectionData?.count || 0} documents
                  </span>
                </h2>
                
                {collectionData?.count > 0 ? (
                  <div className="space-y-3">
                    {collectionData.sample?.map((doc, index) => (
                      <div key={index} className="border p-4 rounded bg-gray-50">
                        <pre className="text-sm">{JSON.stringify(doc, null, 2)}</pre>
                      </div>
                    ))}
                    {collectionData.count > 10 && (
                      <p className="text-gray-500 text-sm">
                        ... and {collectionData.count - 10} more documents
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-500">No documents in this collection</p>
                )}
              </div>
            ))
          ) : (
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-500">No collections found or data is not loaded yet.</p>
            </div>
          )}
        </div>
      )}

      {!data && !error && (
        <div className="bg-white p-6 rounded-lg shadow">
          <p>Click "Start Live Monitoring" to see database contents</p>
        </div>
      )}
    </div>
  );
}