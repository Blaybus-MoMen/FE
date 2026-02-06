import { Outlet, useLocation } from 'react-router';

/**
 * @description 기본 레이아웃 컴포넌트
 */
const BaseLayout = () => {
    const { pathname } = useLocation();

    const isLoginPage = pathname.includes('login');
    const isFeedbackPage = pathname.startsWith('/feedback');

    return (
        <div
            className={`
                w-full h-full
                ${isLoginPage ? '' : isFeedbackPage ? 'bg-feedback-layout' : 'bg-layout'}
            `}
        >
            <div className="w-full h-full max-w-[1280px] mx-auto">
                <Outlet />
            </div>
        </div>
    );
};

export default BaseLayout;
