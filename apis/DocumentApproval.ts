import { Method } from 'axios';

// apis/DocumentApproval.ts
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface requestHeaderProps {
    baseURL: string | undefined;
    url: string;
    method: Method;
}

export default class DocumentApproval {
    updateFormApprovalStatus(id: string) {
        const requestHeader: requestHeaderProps = {
            baseURL: baseURL,
            url: `/api/v1/approval/documents/${id}`,
            method: 'PUT'
        };
        return requestHeader;
    }
}
