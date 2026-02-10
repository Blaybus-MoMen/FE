export const API_PATH = {
    AUTH: {
        LOGIN: '/auth/login',
        LOGOUT: '/auth/logout',
    },
    STUDY: {
        DAILY_STATS: '/study/daily-stats',
        MYINFO: '/study/me',
        MYPAGE: '/study/mypage',
        TODO_LIST: '/study/todos',
        STUDY_TIME: '/study/study-time',
        CHEER_MESSAGE: '/study/me/cheer-message',
        TODO: '/study/todos',
        TODO_SUBMISSION: (todoId: number) => `/study/todos/${todoId}/submission`,
        TODO_STUDY_TIME: (todoId: number) => `/study/todos/${todoId}/study-time`,
        CARD: '/study/me/cards',
        SUBMIT: (todoId: number) => `/study/todos/${todoId}/submit`,
    },
    FEEDBACK: {
        TODO: '/feedback/todo',
        TODO_WEEK: '/study/feedback/weekly',
        TODO_MONTH: '/study/feedback/monthly',
        QUESTION: (feedbackId: number) => `/feedback/todo/${feedbackId}/question`,
    },
    NOTIFICATION: {
        LIST: '/notifications',
        UNREAD_LIST: '/notifications/unread-count',
        READ: (id: number) => `/notifications/${id}/read`,
    },
    FILE: {
        UPLOAD: '/files/upload',
        DOWNLOAD: `/files`,
    },
}