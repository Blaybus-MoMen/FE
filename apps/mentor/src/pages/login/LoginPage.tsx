import LoginForm from "@/features/auth/ui/LoginForm";
import loginLogo from '@/assets/images/login-logo.svg';

/**
 * @description 로그인 페이지 컴포넌트
 */
const LoginPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen relative bg-grayscale-bg-gray md:bg-transparent pt-10 pb-[37px] md:py-[37px] gap-[46px] md:gap-[37px]">
            <img src={loginLogo} alt="login-logo" />
            <LoginForm />
        </div>
    )
}

export default LoginPage;