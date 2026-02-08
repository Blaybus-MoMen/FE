import { useMemo } from 'react';
import { useGetMenteeQuery } from '@/entities/manage/queries/manage.queries';

/**
 * @description 멘티 단건 조회 커스텀 훅
 */
const useMentee = (menteeId: number) => {
    const { data, isLoading, isError } = useGetMenteeQuery(menteeId);

    /** 멘티 정보 */
    const mentee = useMemo(() => {
        return data?.data ?? null;
    }, [data]);

    return {
        mentee,
        isLoading,
        isError,
    };
};

export default useMentee;
