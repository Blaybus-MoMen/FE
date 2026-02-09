import { useMutation, useQuery } from "@tanstack/react-query"
import { studyApi } from "../api/study.api"
import type { ICreateTodoRequest, IUpdateCheerMessageRequest, IUpdateStudyTimeRequest, IUpdateTodoRequest } from "../api/study.api.type"


export const useGetMyPageInfoQuery = () => {
    return useQuery({
        queryKey: ['getMyPageInfo'],
        queryFn: () => studyApi.getMyPageInfo(),
    })
}

export const useGetMyInfoQuery = () => {
    return useQuery({
        queryKey: ['getMyInfo'],
        queryFn: () => studyApi.getMyInfo(),
    })
}

export const useGetDailyStatsQuery = (params: string) => {
    return useQuery({
        queryKey: ['getDailyStats', params],
        queryFn: () => studyApi.getDailyStats(params),
    })
}


export const useGetDailyTodoListQuery = (params: string) => {
    return useQuery({
        queryKey: ['getDailyTodoList', params],
        queryFn: () => studyApi.getDailyTodoList(params),
        enabled: !!params,
    })
}

export const useGetWeeklyTodoListQuery = (params: string) => {
    return useQuery({
        queryKey: ['getWeeklyTodoList', params],
        queryFn: () => studyApi.getWeeklyTodoList(params),
        enabled: !!params,
    })
}

export const useGetMonthlyTodoListQuery = (params: string) => {
    return useQuery({
        queryKey: ['getMonthlyTodoList', params],
        queryFn: () => studyApi.getMonthlyTodoList(params),
        enabled: !!params,
    })
}

export const useGetTodoDetailQuery = (params: number) => {
    return useQuery({
        queryKey: ['getTodoDetail', params],
        queryFn: () => studyApi.getTodoDetail(params),
        enabled: !!params,
    })
}

export const useGetDailyStudyTimeQuery = (params: string) => {
    return useQuery({
        queryKey: ['getDailyStudyTime', params],
        queryFn: () => studyApi.getDailyStudyTime(params),
        enabled: !!params,
    })
}

export const useGetWeeklyStudyTimeQuery = (params: string) => {
    return useQuery({
        queryKey: ['getWeeklyStudyTime', params],
        queryFn: () => studyApi.getWeeklyStudyTime(params),
        enabled: !!params,
    })
}

export const useGetMonthlyStudyTimeQuery = (params: string) => {
    return useQuery({
        queryKey: ['getMonthlyStudyTime', params],
        queryFn: () => studyApi.getMonthlyStudyTime(params),
        enabled: !!params,
    })
}

export const useGetTodoSubmissionQuery = (params: number) => {
    return useQuery({
        queryKey: ['getTodoSubmission', params],
        queryFn: () => studyApi.getTodoSubmission(params),
        enabled: !!params,
    })
}

export const useUpdateCheerMessageMutation = () => {
    return useMutation({
        mutationFn: (params: IUpdateCheerMessageRequest) => studyApi.updateCheerMessage(params),
    })
}

export const useUpdateStudyTimeMutation = () => {
    return useMutation({
        mutationFn: ({ todoId, studyTime }: { todoId: number } & IUpdateStudyTimeRequest) =>
            studyApi.updateStudyTime(todoId, { studyTime }),
    })
}

export const useCreateTodoMutation = () => {
    return useMutation({
        mutationFn: (params: ICreateTodoRequest) => studyApi.createTodo(params),
    })
}

export const useDeleteTodoMutation = () => {
    return useMutation({
        mutationFn: (params: number) => studyApi.deleteTodo(params),
    })
}

export const useUpdateTodoMutation = () => {
    return useMutation({
        mutationFn: (params: IUpdateTodoRequest) => studyApi.updateTodo(params),
    })
}