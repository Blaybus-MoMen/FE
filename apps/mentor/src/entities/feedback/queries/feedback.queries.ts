import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { feedbackApi } from '@/entities/feedback/api/feedback.api';
import type {
    ITodoFeedbackRequest,
    IWeeklyFeedbackRequest,
    IWeeklyAiSummaryRequest,
    IMonthlyFeedbackRequest,
    IMonthlyAiSummaryRequest,
} from '@/entities/feedback/api/feedback.api.type';
import { manageApi } from '@/entities/manage/api/manage.api';

/** Todo(일간) 피드백 조회 */
export const useGetTodoFeedbackQuery = (todoId: number) => {
    return useQuery({
        queryKey: ['feedback', 'todo', todoId],
        queryFn: () => feedbackApi.getTodoFeedback(todoId),
        enabled: !!todoId,
    });
};

/** Todo(일간) 피드백 저장 */
export const useSaveTodoFeedbackMutation = (todoId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (body: ITodoFeedbackRequest) => feedbackApi.saveTodoFeedback(todoId, body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['feedback', 'todo', todoId] });
        },
    });
};

/** 주간 피드백 목록 조회 */
export const useGetWeeklyFeedbackListQuery = (
    menteeId: number,
    params: { yearMonth?: string; weekStartDate?: string },
    options?: { enabled?: boolean }
) => {
    return useQuery({
        queryKey: ['feedback', 'weekly', menteeId, params.yearMonth, params.weekStartDate],
        queryFn: () => feedbackApi.getWeeklyFeedbackList(menteeId, params),
        enabled: (options?.enabled ?? true) && !!menteeId,
    });
};

/** 주간 피드백 저장 */
export const useSaveWeeklyFeedbackMutation = (menteeId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (body: IWeeklyFeedbackRequest) => feedbackApi.saveWeeklyFeedback(menteeId, body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['feedback', 'weekly', menteeId] });
        },
    });
};

/** 주간 AI 요약 요청 */
export const useRequestWeeklyAiSummaryMutation = (menteeId: number) => {
    return useMutation({
        mutationFn: (body: IWeeklyAiSummaryRequest) => feedbackApi.requestWeeklyAiSummary(menteeId, body),
    });
};

/** 월간 피드백 목록 조회 */
export const useGetMonthlyFeedbackListQuery = (
    menteeId: number,
    params: { yearMonth?: string; year?: number },
    options?: { enabled?: boolean }
) => {
    return useQuery({
        queryKey: ['feedback', 'monthly', menteeId, params],
        queryFn: () => feedbackApi.getMonthlyFeedbackList(menteeId, params),
        enabled: (options?.enabled ?? true) && !!menteeId,
    });
};

/** 월간 피드백 저장 */
export const useSaveMonthlyFeedbackMutation = (menteeId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (body: IMonthlyFeedbackRequest) => feedbackApi.saveMonthlyFeedback(menteeId, body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['feedback', 'monthly', menteeId] });
        },
    });
};

/** 월간 AI 요약 요청 */
export const useRequestMonthlyAiSummaryMutation = (menteeId: number) => {
    return useMutation({
        mutationFn: (body: IMonthlyAiSummaryRequest) => feedbackApi.requestMonthlyAiSummary(menteeId, body),
    });
};

/** 주간 TODO 요청 */
export const useGetWeeklyTodosQuery = (menteeId: number, weekStartDate: string) => {
    return useQuery({
        queryKey: ['mentoring', 'todos', menteeId, 'weekly', weekStartDate],
        queryFn: () =>
            manageApi.getMenteeTodosByDate({
                menteeId,
                weekStartDate,
                yearMonth: '',
                date: '',
            }),
        enabled: !!menteeId && !!weekStartDate,
    });
};
