export interface ITodoFeedbackResponse {
    feedbackId: number,
    todoId: number,
    mentorComment: string,
    question: string,
    answer: string
}

export interface IWeekTodoFeedbackResponse {
    feedbackId: number,
    menteeId: number,
    weekStartDate: string,
    weekEndDate: string,
    overallReview: string,
    wellDone: string,
    toImprove: string,
    aiSummary: string,

}

export interface IMonthTodoFeedbackResponse {
    feedbackId: number,
    menteeId: number,
    year: number,
    month: number,
    aiSummary: string,
    mentorComment: string,
}