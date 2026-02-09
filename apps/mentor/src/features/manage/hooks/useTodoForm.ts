import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';

export const feedbackFormSchema = z.object({
    subject: z.enum(['국어', '영어', '수학']).optional(),
    title: z.string().optional(),
    learningGoal: z.string().optional(),
    learningFile: z.any().optional(),
    repeatDays: z.array(z.string()).optional(),
});

export type FeedbackFormValues = z.infer<typeof feedbackFormSchema>;

const defaultValues: FeedbackFormValues = {
    subject: '국어',
    title: '',
    learningGoal: '',
    learningFile: undefined,
    repeatDays: [],
};

/**
 * @description 피드백 폼 상태 관리 훅
 */
const useTodoForm = () => {
    const form = useForm<FeedbackFormValues>({
        resolver: zodResolver(feedbackFormSchema),
        defaultValues,
    });

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        control,
        formState: { errors },
        reset,
    } = form;

    return {
        register,
        handleSubmit,
        watch,
        setValue,
        control,
        errors,
        reset,
    };
};

export default useTodoForm;
