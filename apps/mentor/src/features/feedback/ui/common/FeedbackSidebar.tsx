import homeLogo from '@/assets/images/white-home-logo.svg';
import Calendar from '@/shared/ui/Calendar';
import StudentCard from '@/features/feedback/ui/common/StudentCard';
import { useFeedbackPeriod } from '@/features/feedback/hooks/useFeedbackPeriod';
import FeedbackPeriodHeader from '@/features/feedback/ui/common/FeedbackPeriodHeader';
import FeedbackList from '@/features/feedback/ui/common/SideBarFeedbackList';
import Avatar from '@/shared/ui/Avatar';

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
        <aside
            className={`flex z-999 ${
                isDaily ? 'h-auto pb-8' : 'lg:min-h-screen lg:h-full'
            } w-full lg:w-[430px] flex-col bg-primary-blue pt-6 lg:pt-10 lg:pb:8 text-white shadow-[6px_0_20px_rgba(0,0,0,0.15)]`}
        >
            <header className="z-10 px-4 lg:px-8 flex items-center justify-between mb-6">
                <img src={homeLogo} alt="home-logo" className="h-[28px] w-auto cursor-pointer" />

                <div className="flex lg:hidden items-center gap-[9px] rounded-[100px] bg-[#666666]/30 pl-[20px] shadow-[inset_0px_2px_4px_1px_#00000040]">
                    <p className="ui-label text-white">설쌤</p>
                    <Avatar className="h-[36px] w-[36px]">
                        <span>쌤</span>
                    </Avatar>
                </div>
            </header>

            <div className="px-4 lg:px-8 flex gap-4 mb-6">
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

            <div className="flex flex-1 min-h-0 flex-col">
                {isDaily && (
                    <>
                        <div className="mx-4 lg:mx-0">
                            <div className="bg-primary-blue-pale lg:bg-transparent px-4 py-4 lg:p-0 rounded-[24px] lg:rounded-none">
                                <div className="w-full lg:w-[395px] flex gap-2 flex-col items-center lg:items-end lg:ml-auto">
                                    <div className="w-[92%] lg:w-[350px] rounded-full lg:rounded-r-none lg:rounded-l-full bg-point-yellow px-5 py-2 text-black ui-label shadow">
                                        일간 피드백 3개
                                    </div>

                                    <div className="w-full lg:w-[370px] rounded-[24px] lg:rounded-r-none lg:rounded-l-[24px] bg-white p-4 shadow">
                                        <StudentCard />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="px-4 lg:px-8">
                            <Calendar />
                        </div>
                    </>
                )}

                {!isDaily && (
                    <>
                        <div className="mx-4 lg:mx-0 mb-6">
                            <div className="w-full lg:w-[370px] lg:ml-auto rounded-[24px] lg:rounded-l-[24px] lg:rounded-r-none bg-white p-4 shadow mb-4">
                                <StudentCard />
                            </div>
                        </div>

                        <div
                            className="
        flex flex-col
        lg:flex-1 lg:min-h-0
        w-full lg:w-[395px]
        bg-point-yellow
        rounded-none lg:rounded-tl-[32px]
        lg:ml-auto
    "
                        >
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
