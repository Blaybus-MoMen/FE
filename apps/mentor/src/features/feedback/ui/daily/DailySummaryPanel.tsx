import { useEffect, useRef, useState } from 'react';
import { ArrowRightLeft } from 'lucide-react';

import Box from '@/features/feedback/ui/common/Box';
import { useGetTodoFeedbackQuery, useGetTodoSubmissionQuery } from '@/entities/feedback/queries/feedback.queries';

interface Props {
    todoId: number;
    onSave: (data: { mentorComment: string; answer: string }) => void;
}

/**
 * @description 일간 요약 패널
 */
const DailySummaryPanel = ({ todoId, onSave }: Props) => {
    const { data: feedbackRes } = useGetTodoFeedbackQuery(todoId);
    const feedback = feedbackRes?.data;

    const { data: submissionRes } = useGetTodoSubmissionQuery(todoId);
    const submission = submissionRes?.data;
    const files = submission?.files ?? [];

    const [mentorComment, setMentorComment] = useState('');
    const [answer, setAnswer] = useState('');
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const onSaveRef = useRef(onSave);
    onSaveRef.current = onSave;

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const resolveFileUrl = (url: string) => {
        if (!url) return '';
        if (url.startsWith('http')) return url;
        return `${API_BASE_URL}${url}`;
    };

    useEffect(() => {
        setMentorComment(feedback?.mentorComment ?? '');
        setAnswer(feedback?.answer ?? '');
    }, [feedback, todoId]);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setPreviewUrl(null);
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, []);

    useEffect(() => {
        onSaveRef.current({ mentorComment, answer });
    }, [mentorComment, answer]);

    return (
        <div className="flex flex-col gap-6">
            <Box title="학습 점검" mentor={false}>
                <div className="flex flex-col gap-3">
                    <div className="text-base text-grayscale-dark-gray whitespace-pre-wrap">
                        {submission?.memo || '제출된 학습 내용이 없습니다.'}
                    </div>

                    {files.length > 0 && (
                        <div className="h-[140px] overflow-x-auto max-w-full">
                            <div className="flex gap-3 pr-2 min-w-max">
                                {files.map((file) => (
                                    <button
                                        key={file.fileId}
                                        className="shrink-0 w-[120px] h-[120px] rounded-xl overflow-hidden border bg-white"
                                        onClick={() => setPreviewUrl(file.fileUrl)}
                                    >
                                        <img
                                            src={resolveFileUrl(file.fileUrl)}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </Box>

            <Box
                title="멘토 피드백"
                placeholder="피드백을 입력해주세요."
                value={mentorComment}
                onChange={setMentorComment}
            />

            <section className="flex flex-col md:flex-row md:h-[250px] gap-6 p-4 rounded-2xl bg-white shadow-md">
                <div className="flex flex-col gap-3 flex-1">
                    <span className="self-start inline-block rounded-full px-4 py-1 ui-overline bg-grayscale-border text-grayscale-dark-gray">
                        질문
                    </span>
                    <div className="flex-1 rounded-xl p-4 text-base text-grayscale-dark-gray whitespace-pre-wrap">
                        {feedback?.question ?? ''}
                    </div>
                </div>

                <div className="hidden md:flex items-start pt-1">
                    <ArrowRightLeft className="text-grayscale-light-gray" size={20} />
                </div>

                <div className="flex flex-col gap-3 flex-1">
                    <span className="self-start inline-block rounded-full px-4 py-1 ui-overline bg-grayscale-dark-gray text-white">
                        답변
                    </span>
                    <textarea
                        placeholder="답변을 입력해주세요."
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        className="flex-1 resize-none rounded-xl bg-grayscale-bg-gray p-4 outline-none border-0 placeholder:text-grayscale-light-gray text-base"
                    />
                </div>
            </section>

            {previewUrl && (
                <div
                    className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center"
                    onClick={() => setPreviewUrl(null)}
                >
                    <div
                        className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={resolveFileUrl(previewUrl)}
                            className="block max-w-[90vw] max-h-[90vh] object-contain rounded-xl bg-white"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default DailySummaryPanel;
