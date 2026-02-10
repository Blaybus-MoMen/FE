import { useEffect, useRef, useState } from 'react';
import { useModalActions } from '@/shared/store/modal.store';
import { MODAL_KEY } from '@/shared/model/modal';
import { ChevronLeft, FilePlus } from 'lucide-react';
import { useGetTodoSubmissionQuery, useProblemSubmitMutation } from '@/entities/study/queries/study.queries';
import { CommonUtil } from '@/shared/utils/commonUtil';
import { SUBJECT_TODO_CARD_STYLE } from '@/shared/constants/constants';
import { useFileUploadMutation } from '@/entities/file/queries/file.queries';

type SubmissionFile = { fileUrl: string; fileName: string };

const LearningInspectionModal = (props: { todoId: number, title: string, subject: string, goalDescription: string, studyTimeHours: string, studyTimeMinutes: string, studyTimeSeconds: string, isCompleted: boolean }) => {
    const { todoId, title, subject, goalDescription, studyTimeHours, studyTimeMinutes, studyTimeSeconds, isCompleted } = props;
    const { closeModal } = useModalActions();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data } = useGetTodoSubmissionQuery(todoId);
    const { mutateAsync } = useProblemSubmitMutation();
    const { mutateAsync: uploadFile } = useFileUploadMutation();

    const [memo, setMemo] = useState('');
    const [submissionFiles, setSubmissionFiles] = useState<SubmissionFile[]>([]);
    const [uploadingNames, setUploadingNames] = useState<string[]>([]);

    useEffect(() => {
        if (!data) return;
        const files: SubmissionFile[] = (data.files ?? []).map((item: string | { fileUrl: string; fileName: string }) => {
            if (typeof item === 'string') {
                return {
                    fileUrl: item,
                    fileName: item.split('/').pop() || item,
                };
            }
            const fileUrl = item.fileUrl as string;
            const fileName =
                (item.fileName as string) ||
                (fileUrl ? fileUrl.split('/').pop() || fileUrl : '');
            return { fileUrl, fileName };
        });
        setMemo(data.memo ?? '');
        setSubmissionFiles(files);
    }, [data]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files?.length) return;
        for (const file of Array.from(files)) {
            setUploadingNames((prev) => [...prev, file.name]);
            try {
                const res = await uploadFile({ file });
                const fileUrl = res.data?.fileUrl ?? '';
                if (fileUrl) {
                    setSubmissionFiles((prev) => [...prev, { fileUrl, fileName: file.name }]);
                }
            } finally {
                setUploadingNames((prev) => prev.filter((n) => n !== file.name));
            }
        }
        e.target.value = '';
    };

    const removeSubmissionFile = (index: number) => {
        setSubmissionFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const handleProblemSubmit = async () => {
        try {
            await mutateAsync({
                todoId,
                files: submissionFiles,
                memo,
            });
            closeModal(MODAL_KEY.LEARNING_INSPECTION);
        } catch (error) {
            console.error(error);
        }
    };

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
                                    {isCompleted ? <button className='h-fit text-[12px] bg-[#4CAF50] text-[#FEFEFE] rounded-[20px] px-[22px] py-[4px]'>
                                        학습완료
                                    </button> : <button className='h-fit text-[12px] bg-grayscale-light-gray text-grayscale-dark-gray rounded-[20px] px-[22px] py-[4px]'>
                                        미완료
                                    </button>}
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
                <div className="mt-[27px] bg-[#FEFEFE] min-h-[135px] shadow-[0px_0px_7px_0px_#0000002B] rounded-[15px] flex flex-col gap-[6px] px-4 py-3">
                    <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        accept="*/*"
                        multiple
                        onChange={handleFileChange}
                    />
                    {(submissionFiles.length === 0 && uploadingNames.length === 0) ? (
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="flex flex-1 flex-col items-center justify-center gap-[6px] min-h-[100px]"
                        >
                            <FilePlus size={20} />
                            <p className='text-[10px] text-[#828282]'>파일 추가</p>
                        </button>
                    ) : (
                        <div className="w-full flex flex-col gap-[6px]">
                            <div className="max-h-[144px] overflow-y-auto no-scrollbar flex flex-col gap-[6px]">
                                {uploadingNames.map((name) => (
                                    <div
                                        key={`uploading-${name}`}
                                        className="flex items-center justify-between py-[6px] px-[10px] bg-grayscale-bg-gray rounded-[8px] text-[14px] text-grayscale-dark-gray flex-shrink-0"
                                    >
                                        <span className="truncate flex-1">{name}</span>
                                        <span className="text-[12px] text-grayscale-medium-gray shrink-0 ml-2">업로드 중...</span>
                                    </div>
                                ))}
                                {submissionFiles.map((file, index) => (
                                    <div
                                        key={`${file.fileUrl}-${index}`}
                                        className="flex items-center justify-between py-[6px] px-[10px] bg-grayscale-bg-gray rounded-[8px] text-[14px] flex-shrink-0"
                                    >
                                        <span className="truncate flex-1 text-grayscale-black">
                                            {file.fileName}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => removeSubmissionFile(index)}
                                            className="shrink-0 ml-2 text-[12px] text-red-500 underline"
                                        >
                                            삭제
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full py-[8px] rounded-[8px] border border-primary-blue text-primary-blue text-[12px] flex-shrink-0"
                            >
                                파일 추가
                            </button>
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
                    onClick={handleProblemSubmit}
                    className="w-full mt-[24px] py-[14px] rounded-[10px] bg-primary-blue text-white text-[14px] font-medium"
                >
                    저장하기
                </button>
            </main >
        </div >
    );
};

export default LearningInspectionModal;
