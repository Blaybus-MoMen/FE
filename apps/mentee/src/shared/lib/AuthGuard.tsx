import { Navigate, Outlet } from "react-router"
import useNotificationSSE from "../hooks/useNotificationSSE"
import { useAuthStore } from "../store/auth.store"
/**
 * @description 토큰에 따른 라우트 가드
 */
const AuthGuard = () => {
    const token = useAuthStore((state) => state.token)
    const hydrated = useAuthStore.persist.hasHydrated()
    useNotificationSSE(token ?? "")
    if (!hydrated) return null
    if (!token) return <Navigate to={'/login'} replace />
    return (
        <Outlet />
    )
}

export default AuthGuard