import { useMutation } from "@tanstack/react-query"
import type { ILoginRequest } from "@/entities/auth/api/auth.api.type"
import { authApi } from "@/entities/auth/api/auth.api"

/** 로그인 뮤테이션 */
export const useLoginMutation = () => {
    return useMutation({
        mutationFn: (params: ILoginRequest) => authApi.login(params),
    })
}

/**  로그아웃 뮤테이션 */
export const useLogoutMutation = () => {
    return useMutation({
        mutationFn: () => authApi.logout(),
    })
}