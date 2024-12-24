import React from 'react';
interface ApiViewerProps {
    apiKey: string;
    apiUrl: string;
    endpoint: string;
    headers?: Record<string, string>;
    onDataChange?: (data: any) => void;
}
export declare function ApiViewer({ apiKey, apiUrl, endpoint, headers, onDataChange }: ApiViewerProps): React.JSX.Element;
export {};
