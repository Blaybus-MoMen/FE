import { useEffect, useState } from 'react';
import { useModalActions } from '@/shared/store/modal.store';
import { MODAL_KEY } from '@/shared/model/modal';
import { ChevronLeft, FilePlus } from 'lucide-react';
import noti from '@/assets/icons/noti.svg';
import { useGetTodoSubmissionQuery } from '@/entities/study/queries/study.queries';
import { CommonUtil } from '@/shared/utils/commonUtil';
import { SUBJECT_TODO_CARD_STYLE } from '@/shared/constants/constants';

const LearningInspectionModal = (props: { todoId: number, title: string, subject: string, goalDescription: string, studyTimeHours: string, studyTimeMinutes: string, studyTimeSeconds: string, isCompleted: boolean }) => {
    const { todoId, title, subject, goalDescription, studyTimeHours, studyTimeMinutes, studyTimeSeconds, isCompleted } = props;
    const { closeModal } = useModalActions();

    const { data } = useGetTodoSubmissionQuery(todoId);

    const [memo, setMemo] = useState('');
    const [submissionFiles, setSubmissionFiles] = useState<string[]>([]);

    useEffect(() => {
        if (!data) return;
        Promise.resolve().then(() => {
            setMemo(data.memo ?? '');
            setSubmissionFiles(data.files ?? []);
        });
    }, [data]);

    const subjectStyle = SUBJECT_TODO_CARD_STYLE[subject as keyof typeof SUBJECT_TODO_CARD_STYLE];

    return (
        <div
            className="fixed inset-0 z-[100] flex flex-col bg-[#F9F9F9]"
            role="dialog"
            aria-modal="true"
        >
            <header className="shrink-0 h-[56px] flex items-center px-4 bg-[#F9F9F9] border-b border-grayscale-border">
                <button
                    type="button"
                    onClick={() => closeModal(MODAL_KEY.LEARNING_INSPECTION)}
                    className="p-2 -ml-2 flex items-center justify-center text-grayscale-black"
                    aria-label="닫기"
                >
                    <ChevronLeft size={24} />
                </button>
                <h1 className="flex-1 text-center text-[16px] font-medium text-grayscale-black pr-8">
                    학습 점검
                </h1>
                <img src={noti} alt="알림" />
            </header>
            <main className="flex-1 overflow-auto min-h-0 p-4">
                <div className={`${subjectStyle?.headerBg ?? ''} flex rounded-[25px]`}>
                    <div className={`w-[50px] ${subjectStyle?.subjectBg ?? ''} rounded-tl-[19px] rounded-bl-[19px] flex items-center justify-center`}>
                        <p className='text-ui-label text-grayscale-dark-gray'>{CommonUtil.getSubjectName(subject)}</p>
                    </div>
                    <div className='flex-1 flex items-center py-[18px]'>
                        <div className='pl-[20px] pr-[7px] flex justify-between w-full items-center'>
                            <div className='flex flex-col gap-[4px] w-full'>
                                <div className='flex justify-between w-full'>
                                    <p className='text-body-medium text-grayscale-black'>{title}</p>
                                    <div
                                        className='text-[12px] rounded-[20px] text-[#FEFEFE] py-[4px] px-[15px] bg-[#4CAF50]'
                                    >
                                        {isCompleted ? '학습 완료' : '미완료'}
                                    </div>
                                </div>
                                <div className='flex flex-col'>
                                    <div className='flex items-center gap-[6px]'>
                                        <p className='text-[12px] text-grayscale-black'>학습 목표</p>
                                        <p className='text-[12px] text-grayscale-black'>|</p>
                                        <p className='text-[12px] text-grayscale-black font-bold'>{goalDescription}</p>
                                    </div>
                                    <div className='flex items-center gap-[6px]'>
                                        <p className='text-[12px] text-grayscale-black'>학습시간</p>
                                        <p className='text-[12px] text-grayscale-black'>|</p>
                                        <p className='text-[12px] text-grayscale-black font-bold'>{studyTimeHours ?? '00'}:{studyTimeMinutes ?? '00'}:{studyTimeSeconds ?? '00'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-[27px] bg-[#FEFEFE] min-h-[135px] shadow-[0px_0px_7px_0px_#0000002B] rounded-[15px] flex flex-col items-center justify-center gap-[6px] px-4 py-3">
                    {submissionFiles.length === 0 ? (
                        <>
                            <FilePlus size={20} />
                            <p className='text-[10px] text-[#828282]'>파일 추가</p>
                        </>
                    ) : (
                        <div className="w-full flex flex-col gap-[6px]">
                            {submissionFiles.map((fileUrl, index) => {
                                const fileName = fileUrl.split('/').pop() || fileUrl;
                                return (
                                    <a
                                        key={`${fileUrl}-${index}`}
                                        href={fileUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-[12px] text-primary-blue underline break-all"
                                    >
                                        {fileName}
                                    </a>
                                );
                            })}
                        </div>
                    )}
                </div>
                <textarea
                    className="mt-[14px] w-full bg-[#FEFEFE] h-[135px] shadow-[0px_0px_7px_0px_#0000002B] rounded-[15px] resize-none p-[14px] outline-none focus:outline-none text-[16px]"
                    placeholder='학습한 내용을 작성해주세요.'
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                />
                <button
                    type="button"
                    className="w-full mt-[24px] py-[14px] rounded-[10px] bg-primary-blue text-white text-[14px] font-medium"
                >
                    저장하기
                </button>
            </main >
        </div >
    );
};

export default LearningInspectionModal;
