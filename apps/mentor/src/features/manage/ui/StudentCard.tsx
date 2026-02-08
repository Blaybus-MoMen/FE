import type { IMenteeCardResponse } from '@/entities/manage/api/manage.api.type';
import Avatar from '@/shared/ui/Avatar';

interface Props {
    mentee: IMenteeCardResponse;
}

/**
 * @description 학생 프로필 카드
 */
const StudentCard = ({ mentee }: Props) => {
    return (
        <div className="rounded-2xl bg-white p-4 text-black">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between lg:flex-col lg:items-start lg:justify-start gap-4">
                <div className="flex gap-4 shrink-0">
                    <Avatar
                        src={mentee.profileImageUrl ?? undefined}
                        alt={`${mentee.name} 프로필`}
                        className="w-[68px] h-[68px] bg-grayscale-light-gray"
                    >
                        {!mentee.profileImageUrl && <span className="text-xl font-bold">{mentee.name.charAt(0)}</span>}
                    </Avatar>

                    <div className="flex flex-col justify-center">
                        <p className="body-large">{mentee.grade}</p>
                        <h3 className="font-bold">{mentee.name} 학생</h3>
                    </div>
                </div>

                <div className="flex gap-2 md:justify-end lg:justify-start overflow-x-auto whitespace-nowrap no-scrollbar lg:flex-wrap">
                    {mentee.cards.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1.5 border border-primary-blue-dark rounded-full ui-caption text-primary-blue-dark"
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
