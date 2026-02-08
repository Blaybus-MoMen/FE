import { useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { AxiosError } from 'axios';
import { loginFormSchema } from '@/features/auth/model/login.schema';
import type { ILoginRequest } from '@/entities/auth/api/auth.api.type';
import { useLoginMutation } from '@/entities/auth/queries/auth.queries';

/**
 * @description 로그인 커스텀 훅
 */
const useLogin = () => {
    const navigate = useNavigate();
    const { mutateAsync, isPending } = useLoginMutation();

    /** 비밀번호 표시 상태 */
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit: handleFormSubmit,
        formState: { errors, isValid, touchedFields },
        setError,
    } = useForm<ILoginRequest>({
        resolver: zodResolver(loginFormSchema),
        mode: 'onChange',
        defaultValues: {
            loginId: '',
            password: '',
        },
    });

    /** 로그인 폼 제출 핸들러 */
    const onSubmit: SubmitHandler<ILoginRequest> = async (data) => {
        try {
            const response = await mutateAsync(data);

            const { accessToken, refreshToken } = response.data;

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            navigate('/home');
        } catch (error) {
            let errorMessage = '로그인에 실패했습니다. 다시 시도해주세요.';

            if (error instanceof AxiosError) {
                if (error.response?.status === 401) {
                    const serverMessage = error.response?.data?.message || error.message;

                    if (serverMessage === 'Invalid credentials' || serverMessage?.includes('Invalid')) {
                        errorMessage = '일치하는 회원정보가 없습니다.';
                    }
                }
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            setError('root.loginError', {
                type: 'server',
                message: errorMessage,
            });
        }
    };

    /** 비밀번호 보기 핸들러 */
    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    /** 폼 유효성 + 로딩 상태 */
    const isFormValid = useMemo(() => {
        return isValid && !isPending;
    }, [isValid, isPending]);

    return {
        register,
        handleLoginSubmit: handleFormSubmit(onSubmit),
        errors,
        isFormValid,
        touchedFields,
        showPassword,
        handleTogglePassword,
    };
};

export default useLogin;
