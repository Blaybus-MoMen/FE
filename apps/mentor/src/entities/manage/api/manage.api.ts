import { ApiHelper } from '@/shared/api/api.base';
import { API_PATH } from '@/shared/api/api.path';
import type { ApiResponse } from '@/shared/model/api.type';
import type {
    CreateTodoRequest,
    CreateTodoResponse,
    IMenteeCardResponse,
    ITodoConfirmRequest,
    ITodoDetailResponse,
    ITodoResponse,
    UpdateTodoRequest,
} from './manage.api.type';

/** 멘토링 API */
export const manageApi = {
    /**
     * @description 담당 멘티 단일 조회 API
     */
    getMentee: async (menteeId: number) => {
        const response = await ApiHelper.get<ApiResponse<IMenteeCardResponse>>(
            API_PATH.MENTORING.MENTEE.DETAIL(menteeId)
        );
        return response;
    },

    /**
     * @description 특정 멘티의 특정 날짜 할 일 조회 API
     */
    getMenteeTodosByDate: async (params: {
        menteeId: number;
        yearMonth?: string;
        weekStartDate?: string;
        date?: string;
    }) => {
        const { menteeId, ...query } = params;

        return ApiHelper.get<ApiResponse<ITodoResponse[]>>(API_PATH.MENTORING.TODO.DAY(menteeId), { params: query });
    },

    /**
     * @description 멘토 확인 토글
     */
    confirmTodo: async (menteeId: number, todoId: number, body: ITodoConfirmRequest) => {
        return ApiHelper.patch<ApiResponse<{}>>(API_PATH.MENTORING.TODO.CONFIRM(menteeId, todoId), body);
    },

    /**
     * @description 투두 생성 API
     */
    createTodo: (menteeId: number, body: CreateTodoRequest) => {
        return ApiHelper.post<CreateTodoResponse>(API_PATH.MENTORING.TODO.CREATE(menteeId), body);
    },

    /**
     * @description 투두 수정 API
     */
    updateTodo: (menteeId: number, todoId: number, body: UpdateTodoRequest) => {
        return ApiHelper.patch<ApiResponse<{}>>(API_PATH.MENTORING.TODO.UPDATE(menteeId, todoId), body);
    },

    /**
     * @description 투두 삭제 API
     */
    deleteTodo: (menteeId: number, todoId: number) => {
        return ApiHelper.delete<ApiResponse<{}>>(API_PATH.MENTORING.TODO.DELETE(menteeId, todoId));
    },

    /**
     * @description Todo 상세 조회 API
     */
    getTodoDetail: async (todoId: number) => {
        return ApiHelper.get<ApiResponse<ITodoDetailResponse>>(API_PATH.MENTORING.TODO.DETAIL(todoId));
    },
};
