import noti from '@/assets/icons/noti.svg';
import edit from '@/assets/icons/edit.svg';
import { HomeLearningCardSlice } from '@/features/home/ui/HomeLearningCardSlice';
import useCalendar from '@/shared/hooks/useCalendar';
import CommonMonthCalendar from '@/shared/ui/modal/CommonMonthCalendard';
import HomeLearningSummary from '@/features/home/ui/HomeLearningSummary';

const HomePage = () => {
    const { selectedDate, displayMonth, setSelectedDate, setDisplayMonth } = useCalendar();
    return (
        <div
            className="relative h-screen overflow-hidden p-[16px] pb-20"
            style={{
                background: 'linear-gradient(180deg, #E1ECFF 0%, #D7C1F2 50%, #FFF494 100%)',
                backdropFilter: 'blur(500px)',
            }}
        >
            <div className='flex items-center justify-between pl-[16px]'>
                <h3>민수님의 학습</h3>
                <button><img src={noti} alt='noti' /> </button>
            </div>
            <div className='flex items-center gap-[7px] pl-[16px]'>
                <p className='body-medium text-grayscale-black'>3개월 안에 수학 1등급 만들기</p>
                <button><img src={edit} alt='edit' /> </button>
            </div>
            <HomeLearningSummary />
            <div className='mt-[5px]'>
                <CommonMonthCalendar
                    selectedDate={selectedDate}
                    displayMonth={displayMonth}
                    onSelect={setSelectedDate}
                    onChangeMonth={setDisplayMonth}
                />
            </div>
            <HomeLearningCardSlice />
        </div>
    )
}

export default HomePage;

