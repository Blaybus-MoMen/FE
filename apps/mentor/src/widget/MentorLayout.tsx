import { Outlet, useLocation } from "react-router";
import bgLeftLogo from '@/assets/images/left-bg-logo.png';
import bgRightLogo from '@/assets/images/layer.png';
/**
 * @description 기본 레이아웃 컴포넌트
 */
const BaseLayout = () => {
    const { pathname } = useLocation();
    const isLoginPage = pathname.includes("login");
    return (
        <div
            className={`w-full h-full ${!isLoginPage ? "bg-layout bg-layout-md-none" : ""}`}
            style={
                !isLoginPage
                    ? { '--bg-image-left': `url(${bgLeftLogo})`, '--bg-image-right': `url(${bgRightLogo})` } as React.CSSProperties
                    : undefined
            }
        >
            <div className="w-full h-full max-w-[1280px] mx-auto">
                <Outlet />
            </div>
        </div>
    )
}

export default BaseLayout;