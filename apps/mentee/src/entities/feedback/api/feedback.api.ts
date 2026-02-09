import { ApiHelper } from "@/shared/api/api.base"
import { API_PATH } from "@/shared/api/api.path"
import type { IMonthTodoFeedbackResponse, ITodoFeedbackResponse, IWeekTodoFeedbackResponse } from "./feedback.api.type"
import type { ApiResponse } from "@/shared/model/type"

/** 피드백 API */
export const feedbackApi = {
    getTodoFeedback: async (params: number) => {
        const response = await ApiHelper.get<ITodoFeedbackResponse>(`${API_PATH.FEEDBACK.TODO}/${params}`)
        return response
    },
    getWeekTodoFeedback: async (params: string) => {
        const response = await ApiHelper.get<ApiResponse<IWeekTodoFeedbackResponse[]>>(`${API_PATH.FEEDBACK.TODO_WEEK}?weekStartDate=${params}`)
        return response.data
    },
    getMonthTodoFeedback: async (params: string) => {
        const response = await ApiHelper.get<ApiResponse<IMonthTodoFeedbackResponse[]>>(`${API_PATH.FEEDBACK.TODO_MONTH}?yearMonth=${params}`)
        return response.data
    },
}