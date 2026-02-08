import { Outlet } from "react-router"
/**
 * @description 토큰에 따른 라우트 가드
 */
const AuthGuard = () => {
    // TODO: 토큰 체크에 따라 리다이렉트
    // if (!hydrated) return null
    // if (!token) return <Navigate to={'/login'} replace />
    return (
        <Outlet />
    )
}

export default AuthGuard