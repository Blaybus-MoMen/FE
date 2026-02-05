import Avatar from "@/shared/ui/Avatar";

const MenteeCard = () => {
    return (
        <article className="w-full min-h-40 shrink-0 border border-grayscale-bg-gray rounded-2xl bg-primary-blue p-1.5 flex flex-col">
            <header className="px-3.5 py-2.5 flex justify-between shrink-0">
                <div className="flex gap-3">
                    <div className="px-5 py-1.5 bg-secondary-sky-light rounded-lg flex items-center justify-center">
                        <p className="ui-label text-grayscale-black">국어</p>
                    </div>
                    <div className="px-5 py-1.5 bg-accent-purple rounded-lg flex items-center justify-center">
                        <p className="ui-label text-grayscale-black">영어</p>
                    </div>
                    <div className="px-5 py-1.5 bg-point-yellow rounded-lg flex items-center justify-center">
                        <p className="ui-label text-grayscale-black">수학</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <div className="border border-grayscale-bg-gray rounded-2xl flex items-center justify-center px-5 py-1.5">
                        <p className="ui-caption text-grayscale-bg-gray">1등급 목표</p>
                    </div>
                    <div className="border border-grayscale-bg-gray rounded-2xl flex items-center justify-center px-5 py-1.5">
                        <p className="ui-caption text-grayscale-bg-gray">체계적인</p>
                    </div>
                    <div className="border border-grayscale-bg-gray rounded-2xl flex items-center justify-center px-5 py-1.5">
                        <p className="ui-caption text-grayscale-bg-gray">자기주도</p>
                    </div>
                </div>
            </header>
            <section className="bg-background-white min-h-20 flex-1 shrink-0 rounded-xl px-7 flex items-center justify-between">
                <figure className="flex gap-6 items-center">
                    <Avatar className="w-14 h-14">
                        <span>조</span>
                    </Avatar>
                    <figcaption className="flex flex-col">
                        <h4>조민수학생</h4>
                        <p className="body-small text-grayscale-black">고등학교 3학년</p>
                    </figcaption>
                </figure>
                <button className="shrink-0 px-8 py-3 bg-primary-blue rounded-full flex items-center justify-center">
                    <span className="ui-button text-white">피드백 남기기</span>
                </button>
            </section>
        </article>
    )
}

export default MenteeCard;