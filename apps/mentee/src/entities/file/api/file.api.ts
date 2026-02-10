import { ApiHelper } from "@/shared/api/api.base"
import { API_PATH } from "@/shared/api/api.path"
import type { IFileUploadRequest, IFileUploadResponse } from "./file.type"
import type { ApiResponse } from "@/shared/model/type"

export const fileApi = {
    fileUpload: async (params: IFileUploadRequest) => {
        const formData = new FormData();
        formData.append('file', params.file);
        const response = await ApiHelper.post<ApiResponse<IFileUploadResponse>>(
            API_PATH.FILE.UPLOAD,
            formData
        );
        return response;
    },
    fileDownload: async (pathOrId: string): Promise<Blob> => {
        return ApiHelper.get<Blob>(
            `${API_PATH.FILE.DOWNLOAD}/${pathOrId}`,
            { responseType: 'blob' },
        );
    },
}