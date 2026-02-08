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
            CONFIRM: (menteeId: number, todoId: number) => `/mentoring/mentees/${menteeId}/todos/${todoId}/confirm`,
            CREATE: (menteeId: number) => `/mentoring/mentees/${menteeId}/todos`,
            UPDATE: (menteeId: number, todoId: number) => `/mentoring/mentees/${menteeId}/todos/${todoId}`,
            DELETE: (menteeId: number, todoId: number) => `/mentoring/mentees/${menteeId}/todos/${todoId}`,
        },
    },
};
