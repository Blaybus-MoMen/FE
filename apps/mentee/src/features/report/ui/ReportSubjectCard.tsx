import { SUBJECT_NAME } from "@/shared/constants/constants";

interface IReportSubjectCardProps {
    subject: string;
    time: string;
    title: string;
}

const ReportSubjectCard = ({ subject, time, title }: IReportSubjectCardProps) => {
    return (
        <div className="w-full rounded-[14px] bg-[#FEFEFE] border border-grayscale-border shadow-[0px_2px_3px_0px_#00000012_inset] flex pr-[8px]">
            <div className="p-[14px] bg-point-yellow rounded-tl-[14px] rounded-bl-[14px] flex items-center justify-center text-[14px] text-grayscale-dark-gray">{SUBJECT_NAME[subject as keyof typeof SUBJECT_NAME]}</div>
            <div className="flex items-center justify-between flex-1 pl-[12px]">
                <p className="text-[16px] text-grayscale-black">{title}</p>
                <div className="bg-grayscale-bg-gray rounded-[7px] flex items-center justify-center timer px-[14px] py-[6px]">
                    {time}
                </div>
            </div>
        </div>
    )
}
export default ReportSubjectCard;