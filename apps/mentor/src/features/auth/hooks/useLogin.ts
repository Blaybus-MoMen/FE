import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

/** 로그인 스키마  */
export const loginFormSchema = z.object({
    email: z
        .string()
        .min(1, "이메일을 입력해주세요")
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "올바른 이메일 형식이 아닙니다"),
    password: z.string().min(1, "비밀번호를 입력해주세요"),
});

/**
 * @description 로그인 커스텀 훅
 */
const useLogin = () => {
    const {
        register,
        handleSubmit,
        formState: { isValid, errors },
    } = useForm({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    /** 비밀번호 표시 상태 */
    const [showPassword, setShowPassword] = useState(false);

    /** 비밀번호 표시 토글 핸들러 */
    const handleTogglePassword = () => {
        setShowPassword(prev => !prev);
    }

    /** 로그인 제출 핸들러 */
    const handleLoginSubmit = handleSubmit((data) => {
        console.log(data)
    })

    return {
        register,
        isValid,
        handleLoginSubmit,
        errors,
        showPassword,
        handleTogglePassword,
    }

}

export default useLogin