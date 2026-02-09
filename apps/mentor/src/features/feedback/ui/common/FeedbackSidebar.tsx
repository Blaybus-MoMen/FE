import homeLogo from '@/assets/images/white-home-logo.svg';
import StudentCard from '@/features/manage/ui/StudentCard';
import FeedbackPeriodHeader from '@/features/feedback/ui/common/FeedbackPeriodHeader';
import FeedbackList from '@/features/feedback/ui/common/SideBarFeedbackList';
import Avatar from '@/shared/ui/Avatar';
import { useNavigate } from 'react-router';
import type { IMenteeCardResponse } from '@/entities/manage/api/manage.api.type';
import type { FeedbackViewMode } from '@/shared/model/feedback';

interface Props {
    mode: FeedbackViewMode;
    onChangeMode: (mode: FeedbackViewMode) => void;
    menteeList: IMenteeCardResponse[];
    selectedMenteeId: number | null;
    onSelectMentee: (menteeId: number) => void;
    selectedTodoId: number | null;
    selectedFeedbackId: number | null;
    onSelectTodo: (todoId: number) => void;
    onSelectFeedback: (feedbackId: number) => void;
    periodLabel: string;
    onPeriodPrev: () => void;
    onPeriodNext: () => void;
    dateParams: {
        yearMonth: string;
        weekStartDate: string;
        date: string;
        year: number;
        month: number;
    };
}

/**
 * @description 피드백 페이지 좌측 사이드바
 */
const FeedbackSidebar = ({
    mode,
    onChangeMode,
    menteeList,
    selectedMenteeId,
    onSelectMentee,
    selectedTodoId,
    selectedFeedbackId,
    onSelectTodo,
    onSelectFeedback,
    periodLabel,
    onPeriodPrev,
    onPeriodNext,
    dateParams,
}: Props) => {
    const navigate = useNavigate();

    const selectedMentee = menteeList.find((m) => m.menteeId === selectedMenteeId);

    return (
        <aside
            className={`flex z-999 lg:min-h-screen lg:h-full w-full lg:w-[430px] flex-col bg-primary-blue pt-6 lg:pt-10 text-white shadow-[6px_0_20px_rgba(0,0,0,0.15)]`}
        >
            <header className="z-10 px-4 lg:px-8 flex items-start justify-between mb-6 sm:items-center">
                <div className="flex flex-col gap-4 items-start sm:flex-row sm:gap-6">
                    <img
                        src={homeLogo}
                        onClick={() => navigate('/home')}
                        alt="home-logo"
                        className="h-[28px] w-auto cursor-pointer"
                    />

                    <div className="flex gap-6">
                        <h3 className="text-grayscale-medium-gray cursor-pointer" onClick={() => navigate('/manage')}>
                            학습관리
                        </h3>
                        <h3 className="cursor-pointer">피드백</h3>
                    </div>
                </div>

                <div className="flex lg:hidden items-center gap-[9px] rounded-[100px] bg-[#666666]/30 pl-[20px] shadow-[inset_0px_2px_4px_1px_#00000040]">
                    <p className="ui-label text-white">설쌤</p>
                    <Avatar className="h-[36px] w-[36px]">
                        <span>쌤</span>
                    </Avatar>
                </div>
            </header>

            <div className="px-4 lg:px-8 flex gap-4 mb-6 lg:justify-center">
                {(['daily', 'weekly', 'monthly'] as const).map((key) => (
                    <button
                        key={key}
                        onClick={() => onChangeMode(key)}
                        className={`px-4 py-1 rounded-full ui-label ${
                            mode === key ? 'bg-point-yellow text-black' : 'bg-white/20'
                        }`}
                    >
                        {key === 'daily' && '일간'}
                        {key === 'weekly' && '주간'}
                        {key === 'monthly' && '월간'}
                    </button>
                ))}
            </div>

            <div className="flex flex-1 min-h-0 flex-col">
                <>
                    <div className="mx-4 lg:mx-0 mb-6">
                        <div className="w-full lg:w-[370px] lg:ml-auto rounded-[24px] lg:rounded-l-[24px] lg:rounded-r-none bg-white p-4 shadow mb-4">
                            {menteeList.length > 1 && (
                                <div className="flex gap-2 mb-3 overflow-x-auto no-scrollbar">
                                    {menteeList.map((mentee) => (<button key={mentee.menteeId} onClick={() => onSelectMentee(mentee.menteeId)} className={`shrink-0 px-3 py-1 rounded-full text-sm ${selectedMenteeId === mentee.menteeId ? 'bg-primary-blue text-white' : 'bg-grayscale-bg-gray text-grayscale-dark-gray'}`}>{mentee.name}</button>))}
                                </div>
                            )}
                            {selectedMentee && <StudentCard mentee={selectedMentee} />}
                        </div>
                    </div>

                    <div className="flex flex-col flex-1 min-h-0 w-full lg:w-[395px] bg-point-yellow rounded-none lg:rounded-tl-[32px] lg:ml-auto">
                        <FeedbackPeriodHeader label={periodLabel} onPrev={onPeriodPrev} onNext={onPeriodNext} />
                        {selectedMenteeId && (
                            <FeedbackList
                                mode={mode}
                                menteeId={selectedMenteeId}
                                dateParams={dateParams}
                                selectedTodoId={selectedTodoId}
                                selectedFeedbackId={selectedFeedbackId}
                                onSelectTodo={onSelectTodo}
                                onSelectFeedback={onSelectFeedback}
                            />
                        )}
                    </div>
                </>
            </div>
        </aside>
    );
};

export default FeedbackSidebar;
