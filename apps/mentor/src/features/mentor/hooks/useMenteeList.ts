import { useMemo } from 'react';
import { useGetMenteeListQuery } from '@/entities/mentoring/queries/mentoring.queries';

/**
 * @description 멘티 목록 조회 커스텀 훅
 */
const useMenteeList = () => {
    const { data, isLoading, isError } = useGetMenteeListQuery();

    /** 멘티 목록 */
    const menteeList = useMemo(() => {
        return data?.data ?? [];
    }, [data]);

    return {
        menteeList,
        isLoading,
        isError,
    };
};

export default useMenteeList;
