export interface IGetMyPageInfoResponse {
    name: string
    profileImageUrl: string | null
    grade: string | null
    mentorName: string | null
    cards: string[]
    totalTodos: number
    completedTodos: number
    overallCompletionRate: number
    subjectCompletionRates: Record<string, number>
    totalStudyHours: string
    totalStudyMinutes: string
    totalStudySeconds: string
    daysWithUs: number
}

export interface IGetMyInfoResponse {
    menteeId: number
    userId: number
    name: string
    profileImageUrl: string
    grade: string
    cards: string[]
    subjects: string[]
    cheerMessage: string
}

export interface IDailyStatsResponse {
    date: string,
    total: number,
    completed: number,
    remaining: number,
    completionRatePercent: number
    message: string
}

export interface ITodoListResponse {
    todoId: number,
    title: string,
    subject: string,
    goalDescription: string,
    startDate: string,
    endDate: string,
    mentorConfirmed: boolean,
    creatorType: string,
    hasFeedback: boolean,
    studyTimeHours: string,
    studyTimeMinutes: string,
    studyTimeSeconds: string
    isCompleted: boolean,

}


export interface ITodoDetailResponse {
    todoId: number,
    title: string,
    subject: string,
    goalDescription: string,
    startDate: string,
    endDate: string,
    mentorConfirmed: boolean,
    creatorType: string,
    isCompleted: boolean,
    hasFeedback: boolean,
    studyTimeHours: number,
    studyTimeMinutes: number,
    studyTimeSeconds: number,
    materials: [
        {
            materialId: number,
            fileUrl: string,
            fileName: string,
        }
    ]
}

export interface IStudyTimeResponse {
    totalHours: number,
    totalMinutes: number,
    totalSeconds: number,
    subjectStudyTime: {
        [key: string]: {
            hours: number,
            minutes: number,
            seconds: number
        }
    }
}

export interface ITodoSubmissionResponse {
    submissionId: number,
    todoId: number,
    memo: string,
    files: string[],
    submittedAt: string,
    aiAnalysisStatus: string,
    studyDensityScore: number,
    aiCheckComment: string
}

export interface IUpdateCheerMessageRequest {
    cheerMessage: string
}
export interface ICreateTodoRequest {
    title: string;
    subject: string;
    goalDescription: string;
    startDate: string;
    endDate: string;
    repeatDays: string[];
    materials: {
        fileUrl: string;
        fileName: string;
    }[];
}

export interface IUpdateTodoRequest extends ICreateTodoRequest {
    todoId: number
}
export interface IUpdateStudyTimeRequest {
    todoId: number
    studyTime: number
}

export interface ISubmitTodoRequest {
    fileUrl: string
    fileName: string
    memo: string
    todoId: number
}

export interface IUpdateCardRequest {
    cards: string[]
}