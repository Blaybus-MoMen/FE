import { useGetDailyStatsQuery } from '@/entities/study/queries/study.queries';
import start from '@/assets/images/start.png';
import finish from '@/assets/images/finish.png';
import run from '@/assets/images/run.png';



const HomeLearningSummary = ({ date }: { date: string }) => {
    const { data } = useGetDailyStatsQuery(date);
    const rate = data?.completionRatePercent ?? 0;
    const isOverHalf = rate > 50;
    const runnerImg = rate === 0 ? start : rate >= 100 ? finish : run;
    const runnerAlt = rate === 0 ? '준비' : rate >= 100 ? '완료' : '달리기';

    return (
        <div className="px-[11px] rounded-[20px] mt-[5px]">
            <div className='flex items-center justify-center gap-[11px]'>
                <div className='w-full h-full rounded-[25px] bg-primary-blue flex flex-col items-center justify-center max-w-[90px] min-h-[96px]'>
                    <p className='text-[14px] text-[#FEFEFE]'>총 학습</p>
                    <h2 className='text-ui-label text-[#FEFEFE]'>{data?.total ?? 0}</h2>
                </div>
                <div className='w-full h-full rounded-[25px] bg-[#FEFEFE] flex flex-col items-center justify-center max-w-[90px] min-h-[96px] border-[2px] border-primary-blue'>
                    <p className='text-[14px] text-grayscale-dark-gray'>완료 학습</p>
                    <h2 className='text-ui-label text-primary-blue'>{data?.completed ?? 0}</h2>
                </div>
                <div className='w-full h-full rounded-[25px] bg-[#FEFEFE] flex flex-col items-center justify-center max-w-[90px] min-h-[96px] border-[2px] border-primary-blue'>
                    <p className='text-[14px] text-grayscale-dark-gray'>잔여 학습</p>
                    <h2 className='text-ui-label text-primary-blue'>{data?.remaining ?? 0}</h2>
                </div>
            </div>
            <div
                className='mt-[23px] relative pt-[55px] pb-[16px] px-[19px] rounded-[18px]'
                style={{
                    background: '#FFFFFF80',
                    border: '2px solid #FFFFFF',
                    boxShadow: '0px 3px 4px 0px #00000026',
                }}
            >
                <div className="relative w-full h-[10px]">
                    <div
                        className={`absolute -top-5 w-full flex ${isOverHalf ? 'justify-start' : 'justify-end'}`}
                    >
                        <span className="text-[13px] font-medium text-primary-blue-light">
                            {data?.message}
                        </span>
                    </div>
                    <img
                        src={runnerImg}
                        alt={runnerAlt}
                        className="absolute z-10 -translate-x-1/2 -translate-y-full transition-all duration-300 w-[50px] h-[35px]"
                        style={{
                            left: `${Math.min(rate, 100)}%`,
                            bottom: '-185%',
                        }}
                    />
                    <div className="absolute inset-0 rounded-full overflow-hidden bg-gray-200">
                        <div
                            className="absolute left-0 top-0 h-full rounded-full transition-all duration-300"
                            style={{
                                width: `${rate}%`,
                                background: 'linear-gradient(90deg, #97ADF9 0%, #001871 99.99%)',
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default HomeLearningSummary;