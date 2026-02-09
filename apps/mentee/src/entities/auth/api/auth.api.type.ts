/** 로그인 요청 타입 */
export interface ILoginRequest {
    loginId: string
    password: string
}

/** 로그인 응답 타입 */
export interface ILoginResponse {
    accessToken: string
    refreshToken: string,
    userId: number
    name: string
    role: string
}