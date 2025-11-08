'use client';
import { useState } from 'react';

export default function TestChat() {
  const [testResult, setTestResult] = useState('');

  const testDatabaseConnection = async () => {
    try {
      const testMessage = {
        userId: 'test-user',
        content: 'Test message from button',
        isUser: true
      };

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testMessage)
      });

      const result = await response.json();
      setTestResult(JSON.stringify(result, null, 2));
    } catch (error) {
      setTestResult('Error: ' + error.message);
    }
  };

  return (
    <div className="p-4">
      <button 
        onClick={testDatabaseConnection}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Test Database Upload
      </button>
      <pre className="mt-4 bg-gray-100 p-4 rounded">
        {testResult || 'Click the button to test database upload...'}
      </pre>
    </div>
  );
}