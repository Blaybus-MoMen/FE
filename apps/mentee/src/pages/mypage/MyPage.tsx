import noti from '@/assets/icons/noti.svg';
import edit from '@/assets/icons/edit.svg';
import Avatar from '@/shared/ui/Avatar';
import student from '@/assets/icons/student.svg';
import BarChart from '@/shared/ui/BarChart';
import talk from '@/assets/icons/talk.svg';

const MyPage = () => {
    return (
        <div
            className="relative min-h-screen overflow-auto p-[16px] pb-24 bg-[#e1ecff]"
        >
            <div className='flex items-center justify-between gap-[8px]'>
                <h3>마이 페이지</h3>
                <div className='flex gap-[8px]'>
                    <button><img src={edit} alt='edit' /> </button>
                    <button><img src={noti} alt='noti' /> </button>
                </div>
            </div>
            <div
                className="mt-[16px] h-[180px] rounded-[30px] shadow-[0px_2px_5px_0px_#0000001A]"
                style={{
                    background: 'linear-gradient(270deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 52.4%, #FEFEFE 100%)',
                }}
            >
                <div
                    className="w-full h-full rounded-[30px] py-[19px] px-[17px] flex flex-col justify-center items-start"
                    style={{
                        background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.8) 0%, #E1ECFF 75%, #E1ECFF 100%)',
                    }}
                >
                    <div className='flex gap-[13px] w-full items-center'>
                        <div className="relative inline-block">
                            <Avatar alt="avatar" className="w-[48px] h-[48px]">조</Avatar>
                            <img
                                src={student}
                                alt="student"
                                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain pointer-events-none"
                            />
                        </div>
                        <div className='flex flex-col'>
                            <p className='text-[12px] text-grayscale-black'>고등학교 3학년</p>
                            <p className='text-[16px] text-grayscale-black font-medium'>조민수 학생</p>
                        </div>
                        <div className='ml-[10px] flex-1 w-full h-[97px] rounded-[22px] bg-[#FEFEFE99] p-[20px] flex flex-col justify-center items-center'>
                            <p className='text-[12px] font-bold text-grayscale-dark-gray'>설스터디와 공부한지</p>
                            <p className='text-[32px] font-bold text-primary-blue'>365일</p>
                        </div>
                    </div>
                    <div className='flex items-center justify-center gap-[8px] mt-[17px] w-full'>
                        <div className='border-primary-blue border-[1px] rounded-[20px] px-[17px] py-[3px] text-primary-blue-dark text-[14px]'>1등급 목표</div>
                        <div className='border-primary-blue border-[1px] rounded-[20px] px-[17px] py-[3px] text-primary-blue-dark text-[14px]'>체계적인</div>
                        <div className='border-primary-blue border-[1px] rounded-[20px] px-[17px] py-[3px] text-primary-blue-dark text-[14px]'>자기주도</div>
                    </div>
                </div>
            </div>
            <div className="h-[295px] bg-[#FEFEFE80] mt-[15px] rounded-[25px] shadow-[0px_1px_8px_0px_#0000000D] p-[20px]">
                <p className='text-[16px] text-grayscale-black'>전체 학습 현황</p>
                <BarChart
                    data={[
                        { 과목: '국어', 학습시간: 45 },
                        { 과목: '영어', 학습시간: 32 },
                        { 과목: '수학', 학습시간: 58 },
                    ]}
                    xKey="과목"
                    series={[{ key: '학습시간', label: '학습시간' }]}
                />
            </div>
            <div className='flex justify-center'>
                <button
                    type="button"
                    className="mt-[24px] w-fit rounded-[10px] bg-primary-blue text-white text-[14px] px-[50px] py-[10px] font-medium flex items-center justify-center gap-[8px]"
                >
                    <img src={talk} alt='talk' />
                    <p>상담 신청하기</p>
                </button>
            </div>
        </div>
    )

}

export default MyPage;