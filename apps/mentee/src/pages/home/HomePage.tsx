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
            className="relative min-h-screen overflow-auto pb-24"
            style={{
                background: 'linear-gradient(180deg, #FFFFFF 0%, #97ADF9 82.21%)',
            }}
        >
            <div className='flex flex-col'>
                <HomeUserInfo />
                <HomeLearningSummary date={formattedSelectedDate} />
                <CommonMonthCalendar
                    selectedDate={selectedDate}
                    displayMonth={displayMonth}
                    onSelect={setSelectedDate}
                    onChangeMonth={setDisplayMonth}
                />
            </div>
            <div className='px-[16px]'>
                <HomeLearningCardSlice date={formattedSelectedDate} />
            </div>
        </div>
    )
}

export default HomePage;

