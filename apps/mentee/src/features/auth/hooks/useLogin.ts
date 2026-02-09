import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { useLoginMutation } from "@/entities/auth/queries/auth.queries";
import { useState } from "react";
import { useAuthAction } from "@/shared/store/auth.store";
import { useNavigate } from "react-router";

/** 로그인 스키마  */
export const loginFormSchema = z.object({
    id: z
        .string()
        .min(1, "아이디를 입력해주세요"),
    password: z.string().min(1, "비밀번호를 입력해주세요"),
});

/**
 * @description 로그인 커스텀 훅
 */
const useLogin = () => {
    const navigate = useNavigate();

    const { mutateAsync } = useLoginMutation();

    const { setToken } = useAuthAction();

    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };


    const {
        register,
        handleSubmit,
        formState: { isValid, errors },
    } = useForm({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            id: '',
            password: '',
        },
    })

    const handleLoginSubmit = handleSubmit(async (data) => {
        try {
            const res = await mutateAsync({
                loginId: data.id.trim(),
                password: data.password.trim(),
            })
            setToken(res.data.accessToken);
            navigate('/home');
        } catch (error) {
            console.error(error);
        }
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