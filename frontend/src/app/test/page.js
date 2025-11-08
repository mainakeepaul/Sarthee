'use client';

import { useState, useEffect } from 'react';
import { apiService } from '@/lib/api';

export default function TestConnection() {
  const [status, setStatus] = useState('Testing...');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      setStatus('Testing backend connection...');
      
      // Test 1: Simple GET request
      const response = await apiService.getUsers();
      
      setStatus('✅ Connected successfully!');
      setData(response.data);
      setError(null);
      
    } catch (err) {
      setStatus('❌ Connection failed');
      setError(err.message);
      console.error('Connection error:', err);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Backend-Frontend Connection Test</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>Status: {status}</h2>
      </div>

      {error && (
        <div style={{ color: 'red', marginBottom: '20px' }}>
          <h3>Error Details:</h3>
          <p>{error}</p>
          <div style={{ background: '#f5f5f5', padding: '10px', borderRadius: '5px' }}>
            <strong>Troubleshooting steps:</strong>
            <ul>
              <li>Is backend running on port 8000?</li>
              <li>Check browser console for CORS errors</li>
              <li>Verify FastAPI CORS configuration</li>
              <li>Check network tab in browser dev tools</li>
            </ul>
          </div>
        </div>
      )}

      {data && (
        <div style={{ color: 'green', marginBottom: '20px' }}>
          <h3>✅ Data received from backend:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}

      <button 
        onClick={testConnection}
        style={{ 
          padding: '10px 20px', 
          backgroundColor: '#0070f3', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Test Connection Again
      </button>

      <div style={{ marginTop: '30px', background: '#f0f0f0', padding: '15px', borderRadius: '5px' }}>
        <h3>Connection Details:</h3>
        <p><strong>Frontend URL:</strong> http://localhost:3000</p>
        <p><strong>Backend URL:</strong> {process.env.NEXT_PUBLIC_API_BASE_URL}</p>
        <p><strong>API Base URL:</strong> {process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'}</p>
      </div>
    </div>
  );
}