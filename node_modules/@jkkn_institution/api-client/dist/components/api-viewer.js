'use client';
import React from 'react';
import { useApiViewer } from '../hooks/use-api-viewer';
export function ApiViewer(_a) {
    var apiKey = _a.apiKey, apiUrl = _a.apiUrl, endpoint = _a.endpoint, _b = _a.headers, headers = _b === void 0 ? {} : _b, onDataChange = _a.onDataChange;
    var _c = useApiViewer({
        apiKey: apiKey,
        apiUrl: apiUrl,
        endpoint: endpoint,
        headers: headers
    }), data = _c.data, error = _c.error, loading = _c.loading, success = _c.success, status = _c.status;
    React.useEffect(function () {
        if (data && onDataChange) {
            onDataChange(data);
        }
    }, [data, onDataChange]);
    if (loading) {
        return React.createElement("div", { className: 'p-4' }, "Loading...");
    }
    return (React.createElement("div", { className: 'p-4 bg-gray-50 rounded-lg' },
        React.createElement("h2", { className: 'text-lg font-bold mb-4' }, "API Response"),
        React.createElement("pre", { className: 'bg-white p-4 rounded border overflow-auto' }, JSON.stringify({ success: success, status: status, data: data, error: error }, null, 2))));
}
