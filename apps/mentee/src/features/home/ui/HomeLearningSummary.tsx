import run from '@/assets/icons/run.svg';


const HomeLearningSummary = () => {
    const totalCount = 6;
    const completedCount = 3;
    const remainingCount = 6;
    const progressPercent = 50;
    return (
        <div className="bg-[#FFFFFFB2] px-[11px] py-[13px] rounded-[20px] border border-[#FEFEFE] mt-[17px]">
            <div className='flex items-center justify-center gap-[11px] mt-[22px]'>
                <div className='w-full h-full rounded-[25px] bg-primary-blue flex flex-col gap-[8px] items-center justify-center max-w-[90px] min-h-[96px]'>
                    <p className='text-[14px] text-[#FEFEFE]'>총 학습</p>
                    <h2 className='text-ui-label text-[#FEFEFE]'>{totalCount}</h2>
                </div>
                <div className='w-full h-full rounded-[25px] bg-primary-blue-pale flex flex-col gap-[8px] items-center justify-center max-w-[90px] min-h-[96px]'>
                    <p className='text-[14px] text-grayscale-dark-gray'>완료 학습</p>
                    <h2 className='text-ui-label text-primary-blue'>{completedCount}</h2>
                </div>
                <div className='w-full h-full rounded-[25px] bg-primary-blue-pale flex flex-col gap-[8px] items-center justify-center max-w-[90px] min-h-[96px]'>
                    <p className='text-[14px] text-grayscale-dark-gray'>남은 학습</p>
                    <h2 className='text-ui-label text-primary-blue'>{remainingCount}</h2>
                </div>
            </div>
            <div className='mt-[23px] relative pt-6'>
                <span className="absolute right-0 top-0 z-10 text-sm font-medium text-primary-blue-light">반이나 했어요!</span>
                <div className="relative w-full h-[10px]">
                    <img
                        src={run}
                        alt='run'
                        className="absolute z-10 -translate-x-1/2 -translate-y-full transition-all duration-300"
                        style={{
                            left: `${progressPercent}%`,
                            bottom: '-185%',
                        }}
                    />
                    <div className="absolute inset-0 rounded-full overflow-hidden bg-gray-200">
                        <div
                            className="absolute left-0 top-0 h-full rounded-full transition-all duration-300"
                            style={{
                                width: `${progressPercent}%`,
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