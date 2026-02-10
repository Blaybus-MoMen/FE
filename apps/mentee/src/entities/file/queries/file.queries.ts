import { useMutation } from "@tanstack/react-query"
import type { IFileUploadRequest } from "../api/file.type"
import { fileApi } from "../api/file.api"

/** blob으로 받은 파일을 브라우저에서 저장하도록 트리거 */
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

/** 단일 파일 다운로드 (클릭 등 사용자 액션에 사용 → useMutation) */
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
            triggerFileDownload(blob, fileName)
            return { blob, fileName }
        },
    })
}

type DownloadMaterialsParams = {
    materials: { fileUrl: string; fileName: string }[]
    delayMs?: number
}

/** 여러 파일 순차 다운로드 (한 번에 여러 개 클릭 시 브라우저가 막을 수 있어 짧은 간격으로 실행) */
export const useDownloadMaterialsMutation = () => {
    const { mutateAsync: downloadOne } = useFileDownloadMutation()
    return useMutation({
        mutationFn: async ({ materials, delayMs = 300 }: DownloadMaterialsParams) => {
            for (let i = 0; i < materials.length; i++) {
                const m = materials[i]
                const pathOrId = m.fileUrl.includes("/files/")
                    ? m.fileUrl.replace(/^.*\/files\/?/, "")
                    : m.fileUrl
                await downloadOne({ pathOrId, fileName: m.fileName })
                if (i < materials.length - 1) {
                    await new Promise((r) => setTimeout(r, delayMs))
                }
            }
        },
    })
}