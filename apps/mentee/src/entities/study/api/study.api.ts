import { ApiHelper } from '@/shared/api/api.base'
import { API_PATH } from '@/shared/api/api.path'
import type { ICreateTodoRequest, IDailyStatsResponse, IGetMyInfoResponse, IGetMyPageInfoResponse, IStudyTimeResponse, ITodoDetailResponse, ITodoListResponse, ITodoSubmissionResponse, IUpdateCheerMessageRequest, IUpdateStudyTimeRequest } from './study.api.type'
import type { ApiResponse } from '@/shared/model/type'

/** 스터디 API */
export const studyApi = {
    getMyInfo: async () => {
        const response = await ApiHelper.get<ApiResponse<IGetMyInfoResponse>>(API_PATH.STUDY.MYINFO)
        return response.data
    },
    getMyPageInfo: async () => {
        const response = await ApiHelper.get<ApiResponse<IGetMyPageInfoResponse>>(API_PATH.STUDY.MYPAGE)
        return response.data
    },
    getDailyStats: async (params: string) => {
        const response = await ApiHelper.get<ApiResponse<IDailyStatsResponse>>(`${API_PATH.STUDY.DAILY_STATS}?date=${params}`)
        return response.data
    },
    getDailyTodoList: async (params: string) => {
        const response = await ApiHelper.get<ApiResponse<ITodoListResponse[]>>(`${API_PATH.STUDY.TODO_LIST}?date=${params}`)
        return response.data
    },
    getWeeklyTodoList: async (params: string) => {
        const response = await ApiHelper.get<ApiResponse<ITodoListResponse[]>>(`${API_PATH.STUDY.TODO_LIST}?weekStartDate=${params}`)
        return response.data
    },
    getMonthlyTodoList: async (params: string) => {
        // const response = await ApiHelper.get<ITodoListResponse[]>(`${API_PATH.STUDY.TODO_LIST}?yearMonth=${params}`)
        // return response
        return [{
            todoId: 1,
            title: "수학 문제 풀기",
            subject: "MATH",
            goalDescription: "쎈 수학 킬러문항 5문제 풀기",
            startDate: "2026-02-02",
            endDate: "2026-02-02",
            mentorConfirmed: false,
            creatorType: "MENTOR",
            hasFeedback: false,
            studyTimeHours: 0,
            studyTimeMinutes: 0,
            studyTimeSeconds: 0
        },]
    },
    getTodoDetail: async (params: string) => {
        const response = await ApiHelper.get<ITodoDetailResponse>(`${API_PATH.STUDY.TODO_LIST}/${params}`)
        return response
    },
    getDailyStudyTime: async (params: string) => {
        const response = await ApiHelper.get<IStudyTimeResponse>(`${API_PATH.STUDY.STUDY_TIME}?date=${params}`)
        return response
    },
    getMonthlyStudyTime: async (params: string) => {
        const response = await ApiHelper.get<IStudyTimeResponse>(`${API_PATH.STUDY.STUDY_TIME}?yearMonth=${params}`)
        return response
    },
    getWeeklyStudyTime: async (params: string) => {
        const response = await ApiHelper.get<IStudyTimeResponse>(`${API_PATH.STUDY.STUDY_TIME}?weekStartDate=${params}`)
        return response
    },
    getTodoSubmission: async (params: number) => {
        const response = await ApiHelper.get<ITodoSubmissionResponse>(`${API_PATH.STUDY.TODO_SUBMISSION(params)}`)
        return response
    },
    updateCheerMessage: async (params: IUpdateCheerMessageRequest) => {
        const response = await ApiHelper.patch<string>(API_PATH.STUDY.CHEER_MESSAGE, params)
        return response
    },
    createTodo: async (params: ICreateTodoRequest) => {
        const response = await ApiHelper.post(API_PATH.STUDY.TODO, params)
        return response
    },
    updateStudyTime: async (todoId: number, params: IUpdateStudyTimeRequest) => {
        const response = await ApiHelper.patch(API_PATH.STUDY.TODO_STUDY_TIME(todoId), params)
        return response
    },
}   