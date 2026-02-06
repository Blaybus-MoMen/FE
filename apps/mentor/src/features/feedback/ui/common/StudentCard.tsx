import Avatar from '@/shared/ui/Avatar';

/**
 * @description 학생 프로필 카드
 */
const StudentCard = () => {
    return (
        <div className="flex flex-col gap-4 rounded-2xl bg-white p-4 text-black">
            <div className="flex gap-4">
                <Avatar className="w-[68px] h-[68px] bg-grayscale-light-gray">
                    <span>조</span>
                </Avatar>

                <div className="flex flex-col">
                    <p className="body-large">고등학교 3학년</p>
                    <h3 className="font-bold">조민수 학생</h3>
                </div>
            </div>

            <div className="flex gap-2">
                {['1등급 목표', '체계적인', '자기주도'].map((tag) => (
                    <span
                        key={tag}
                        className="px-3 py-1.5 border border-primary-blue-dark rounded-full ui-caption text-primary-blue-dark"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default StudentCard;
