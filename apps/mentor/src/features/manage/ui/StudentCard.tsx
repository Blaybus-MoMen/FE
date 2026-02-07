import Avatar from '@/shared/ui/Avatar';

/**
 * @description 학생 프로필 카드
 */
const StudentCard = () => {
    return (
        <div className="rounded-2xl bg-white p-4 text-black">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between lg:flex-col lg:items-start lg:justify-start gap-4">
                <div className="flex gap-4 shrink-0">
                    <Avatar className="w-[68px] h-[68px] bg-grayscale-light-gray">
                        <span>조</span>
                    </Avatar>

                    <div className="flex flex-col justify-center">
                        <p className="body-large">고등학교 3학년</p>
                        <h3 className="font-bold">조민수 학생</h3>
                    </div>
                </div>

                <div className="flex gap-2 md:justify-end lg:justify-start overflow-x-auto whitespace-nowrap no-scrollbar lg:flex-wrap">
                    {['1등급 목표', '체계적인', '자기주도'].map((tag) => (
                        <span
                            key={tag}
                            className="
                                shrink-0
                                px-3 py-1.5
                                border border-primary-blue-dark
                                rounded-full
                                ui-caption
                                text-primary-blue-dark
                            "
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StudentCard;
