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
    },
    FEEDBACK: {
        TODO: '/feedback/todo',
        TODO_WEEK: '/study/feedback/weekly',
        TODO_MONTH: '/study/feedback/monthly'
    },
    NOTIFICATION: {
        LIST: '/notifications',
        UNREAD_LIST: '/notifications/unread-count',
    },
    FILE: {
        UPLOAD: '/files/upload',
    },
}