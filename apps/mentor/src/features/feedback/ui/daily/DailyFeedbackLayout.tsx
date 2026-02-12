import { useRef } from 'react';
import DailySummaryPanel from '@/features/feedback/ui/daily/DailySummaryPanel';
import { useSaveTodoFeedbackMutation } from '@/entities/feedback/queries/feedback.queries';

type Subject = '국어' | '영어' | '수학';

interface IProps {
    subject: Subject;
    title: string;
    todoId: number;
}

const SUBJECT_STYLE: Record<Subject, string> = {
    국어: 'bg-secondary-sky-pale',
    영어: 'bg-accent-purple',
    수학: 'bg-point-yellow',
};

/**
 * @description 일간 전체 레이아웃
 */
const DailyFeedbackLayout = ({ subject, title, todoId }: IProps) => {
    const formDataRef = useRef({ mentorComment: '', answer: '' });
    const saveMutation = useSaveTodoFeedbackMutation(todoId);

    const handleSave = () => {
        saveMutation.mutate(formDataRef.current);
    };

    return (
        <div className="flex flex-1 flex-col gap-6 min-h-0 px-4 pb-6 lg:px-10 lg:pb-10">
            <div className="flex w-full justify-between gap-4">
                <div className="flex items-center gap-4">
                    <span
                        className={`rounded-lg px-5 py-1.5 ui-caption ui-label text-grayscale-black ${SUBJECT_STYLE[subject]}`}
                    >
                        <h4>{subject}</h4>
                    </span>

                    <h3>{title} </h3>
                </div>

                <button
                    type="button"
                    onClick={handleSave}
                    disabled={saveMutation.isPending}
                    className="
                        hidden lg:block
                        rounded-[37px]
                        bg-primary-blue-dark
                        px-[30px] py-[12px]
                        ui-button text-grayscale-bg-gray
                        shadow-xl
                        disabled:opacity-50
                    "
                >
                    {saveMutation.isPending ? '저장 중...' : '저장하기'}
                </button>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar">
                <DailySummaryPanel
                    key={todoId}
                    todoId={todoId}
                    onSave={(data) => {
                        formDataRef.current = data;
                    }}
                />
            </div>

            <div className="flex justify-center lg:hidden">
                <button
                    type="button"
                    onClick={handleSave}
                    disabled={saveMutation.isPending}
                    className="
                        rounded-[37px]
                        bg-primary-blue-dark
                        px-[30px] py-[12px]
                        ui-button text-grayscale-bg-gray
                        shadow-xl
                        disabled:opacity-50
                    "
                >
                    {saveMutation.isPending ? '저장 중...' : '저장하기'}
                </button>
            </div>
        </div>
    );
};

export default DailyFeedbackLayout;
