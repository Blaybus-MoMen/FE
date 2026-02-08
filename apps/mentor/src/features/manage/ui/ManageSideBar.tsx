import homeLogo from '@/assets/images/white-home-logo.svg';
import Calendar from '@/shared/ui/Calendar';
import StudentCard from '@/features/manage/ui/StudentCard';
import Avatar from '@/shared/ui/Avatar';
import { useNavigate } from 'react-router';
import type { IMenteeCardResponse } from '@/entities/manage/api/manage.api.type';

interface Props {
    mentee: IMenteeCardResponse;
    selectedDate: Date;
    onSelectDate: (date: Date) => void;
}

/**
 * @description 학습관리 페이지 좌측 사이드바
 */
const ManageSidebar = ({ mentee, selectedDate, onSelectDate }: Props) => {
    const navigate = useNavigate();

    return (
        <aside className="flex z-999 lg:min-h-screen lg:h-full w-full lg:w-[430px] flex-col bg-primary-blue pt-6 lg:pt-10 text-white shadow-[6px_0_20px_rgba(0,0,0,0.15)]">
            <header className="z-10 px-4 lg:px-8 flex items-start justify-between mb-6 sm:items-center">
                <div className="flex flex-col gap-4 items-start sm:flex-row sm:gap-6">
                    <img
                        src={homeLogo}
                        onClick={() => navigate('/home')}
                        alt="home-logo"
                        className="h-[28px] w-auto cursor-pointer"
                    />

                    <div className="flex gap-6">
                        <h3 className="cursor-pointer">학습관리</h3>
                        <h3 className="text-grayscale-medium-gray cursor-pointer" onClick={() => navigate('/feedback')}>
                            피드백
                        </h3>
                    </div>
                </div>

                <div className="flex lg:hidden items-center gap-[9px] rounded-[100px] bg-[#666666]/30 pl-[20px] shadow-[inset_0px_2px_4px_1px_#00000040]">
                    <p className="ui-label text-white">설쌤</p>
                    <Avatar className="h-[36px] w-[36px]">
                        <span>쌤</span>
                    </Avatar>
                </div>
            </header>

            <div className="flex flex-1 min-h-0 flex-col">
                <div className="mx-4 lg:mx-0 mb-6">
                    <div className="w-full lg:w-[370px] lg:ml-auto rounded-[24px] lg:rounded-l-[24px] lg:rounded-r-none bg-white p-4 shadow mb-4">
                        <StudentCard mentee={mentee} />
                    </div>
                </div>

                <Calendar selectedDate={selectedDate} onSelectDate={onSelectDate} />
            </div>
        </aside>
    );
};

export default ManageSidebar;
