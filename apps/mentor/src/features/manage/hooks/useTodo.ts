import { useMemo } from 'react';
import { useGetMenteeTodosQuery } from '@/entities/manage/queries/manage.queries';

interface Params {
    menteeId: number;
    yearMonth: string;
    weekStartDate: string;
    date: string;
}

/**
 * @description 투두 관련 훅
 */
const useTodos = ({ menteeId, yearMonth, weekStartDate, date }: Params) => {
    const { data, isLoading, isError } = useGetMenteeTodosQuery({
        menteeId,
        yearMonth,
        weekStartDate,
        date,
    });

    /** 할 일 목록 */
    const todos = useMemo(() => {
        return data?.data ?? [];
    }, [data]);

    return {
        todos,
        isLoading,
        isError,
    };
};

export default useTodos;
