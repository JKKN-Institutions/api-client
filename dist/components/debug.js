import React from 'react';
import { useData } from '../hooks/use-data';
function TestInstitutions() {
    var _a = useData({
        apiKey: 'jk_71d29aade0445dd9da4f353d8a5d382d_m51zeg35',
        baseUrl: 'https://my-jkkn-nine.vercel.app',
        endpoint: '/api/api-management/organizations/institutions'
    }), items = _a.items, loading = _a.loading, error = _a.error, metadata = _a.metadata;
    console.log('Raw Response:', {
        items: items,
        loading: loading,
        error: error,
        metadata: metadata
    });
    if (loading)
        return React.createElement("div", null, "Loading...");
    if (error)
        return React.createElement("div", null,
            "Error: ",
            error);
    return (React.createElement("div", null,
        React.createElement("h1", null, "Institutions"),
        React.createElement("div", null,
            "Total Items: ",
            (metadata === null || metadata === void 0 ? void 0 : metadata.total) || 0),
        React.createElement("div", null,
            "Status: ",
            loading ? 'Loading' : error ? 'Error' : 'Success'),
        React.createElement("pre", { style: { background: '#f5f5f5', padding: '1rem', borderRadius: '4px' } }, JSON.stringify(items, null, 2))));
}
export default TestInstitutions;
