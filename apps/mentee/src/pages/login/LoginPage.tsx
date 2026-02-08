import { useState } from 'react';
import loginLogo from '@/assets/logo.svg';
import eyeSvg from '@/assets/icons/eye.svg';
import eyeOffSvg from '@/assets/icons/eye-off.svg';

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className="flex flex-col justify-center h-screen bg-background-white gap-[42px] px-[16px]">
            <div className="flex justify-center">
                <img src={loginLogo} alt="login-logo" className="w-fit" />
            </div>
            <div className="flex flex-col gap-[16px]">
                <input
                    type="text"
                    placeholder="ID"
                    className="w-full border border-grayscale-border shadow-inner shadow-[0_0_4px_0_#00000040] focus:outline-none rounded-[28.5px] py-[13px] px-[26px] bg-white placeholder:text-grayscale-light-gray text-grayscale-black"
                />
                <div className="w-full flex items-center border border-grayscale-border shadow-inner shadow-[0_0_4px_0_#00000040] rounded-[28.5px] py-[13px] px-[26px] bg-white">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="password"
                        className="flex-1 min-w-0 border-0 p-0 bg-transparent outline-none placeholder:text-grayscale-light-gray text-grayscale-black"
                    />
                    <button type="button" onClick={handleTogglePassword} aria-label="비밀번호 보기">
                        <img
                            src={showPassword ? eyeOffSvg : eyeSvg}
                            alt="비밀번호 보기"
                            className="w-6 h-6 shrink-0 ml-2 cursor-pointer"
                        />
                    </button>
                </div>
            </div>
            <button
                type="button"
                className="w-full h-14 bg-primary-blue hover:bg-primary-blue-dark text-white rounded-full px-6 py-4 ui-button"
            >
                로그인
            </button>
        </div>
    );
};

export default LoginPage;
