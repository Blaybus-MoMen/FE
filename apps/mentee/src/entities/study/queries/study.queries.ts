import { useMutation, useQuery } from "@tanstack/react-query"
import { studyApi } from "../api/study.api"
import type { ICreateTodoRequest, ISubmitTodoRequest, IUpdateCheerMessageRequest, IUpdateStudyTimeRequest, IUpdateTodoRequest } from "../api/study.api.type"


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


export const useGetDailyTodoListQuery = (params: string, filterSubject?: string[]) => {
    return useQuery({
        queryKey: ['getDailyTodoList', params, filterSubject],
        queryFn: () => studyApi.getDailyTodoList(params, filterSubject ?? []),
        enabled: !!params,
    })
}

export const useGetWeeklyTodoListQuery = (params: string, filterSubject: string[]) => {
    return useQuery({
        queryKey: ['getWeeklyTodoList', params, filterSubject],
        queryFn: () => studyApi.getWeeklyTodoList(params, filterSubject),
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
        mutationFn: (params: IUpdateStudyTimeRequest) =>
            studyApi.updateStudyTime(params),
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

export const useSubmitTodoMutation = () => {
    return useMutation({
        mutationFn: (params: ISubmitTodoRequest) => studyApi.subMissionTodo(params),
    })
}