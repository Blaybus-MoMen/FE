/** Todo(일간) 피드백 응답 */
export interface ITodoFeedbackResponse {
    feedbackId: number;
    todoId: number;
    mentorComment: string;
    question: string;
    answer: string;
}

/** Todo(일간) 피드백 저장 요청 */
export interface ITodoFeedbackRequest {
    mentorComment: string;
    answer: string;
}

/** Todo 질문 등록 요청 */
export interface ITodoQuestionRequest {
    question: string;
}

/** 주간 피드백 응답 */
export interface IWeeklyFeedbackResponse {
    feedbackId: number;
    menteeId: number;
    weekStartDate: string;
    weekEndDate: string;
    overallReview: string;
    wellDone: string;
    toImprove: string;
    aiSummary: string;
}

/** 주간 피드백 저장 요청 */
export interface IWeeklyFeedbackRequest {
    weekStartDate: string;
    overallReview: string;
    wellDone: string;
    toImprove: string;
    aiSummary: string;
}

/** 주간 AI 요약 요청 */
export interface IWeeklyAiSummaryRequest {
    weekStartDate: string;
}

/** 월간 피드백 응답 */
export interface IMonthlyFeedbackResponse {
    feedbackId: number;
    menteeId: number;
    year: number;
    month: number;
    aiSummary: string;
    mentorComment: string;
}

/** 월간 피드백 저장 요청 */
export interface IMonthlyFeedbackRequest {
    year: number;
    month: number;
    aiSummary: string;
    mentorComment: string;
}

/** 월간 AI 요약 요청 */
export interface IMonthlyAiSummaryRequest {
    year: number;
    month: number;
}
