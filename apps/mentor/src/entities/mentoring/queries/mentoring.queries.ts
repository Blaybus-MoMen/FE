import { useQuery } from '@tanstack/react-query';
import { mentoringApi } from '@/entities/mentoring/api/mentoring.api';

/** 멘티 목록 조회 쿼리 */
export const useGetMenteeListQuery = () => {
    return useQuery({
        queryKey: ['mentoring', 'menteeList'],
        queryFn: () => mentoringApi.getMenteeList(),
    });
};
