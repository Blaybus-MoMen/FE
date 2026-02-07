import { Trash2 } from 'lucide-react';

type Subject = '국어' | '영어' | '수학';

interface FeedbackCardProps {
    subject: Subject;
    task: string;
    goal: string;
    isConfirmed: boolean;
    showActions?: boolean;
    onEdit?: () => void;
    onDelete?: () => void;
}

const SUBJECT_STYLE: Record<Subject, string> = {
    국어: 'bg-secondary-sky-pale',
    영어: 'bg-accent-purple',
    수학: 'bg-point-yellow',
};

/**
 * @description 학생 목록 아이템
 */
const StudentItem = ({ subject, task, goal, isConfirmed, showActions = true, onEdit, onDelete }: FeedbackCardProps) => {
    return (
        <div className="w-full rounded-2xl bg-white p-4 shadow-md">
            <div className="hidden md:flex items-center gap-6">
                <div
                    className="
            grid flex-1 items-center gap-1
            grid-cols-[40%_35%_10%_15%]
            min-w-0
        "
                >
                    <div className="flex gap-2 items-center">
                        <span
                            className={`rounded-lg w-[66px] py-1.5 ui-caption ui-label text-center ${SUBJECT_STYLE[subject]}`}
                        >
                            {subject}
                        </span>

                        <h4 className="truncate text-black" title={task}>
                            {task}
                        </h4>
                    </div>

                    <div className="flex gap-2 items-center">
                        <span className="rounded-md bg-grayscale-medium-gray px-3 py-1 text-center ui-caption text-white">
                            학습 목표
                        </span>

                        <span className="truncate ui-caption text-grayscale-dark-gray" title={goal}>
                            {goal}
                        </span>
                    </div>

                    <button
                        type="button"
                        className={`rounded-full px-5 py-1.5 ui-caption whitespace-nowrap justify-self-start ${
                            isConfirmed
                                ? 'bg-system-success text-white'
                                : 'bg-grayscale-light-gray border-[1.5px] border-grayscale-medium-gray text-black'
                        }`}
                    >
                        멘토 확인
                    </button>
                </div>

                <div className="flex shrink-0 items-center gap-3 w-[160px] justify-end">
                    {showActions ? (
                        <>
                            <button
                                onClick={onEdit}
                                className="rounded-full border-2 border-primary-blue-dark px-5 py-1.5 ui-button text-primary-blue-dark"
                            >
                                수정하기
                            </button>

                            <button
                                onClick={onDelete}
                                className="flex p-1.5 items-center justify-center rounded-full border-2 border-primary-blue-dark text-primary-blue-dark"
                            >
                                <Trash2 size={20} />
                            </button>
                        </>
                    ) : (
                        <div />
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-4 md:hidden">
                <div className="flex items-center gap-4">
                    <span className={`rounded-lg px-5 py-1.5 ui-caption ${SUBJECT_STYLE[subject]}`}>{subject}</span>
                    <span className="truncate text-xl font-bold" title={task}>
                        {task}
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    <span className="rounded-md bg-grayscale-medium-gray px-3 py-1 ui-caption text-white">
                        학습 목표
                    </span>
                    <span className="truncate ui-caption text-grayscale-dark-gray" title={goal}>
                        {goal}
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <button
                        type="button"
                        className={`rounded-full px-4 py-1 ui-caption ${
                            isConfirmed ? 'bg-system-success text-white' : 'bg-grayscale-light-gray text-black'
                        }`}
                    >
                        멘토 확인
                    </button>

                    {showActions && (
                        <div className="flex gap-3">
                            <button
                                onClick={onEdit}
                                className="rounded-full border-2 border-primary-blue-dark px-5 py-2 ui-button text-primary-blue-dark"
                            >
                                수정하기
                            </button>

                            <button
                                onClick={onDelete}
                                className="flex h-[44px] w-[44px] items-center justify-center rounded-full border-2 border-primary-blue-dark text-primary-blue-dark"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentItem;
