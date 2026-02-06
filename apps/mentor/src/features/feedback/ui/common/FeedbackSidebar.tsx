import homeLogo from '@/assets/images/white-home-logo.svg';
import FeedbackCalendar from '@/features/mentor/ui/Calendar';
import StudentCard from '@/features/feedback/ui/common/StudentCard';
import { useFeedbackPeriod } from '@/features/feedback/hooks/useFeedbackPeriod';
import FeedbackPeriodHeader from '@/features/feedback/ui/common/FeedbackPeriodHeader';
import FeedbackList from '@/features/feedback/ui/common/SideBarFeedbackList';

interface Props {
    mode: 'daily' | 'weekly' | 'monthly';
    onChangeMode: (mode: 'daily' | 'weekly' | 'monthly') => void;
}

/**
 * @description 피드백 페이지 좌측 사이드바
 */
const FeedbackSidebar = ({ mode, onChangeMode }: Props) => {
    const { label, movePrev, moveNext } = useFeedbackPeriod(mode);

    const isDaily = mode === 'daily';

    return (
        <aside className="flex z-999 h-full w-[430px] flex-col gap-8 bg-primary-blue pt-10 text-white shadow-[6px_0_20px_rgba(0,0,0,0.15)]">
            <header className="z-10 px-8">
                <img src={homeLogo} alt="home-logo" className="h-[28px] w-auto cursor-pointer" />
            </header>

            <div className="px-8 flex gap-4">
                <h3 className="font-semibold">학습관리</h3>

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
            <div className="flex flex-1 min-h-0 flex-col gap-7">
                {isDaily && (
                    <>
                        <div className="w-[395px] flex box-border gap-2 flex-col items-end rounded-l-[24px] ml-auto">
                            <div className="w-[350px] rounded-l-full bg-point-yellow px-5 py-2 text-black ui-label shadow">
                                일간 피드백 3개
                            </div>

                            <div className="w-[370px] rounded-l-[24px] bg-white p-4 shadow">
                                <StudentCard />
                            </div>
                        </div>

                        <div className="px-8">
                            <FeedbackCalendar />
                        </div>
                    </>
                )}

                {!isDaily && (
                    <>
                        <div className="w-[370px] ml-auto rounded-l-[24px] bg-white p-4 shadow">
                            <StudentCard />
                        </div>

                        <div className="ml-auto flex flex-1 min-h-0 w-[395px] flex-col bg-point-yellow rounded-tl-[32px]">
                            <FeedbackPeriodHeader label={label} onPrev={movePrev} onNext={moveNext} />
                            <FeedbackList />
                        </div>
                    </>
                )}
            </div>
        </aside>
    );
};

export default FeedbackSidebar;
