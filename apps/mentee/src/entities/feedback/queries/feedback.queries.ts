import { useQuery } from "@tanstack/react-query"
import { feedbackApi } from "../api/feedback.api"


export const useGetTodoFeedbackQuery = (params: number) => {
    return useQuery({
        queryKey: ['getMyPageInfo'],
        queryFn: () => feedbackApi.getTodoFeedback(params),
    })
}

export const useGetWeekTodoFeedbackQuery = (params: string) => {
    return useQuery({
        queryKey: ['getMyPageInfo', params],
        queryFn: () => feedbackApi.getWeekTodoFeedback(params),
    })
}

export const useGetMonthTodoFeedbackQuery = (params: string) => {
    return useQuery({
        queryKey: ['getMonthTodoFeedback', params],
        queryFn: () => feedbackApi.getMonthTodoFeedback(params),
    })
}