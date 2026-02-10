import { useMutation } from "@tanstack/react-query"
import type { IFileUploadRequest } from "../api/file.type"
import { fileApi } from "../api/file.api"

export const useFileUploadMutation = () => {
    return useMutation({
        mutationFn: (params: IFileUploadRequest) => fileApi.fileUpload(params),
    })
}

export const useFileDownloadMutation = () => {
    return useMutation({
        mutationFn: (params: string) => fileApi.fileDownload(params),
    })
}