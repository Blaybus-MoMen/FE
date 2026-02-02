import { ApiHelper } from '@package/api.base'
import { API_PATH } from '@package/api.path'
import type { ILoginRequest, ILoginResponse, IRefreshRequest, IRefreshResponse } from '@/entities/auth/api/auth.api.type'

/** 인증 API */
export const authApi = {
    /**
     * @description 로그인 API
     * @param {ILoginRequest} params - 로그인 요청 파라미터
     */
    login: async (params: ILoginRequest) => {
        const response = await ApiHelper.post<ILoginResponse>(API_PATH.AUTH.LOGIN, { params })
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
    /**
    * @description 토큰 재발급 API
    * @param {IRefreshRequest} params - 토큰 재발급 요청 파라미터
    */
    refresh: async (params: IRefreshRequest) => {
        const response = await ApiHelper.post<IRefreshResponse>(API_PATH.AUTH.REFRESH, { params })
        return response
    }
}