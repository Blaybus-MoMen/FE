import { HomeLearningCardSlice } from '@/features/home/ui/HomeLearningCardSlice';
import useCalendar from '@/shared/hooks/useCalendar';
import CommonMonthCalendar from '@/shared/ui/modal/CommonMonthCalendard';
import HomeLearningSummary from '@/features/home/ui/HomeLearningSummary';
import HomeUserInfo from '@/features/home/ui/HomeUserInfo';
import { CommonUtil } from '@/shared/utils/commonUtil';

const HomePage = () => {
    const { selectedDate, displayMonth, setSelectedDate, setDisplayMonth } = useCalendar();

    const formattedSelectedDate = CommonUtil.formatDateToYYYYMMDD(selectedDate as Date);

    return (
        <div
            className="relative min-h-screen overflow-auto p-[16px] pb-24 bg-[#e1ecff]"
        >
            <HomeUserInfo />
            <HomeLearningSummary date={formattedSelectedDate} />
            <CommonMonthCalendar
                selectedDate={selectedDate}
                displayMonth={displayMonth}
                onSelect={setSelectedDate}
                onChangeMonth={setDisplayMonth}
            />
            <HomeLearningCardSlice date={formattedSelectedDate} />
        </div>
    )
}

export default HomePage;

