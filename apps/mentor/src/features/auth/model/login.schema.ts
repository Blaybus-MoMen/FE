import z from 'zod';

/** 로그인 스키마 */
export const loginFormSchema = z.object({
    loginId: z
        .string()
        .min(1, '이메일을 입력해주세요')
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, '올바른 이메일 형식이 아닙니다'),
    password: z.string().min(1, '비밀번호를 입력해주세요'),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;
