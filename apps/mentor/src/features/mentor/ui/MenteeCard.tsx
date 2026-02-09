import type { IMenteeCard } from '@/entities/mentoring/api/mentoring.api.type';
import Avatar from '@/shared/ui/Avatar';
import { useNavigate } from 'react-router';

type Subject = 'KOREAN' | 'ENGLISH' | 'MATH';

const SUBJECT_META: Record<Subject, { label: string; bgClass: string }> = {
    KOREAN: {
        label: '국어',
        bgClass: 'bg-secondary-sky-light',
    },
    ENGLISH: {
        label: '영어',
        bgClass: 'bg-accent-purple',
    },
    MATH: {
        label: '수학',
        bgClass: 'bg-point-yellow',
    },
};

interface MenteeCardProps {
    mentee: IMenteeCard;
}

const MenteeCard = ({ mentee }: MenteeCardProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/mentoring/${mentee.menteeId}/manage`);
    };

    return (
        <article className="w-full min-h-[288px] sm:h-auto sm:min-h-40 shrink-0 border border-grayscale-bg-gray rounded-2xl bg-primary-blue p-1.5 sm:pt-0 flex flex-col">
            <header className="px-3.5 py-2.5 flex flex-col items-center gap-[19px] sm:gap-2 sm:flex-row sm:items-center sm:justify-between shrink-0">
                <div className="flex gap-3">
                    {mentee.subjects.map((subject, index) => {
                        const meta = SUBJECT_META[subject];

                        return (
                            <div
                                key={`${subject}-${index}`}
                                className={`px-5 py-1.5 rounded-lg flex items-center justify-center ${meta.bgClass}`}
                            >
                                <p className="ui-label text-grayscale-black">{meta.label}</p>
                            </div>
                        );
                    })}
                </div>
                <div className="flex gap-3">
                    {mentee.cards.map((card) => (
                        <div
                            key={card}
                            className="border border-grayscale-bg-gray rounded-2xl flex items-center justify-center px-5 py-1.5"
                        >
                            <p className="ui-caption text-grayscale-bg-gray">{card}</p>
                        </div>
                    ))}
                </div>
            </header>
            <section className="bg-background-white min-h-20 flex-1 shrink-0 rounded-xl px-7 mt-[8px] sm:mt-0 flex flex-col items-center justify-center gap-[38px] sm:flex-row sm:justify-between sm:gap-0">
                <figure className="flex gap-6 items-center">
                    <Avatar className="w-14 h-14" src={mentee.profileImageUrl ?? undefined}>
                        {!mentee.profileImageUrl && <span>{mentee.name[0]}</span>}
                    </Avatar>

                    <figcaption className="flex flex-col">
                        <h4>{mentee.name}</h4>
                        <p className="body-small text-grayscale-black">{mentee.grade}</p>
                    </figcaption>
                </figure>
                <button
                    onClick={handleClick}
                    className="shrink-0 px-8 py-3 bg-primary-blue rounded-full flex items-center justify-center"
                >
                    <span className="ui-button text-white">학습관리 하기</span>
                </button>
            </section>
        </article>
    );
};

export default MenteeCard;
