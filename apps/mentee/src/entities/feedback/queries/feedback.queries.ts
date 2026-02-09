import { useMutation, useQuery } from "@tanstack/react-query"
import { feedbackApi } from "../api/feedback.api"
import type { ITodoQuestionRequest } from "../api/feedback.api.type"


export const useGetTodoFeedbackQuery = (params: number) => {
    return useQuery({
        queryKey: ['getTodoFeedback', params],
        queryFn: () => feedbackApi.getTodoFeedback(params),
    })
}

export const useGetWeekTodoFeedbackQuery = (params: string) => {
    return useQuery({
        queryKey: ['getWeekTodoFeedback', params],
        queryFn: () => feedbackApi.getWeekTodoFeedback(params),
    })
}

export const useGetMonthTodoFeedbackQuery = (params: string) => {
    return useQuery({
        queryKey: ['getMonthTodoFeedback', params],
        queryFn: () => feedbackApi.getMonthTodoFeedback(params),
    })
}

export const useFeedbackQuestionMutation = () => {
    return useMutation({
        mutationFn: (params: ITodoQuestionRequest) => feedbackApi.feedbackQuestion(params),
    })
}