import { useMutation } from "@tanstack/react-query"
import type { IFileUploadRequest } from "../api/file.type"
import { fileApi } from "../api/file.api"

function triggerFileDownload(blob: Blob, fileName: string) {
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = fileName || "download"
    a.click()
    URL.revokeObjectURL(url)
}

export const useFileUploadMutation = () => {
    return useMutation({
        mutationFn: (params: IFileUploadRequest) => fileApi.fileUpload(params),
    })
}

export const useFileDownloadMutation = () => {
    return useMutation({
        mutationFn: async ({
            pathOrId,
            fileName,
        }: {
            pathOrId: string
            fileName: string
        }) => {
            const blob = await fileApi.fileDownload(pathOrId)
            triggerFileDownload(blob as Blob, fileName)
            return { blob, fileName }
        },
    })
}