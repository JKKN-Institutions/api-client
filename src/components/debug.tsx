import React from 'react';
import { useData } from '../hooks/use-data';

interface Institution {
  id: string;
  name: string;
  email: string;
  phone: string;
}

function TestInstitutions() {
  const { items, loading, error, metadata } = useData<Institution>({
    apiKey: 'jk_71d29aade0445dd9da4f353d8a5d382d_m51zeg35',
    baseUrl: 'https://my-jkkn-nine.vercel.app',
    endpoint: '/api/api-management/organizations/institutions'
  });

  console.log('Raw Response:', {
    items,
    loading,
    error,
    metadata
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Institutions</h1>
      <div>Total Items: {metadata?.total || 0}</div>
      <div>Status: {loading ? 'Loading' : error ? 'Error' : 'Success'}</div>
      <pre
        style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px' }}
      >
        {JSON.stringify(items, null, 2)}
      </pre>
    </div>
  );
}

export default TestInstitutions;
