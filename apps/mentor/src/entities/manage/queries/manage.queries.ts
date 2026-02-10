import { useMutation, useQuery, useQueryClient, type UseQueryOptions } from '@tanstack/react-query';
import { manageApi } from '@/entities/manage/api/manage.api';
import type { CreateTodoRequest, UpdateTodoRequest } from '../api/manage.api.type';

/** 멘티 단건 조회 쿼리 */
export const useGetMenteeQuery = (menteeId: number) => {
    return useQuery({
        queryKey: ['mentoring', 'mentee', menteeId],
        queryFn: () => manageApi.getMentee(menteeId),
        enabled: !!menteeId,
    });
};

interface UseGetMenteeTodosParams {
    menteeId: number;
    yearMonth?: string;
    weekStartDate?: string;
    date?: string;
}

/** 특정 멘티의 특정 날짜 할 일 조회 쿼리 */
export const useGetMenteeTodosQuery = ({
    menteeId,
    yearMonth,
    weekStartDate,
    date,
}: UseGetMenteeTodosParams & { mode?: 'daily' | 'weekly' | 'monthly' }) => {
    return useQuery({
        queryKey: [
            'mentoring',
            'mentee',
            menteeId,
            'todos',
            {
                date,
                weekStartDate,
                yearMonth,
            },
        ],
        queryFn: () =>
            manageApi.getMenteeTodosByDate({
                menteeId,
                yearMonth,
                weekStartDate,
                date,
            }),
        enabled: !!menteeId && (!!date || !!weekStartDate || !!yearMonth),
    });
};

/** Todo 확인 토글 뮤테이션 */
export const useConfirmTodoMutation = (menteeId: number, date: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ todoId, confirmed }: { todoId: number; confirmed: boolean }) =>
            manageApi.confirmTodo(menteeId, todoId, { confirmed }),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['mentoring', 'mentee', menteeId, 'todos'],
                exact: false,
            });
        },
    });
};

/** Todo 생성 뮤테이션 */
export const useCreateTodoMutation = (menteeId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (body: CreateTodoRequest) => manageApi.createTodo(menteeId, body),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['mentoring', 'mentee', menteeId, 'todos'],
            });
        },
    });
};

/** Todo 수정 뮤테이션 */
export const useUpdateTodoMutation = (menteeId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ todoId, body }: { todoId: number; body: UpdateTodoRequest }) =>
            manageApi.updateTodo(menteeId, todoId, body),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ['mentoring', 'mentee', menteeId, 'todos'],
                exact: false,
            });

            queryClient.invalidateQueries({
                queryKey: ['mentoring', 'todo', variables.todoId],
            });
        },
    });
};

export const useDeleteTodoMutation = (menteeId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (todoId: number) => manageApi.deleteTodo(menteeId, todoId),

        onSuccess: (_, todoId) => {
            queryClient.invalidateQueries({
                queryKey: ['mentoring', 'mentee', menteeId, 'todos'],
                exact: false,
            });

            queryClient.invalidateQueries({
                queryKey: ['mentoring', 'todo', todoId],
            });
        },
    });
};

type TodoDetailResponse = Awaited<ReturnType<typeof manageApi.getTodoDetail>>;

export const useGetTodoDetailQuery = (
    todoId: number,
    options?: Omit<UseQueryOptions<TodoDetailResponse>, 'queryKey' | 'queryFn'>
) => {
    return useQuery({
        queryKey: ['mentoring', 'todo', todoId],
        queryFn: () => manageApi.getTodoDetail(todoId),
        enabled: !!todoId,
        ...options,
    });
};
