import type { ILoginRequest, ILoginResponse } from '@/entities/auth/api/auth.api.type'
import { ApiHelper } from '@/shared/api/api.base'
import { API_PATH } from '@/shared/api/api.path'
import type { ApiResponse } from '@/shared/model/type'

/** 인증 API */
export const authApi = {
    /**
     * @description 로그인 API
     * @param {ILoginRequest} params - 로그인 요청 파라미터
     */
    login: async (params: ILoginRequest) => {
        const response = await ApiHelper.post<ApiResponse<ILoginResponse>>(API_PATH.AUTH.LOGIN, params)
        return response
    },
    /**
     * @description 로그아웃 API
     * @param {ILoginRequest} params - 로그인 요청 파라미터
     */
    logout: async () => {
        const response = await ApiHelper.post(API_PATH.AUTH.LOGOUT)
        return response
    },
}