import ArrowRightSvg from '@/assets/icons/arrow-right.svg';
/**
 * @description 미팅 카드 컴포넌트
 */
const MeetingCard = () => {
    return (
        <article
            className="w-full md:w-1/2 lg:w-full shrink-0 border-2 border-grayscale-bg-gray px-5 py-5 rounded-[57px] bg-[#FFFFFF4D] shadow-[0px_8px_4.8px_0px_#00000033] flex justify-between items-center"
        >
            <div className="flex gap-[25px] items-center">
                <div className="w-[55px] h-[55px] border-2 border-grayscale-bg-gray rounded-full bg-grayscale-light-gray flex items-center justify-center">
                    <p>조</p>
                </div>
                <div className="flex flex-col">
                    <p className="body-medium text-white">Zoom Meeting</p>
                    <div className='flex flex-col'>
                        <p className="body-small text-white">조민수 학생</p>
                        <p className="body-small text-white">14:00-15:00</p>
                    </div>
                </div>
            </div>
            <button>
                <img src={ArrowRightSvg} alt="arrow-right" />
            </button>
        </article>
    )
}

export default MeetingCard;