import z from 'zod';

/** 로그인 스키마 */
export const loginFormSchema = z.object({
    loginId: z.string().min(1, '아이디를 입력해주세요'),
    password: z.string().min(1, '비밀번호를 입력해주세요'),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;
