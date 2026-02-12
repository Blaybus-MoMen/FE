import edit from '@/assets/icons/edit.svg';
import { LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router';
import Avatar from '@/shared/ui/Avatar';
import student from '@/assets/icons/student.svg';
import BarChart from '@/shared/ui/BarChart';
import talk from '@/assets/icons/talk.svg';
import { useLogoutMutation } from '@/entities/auth/queries/auth.queries';
import { useGetMyPageInfoQuery } from '@/entities/study/queries/study.queries';
import { SUBJECT_NAME } from '@/shared/constants/constants';
import { useAuthAction } from '@/shared/store/auth.store';
import { useModalActions } from '@/shared/store/modal.store';

const getChartDataFromCompletionRates = (rates: Record<string, number> | undefined) => {
    if (!rates || Object.keys(rates).length === 0) {
        return [];
    }
    return Object.entries(rates).map(([subject, 학습시간]) => ({
        과목: (SUBJECT_NAME as Record<string, string>)[subject] ?? subject,
        학습시간,
    }));
};

const MyPage = () => {
    const navigate = useNavigate();
    const { data } = useGetMyPageInfoQuery();
    const { openModal } = useModalActions();
    const { removeToken } = useAuthAction();
    const { mutateAsync: logout } = useLogoutMutation();
    const chartData = getChartDataFromCompletionRates(data?.subjectCompletionRates);
    const handleLogout = async () => {
        try {
            await logout();
            removeToken();
            navigate('/login');
        }
        catch (error) {
            console.error(error);
        }
    };
    return (
        <div
            className="relative min-h-screen overflow-auto p-[16px] pb-24 bg-[#e1ecff]"
        >
            <div className='flex items-center gap-[8px]'>
                <h3>마이페이지</h3>
                <div className='flex gap-[15px]'>
                    <button onClick={() => openModal('FEATURE', { features: data?.cards.length ? data?.cards : [], })}><img src={edit} alt='edit' /> </button>
                    <button type="button" onClick={handleLogout} className="flex items-center justify-center" aria-label="로그아웃">
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            </div>
            <div
                className="mt-[16px] h-[180px] rounded-[30px]"
                style={{
                    background: 'linear-gradient(360deg, #FFFFFF 0%, #97ADF9 100%)',
                    border: '2px solid #FEFEFE',
                    boxShadow: '0px 2px 5px 0px #0000001A',
                }}
            >
                <div
                    className="w-full h-full rounded-[30px] py-[19px] px-[17px] flex flex-col justify-center items-start">
                    <div className='flex gap-[13px] w-full items-center'>
                        <div className="relative inline-block">
                            <Avatar alt="avatar" className="w-[48px] h-[48px] border border-white" src={data?.profileImageUrl ?? undefined}>
                                {!data?.profileImageUrl && <User className="w-6 h-6 text-grayscale-dark-gray" />}
                            </Avatar>
                            <img
                                src={student}
                                alt="student"
                                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain pointer-events-none"
                            />
                        </div>
                        <div className='flex flex-col'>
                            <p className='text-[12px] text-grayscale-black'>{data?.grade}</p>
                            <p className='text-[16px] text-grayscale-black font-medium'>{data?.name} 학생</p>
                        </div>
                        <div className='ml-[10px] flex-1 w-full h-[97px] rounded-[22px] bg-[#FEFEFE99] p-[20px] flex flex-col justify-center items-center'>
                            <p className='text-[12px] font-bold text-grayscale-dark-gray'>설스터디와 공부한지</p>
                            <p className='text-[32px] font-bold text-primary-blue'>{data?.daysWithUs}일</p>
                        </div>
                    </div>
                    <div className='flex items-center justify-center gap-[8px] mt-[17px] w-full'>
                        {data?.cards?.map((item) => (
                            <div key={item} className='border-primary-blue border-[1px] rounded-[20px] px-[10px] py-[3px] text-primary-blue-dark text-[14px]'>{item}</div>
                        ))}
                    </div>
                </div>
            </div>
            <div
                className="h-[295px] mt-[15px] rounded-[25px] p-[20px]"
                style={{
                    background: '#FFFFFF66',
                    border: '2px solid #FFFFFF',
                    boxShadow: '0px 1px 8px 0px #0000001A',
                }}
            >
                <p className='text-[16px] text-grayscale-black'>전체 학습 현황</p>
                <BarChart
                    data={chartData}
                    xKey="과목"
                    series={[{ key: '학습시간', label: '학습시간' }]}
                />
            </div>
            <div className='flex justify-center'>
                <button
                    type="button"
                    className="mt-[24px] w-fit rounded-[10px] bg-primary-blue text-white text-[14px] px-[50px] py-[10px] font-medium flex items-center justify-center gap-[8px]"
                    onClick={() =>
                        window.open(
                            'https://docs.google.com/forms/d/e/1FAIpQLSfgdWIKLyMFdZdyLI9FaxO3ix1ZdLeKmta4TB-U0VwK1B6UCg/viewform',
                            '_blank',
                        )
                    }
                >
                    <img src={talk} alt='talk' />
                    <p>상담 신청하기</p>
                </button>
            </div>
        </div >
    )
}

export default MyPage;