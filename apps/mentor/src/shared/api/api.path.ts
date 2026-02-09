export const API_PATH = {
    AUTH: {
        LOGIN: '/auth/login',
        LOGOUT: '/auth/logout',
        REFRESH: '/auth/refresh',
    },
    MENTORING: {
        MENTEE: {
            LIST: '/mentoring/mentees',
            DETAIL: (menteeId: number | string) => `/mentoring/mentees/${menteeId}`,
        },
        TODO: {
            DAY: (menteeId: number) => `/mentoring/mentees/${menteeId}/todos`,
            DETAIL: (todoId: number) => `/mentoring/todos/${todoId}`,
            CONFIRM: (menteeId: number, todoId: number) => `/mentoring/mentees/${menteeId}/todos/${todoId}/confirm`,
            CREATE: (menteeId: number) => `/mentoring/mentees/${menteeId}/todos`,
            UPDATE: (menteeId: number, todoId: number) => `/mentoring/mentees/${menteeId}/todos/${todoId}`,
            DELETE: (menteeId: number, todoId: number) => `/mentoring/mentees/${menteeId}/todos/${todoId}`,
        },
    },
    FEEDBACK: {
        TODO: {
            GET: (todoId: number) => `/feedback/todo/${todoId}`,
            SAVE: (todoId: number) => `/feedback/todo/${todoId}`,
            QUESTION: (todoId: number) => `/feedback/todo/${todoId}/question`,
        },
        WEEKLY: {
            LIST: (menteeId: number) => `/feedback/mentees/${menteeId}/weekly`,
            DETAIL: (feedbackId: number) => `/feedback/weekly/${feedbackId}`,
            SAVE: (menteeId: number) => `/feedback/mentees/${menteeId}/weekly`,
            AI_SUMMARY: (menteeId: number) => `/feedback/mentees/${menteeId}/weekly/ai-summary`,
        },
        MONTHLY: {
            LIST: (menteeId: number) => `/feedback/mentees/${menteeId}/monthly`,
            DETAIL: (feedbackId: number) => `/feedback/monthly/${feedbackId}`,
            SAVE: (menteeId: number) => `/feedback/mentees/${menteeId}/monthly`,
            AI_SUMMARY: (menteeId: number) => `/feedback/mentees/${menteeId}/monthly/ai-summary`,
        },
    },
};
