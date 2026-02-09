import { ApiHelper } from '@/shared/api/api.base';
import type { ApiResponse } from '@/shared/model/api.type';
import type { UploadFileResponse } from './files.type';

export const filesApi = {
    upload: async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);

        return ApiHelper.post<ApiResponse<UploadFileResponse>>('/files/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
};
