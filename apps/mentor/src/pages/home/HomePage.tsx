import homeLogo from '@/assets/images/home-logo.svg';
import MenteeList from '@/features/mentor/ui/MenteeList';
import MeetingCalendar from '@/features/mentor/ui/Calendar';
import MeetingList from '@/features/mentor/ui/MeetingList';
import Avatar from '@/shared/ui/Avatar';

/**
 * @description 홈 페이지 컴포넌트
 */
const HomePage = () => {
    return (
        <main className="relative flex h-full w-full flex-col bg-primary-blue-pale py-11 px-6">
            <header className="z-10 flex shrink-0 justify-between items-center">
                <img src={homeLogo} alt="home-logo" />
                <div className="rounded-[100px] shadow-[inset_0px_2px_4px_1px_#00000040] bg-[#666666]/30 flex items-center pl-[20px] gap-[9px]">
                    <p className='ui-label text-white'>설쌤</p>
                    <Avatar className="w-[36px] h-[36px]">
                        <span>조</span>
                    </Avatar>
                </div>
            </header>
            <aside
                className="absolute right-0 top-0 bottom-0 z-0 w-[475px] rounded-l-[40px] bg-primary-blue py-28 px-14 overflow-hidden flex flex-col"
            >
                <MeetingCalendar />
                <MeetingList />
            </aside>
            <MenteeList />
        </main>
    );
};

export default HomePage;