import type { CreateTodoRequest, UpdateTodoRequest } from '@/entities/manage/api/manage.api.type';
import {
    useConfirmTodoMutation,
    useCreateTodoMutation,
    useDeleteTodoMutation,
    useUpdateTodoMutation,
} from '@/entities/manage/queries/manage.queries';

interface Params {
    menteeId: number;
    date: string;
}

export const useTodoActions = ({ menteeId, date }: Params) => {
    const { mutate, isPending } = useConfirmTodoMutation(menteeId, date);
    const { mutate: deleteTodo } = useDeleteTodoMutation(menteeId, date);

    const createMutation = useCreateTodoMutation(menteeId);
    const updateMutation = useUpdateTodoMutation(menteeId, date);

    const toggleConfirm = (todoId: number, current: boolean) => {
        mutate({
            todoId,
            confirmed: !current,
        });
    };

    const createTodo = (body: CreateTodoRequest) => {
        createMutation.mutate(body);
    };

    const updateTodo = (todoId: number, body: UpdateTodoRequest) => {
        updateMutation.mutate({ todoId, body });
    };

    return {
        toggleConfirm,
        deleteTodo,
        isConfirming: isPending,

        createTodo,
        updateTodo,
        isCreating: createMutation.isPending,
        isUpdating: updateMutation.isPending,
    };
};
