import Avatar from '@/shared/ui/Avatar';
import FeedbackSidebar from '@/features/feedback/ui/common/FeedbackSidebar';
import FeedbackList from '@/features/feedback/ui/daily/DailyFeedbackList';
import MonthlyFeedbackLayout from '@/features/feedback/ui/monthly/MonthlyFeedbackLayout';
import WeeklyFeedbackLayout from '@/features/feedback/ui/weekly/WeeklyFeedbackLayout';
import { useState } from 'react';

/**
 * @description 피드백 페이지 전체 레이아웃
 */
const FeedbackPage = () => {
    const [mode, setMode] = useState<'daily' | 'weekly' | 'monthly'>('daily');

    return (
        <main className="relative h-full w-full lg:overflow-hidden overflow-y-auto bg-feedback-layout">
            <div className="flex h-full w-full flex-col lg:flex-row">
                <FeedbackSidebar mode={mode} onChangeMode={setMode} />

                <section className="flex flex-1 flex-col bg-primary-blue-pale">
                    <header className="flex items-center justify-between px-4 lg:px-10 py-6 lg:py-8">
                        <div className="hidden lg:flex ml-auto items-center gap-[9px] rounded-[100px] bg-[#666666]/30 pl-[20px] shadow-[inset_0px_2px_4px_1px_#00000040]">
                            <p className="ui-label text-white">설쌤</p>
                            <Avatar className="h-[36px] w-[36px]">
                                <span>쌤</span>
                            </Avatar>
                        </div>
                    </header>

                    {mode === 'daily' && <FeedbackList />}
                    {mode === 'weekly' && <WeeklyFeedbackLayout />}
                    {mode === 'monthly' && <MonthlyFeedbackLayout />}
                </section>
            </div>
        </main>
    );
};

export default FeedbackPage;
