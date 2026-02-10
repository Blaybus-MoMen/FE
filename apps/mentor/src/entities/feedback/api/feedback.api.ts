import { ApiHelper } from '@/shared/api/api.base';
import { API_PATH } from '@/shared/api/api.path';
import type { ApiResponse } from '@/shared/model/api.type';
import type {
    ITodoFeedbackResponse,
    ITodoFeedbackRequest,
    IWeeklyFeedbackResponse,
    IWeeklyFeedbackRequest,
    IWeeklyAiSummaryRequest,
    IMonthlyFeedbackResponse,
    IMonthlyFeedbackRequest,
    IMonthlyAiSummaryRequest,
    ITodoSubmission,
} from './feedback.api.type';

/** 피드백 API */
export const feedbackApi = {
    /** Todo(일간) 피드백 조회 */
    getTodoFeedback: (todoId: number) => {
        return ApiHelper.get<ApiResponse<ITodoFeedbackResponse | null>>(API_PATH.FEEDBACK.TODO.GET(todoId));
    },

    getTodoSubmission: (todoId: number) => {
        return ApiHelper.get<ApiResponse<ITodoSubmission | null>>(API_PATH.MENTORING.TODO.SUBMISSIONS(todoId));
    },

    /** Todo(일간) 피드백 저장 */
    saveTodoFeedback: (todoId: number, body: ITodoFeedbackRequest) => {
        return ApiHelper.post<ApiResponse<{}>>(API_PATH.FEEDBACK.TODO.SAVE(todoId), body);
    },

    /** 주간 피드백 목록 조회 */
    getWeeklyFeedbackList: (menteeId: number, params: { yearMonth?: string; weekStartDate?: string }) => {
        return ApiHelper.get<ApiResponse<IWeeklyFeedbackResponse[]>>(API_PATH.FEEDBACK.WEEKLY.LIST(menteeId), {
            params,
        });
    },

    /** 주간 피드백 상세 조회 */
    getWeeklyFeedbackDetail: (feedbackId: number) => {
        return ApiHelper.get<ApiResponse<IWeeklyFeedbackResponse>>(API_PATH.FEEDBACK.WEEKLY.DETAIL(feedbackId));
    },

    /** 주간 피드백 저장 */
    saveWeeklyFeedback: (menteeId: number, body: IWeeklyFeedbackRequest) => {
        return ApiHelper.post<ApiResponse<{}>>(API_PATH.FEEDBACK.WEEKLY.SAVE(menteeId), body);
    },

    /** 주간 AI 요약 요청 */
    requestWeeklyAiSummary: (menteeId: number, body: IWeeklyAiSummaryRequest) => {
        return ApiHelper.post<ApiResponse<{ aiSummary: string }>>(API_PATH.FEEDBACK.WEEKLY.AI_SUMMARY(menteeId), body);
    },

    /** 월간 피드백 목록 조회 */
    getMonthlyFeedbackList: (menteeId: number, params: { yearMonth?: string; year?: number }) => {
        return ApiHelper.get<ApiResponse<IMonthlyFeedbackResponse[]>>(API_PATH.FEEDBACK.MONTHLY.LIST(menteeId), {
            params,
        });
    },

    /** 월간 피드백 상세 조회 */
    getMonthlyFeedbackDetail: (feedbackId: number) => {
        return ApiHelper.get<ApiResponse<IMonthlyFeedbackResponse>>(API_PATH.FEEDBACK.MONTHLY.DETAIL(feedbackId));
    },

    /** 월간 피드백 저장 */
    saveMonthlyFeedback: (menteeId: number, body: IMonthlyFeedbackRequest) => {
        return ApiHelper.post<ApiResponse<{}>>(API_PATH.FEEDBACK.MONTHLY.SAVE(menteeId), body);
    },

    /** 월간 AI 요약 요청 */
    requestMonthlyAiSummary: (menteeId: number, body: IMonthlyAiSummaryRequest) => {
        return ApiHelper.post<ApiResponse<{ aiSummary: string }>>(API_PATH.FEEDBACK.MONTHLY.AI_SUMMARY(menteeId), body);
    },
};
