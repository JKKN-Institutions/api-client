'use client';

import React from 'react';
import { useEffect, useState } from 'react';

interface ApiViewerProps {
  apiKey: string;
  apiUrl: string;
  endpoint: string;
  headers?: Record<string, string>;
}

export function ApiViewer({
  apiKey,
  apiUrl,
  endpoint,
  headers = {}
}: ApiViewerProps) {
  const [testResult, setTestResult] = useState<unknown>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}${endpoint}`, {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            ...headers
          }
        });

        const data = await response.json();

        setTestResult({
          success: response.ok,
          status: response.status,
          data: data
        });
      } catch (error) {
        setTestResult({
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    };

    fetchData();
  }, [apiKey, apiUrl, endpoint, headers]);

  return (
    <div className='p-4 bg-gray-50 rounded-lg'>
      <h2 className='text-lg font-bold mb-4'>API Response</h2>
      <pre className='bg-white p-4 rounded border overflow-auto'>
        {JSON.stringify(testResult, null, 2)}
      </pre>
    </div>
  );
}
