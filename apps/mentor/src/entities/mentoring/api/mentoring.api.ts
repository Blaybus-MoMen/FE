import { ApiHelper } from '@/shared/api/api.base';
import { API_PATH } from '@/shared/api/api.path';
import type { ApiResponse } from '@/shared/model/api.type';
import type { IGetMenteeListResponse } from './mentoring.api.type';

/** 멘토링 API */
export const mentoringApi = {
    /**
     * @description 담당 멘티 목록 조회 API
     */
    getMenteeList: async () => {
        const response = await ApiHelper.get<ApiResponse<IGetMenteeListResponse>>(API_PATH.MENTORING.GETMENTEE);
        return response;
    },
};
