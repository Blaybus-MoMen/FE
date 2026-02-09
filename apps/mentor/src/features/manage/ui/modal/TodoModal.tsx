import useTodoForm from '@/features/manage/hooks/useTodoForm';
import { useModalActions } from '@/shared/store/modal.store';
import { X } from 'lucide-react';
import { Controller } from 'react-hook-form';
import { clsx } from 'clsx';
import CommonMonthRangeCalendar from '@/shared/ui/CommonMonthRangeCalendar';
import useRangeCalendar from '@/shared/hooks/useRangeCalendar';
import type { ModalPayloadMap } from '@/shared/model/modal';
import { useTodoActions } from '../../hooks/useTodoActions';
import { useEffect, useState } from 'react';
import { SUBJECT_MAP } from '../../utils/subject.mapper';
import { format } from 'date-fns';
import { useUploadFileMutation } from '@/entities/files/queries/files.queries';
import { useGetTodoDetailQuery } from '@/entities/manage/queries/manage.queries';

const LEARNING_FILE_INPUT_ID = 'learning-file-input';

const SUBJECTS = ['국어', '영어', '수학'] as const;

const SUBJECT_ACTIVE_CLASS: Record<(typeof SUBJECTS)[number], string> = {
    국어: 'bg-secondary-sky-light text-grayscale-black',
    영어: 'bg-accent-purple text-grayscale-black',
    수학: 'bg-point-yellow text-black',
};

const DAYS = [
    { label: '일', value: 'SUNDAY' },
    { label: '월', value: 'MONDAY' },
    { label: '화', value: 'TUESDAY' },
    { label: '수', value: 'WEDNESDAY' },
    { label: '목', value: 'THURSDAY' },
    { label: '금', value: 'FRIDAY' },
    { label: '토', value: 'SATURDAY' },
];

/**
 * @description 학습 모달
 */
const TodoModal = ({ data }: { data: ModalPayloadMap['TODO'] }) => {
    const { closeModal } = useModalActions();
    const { mode, menteeId, todo } = data;

    const { register, handleSubmit, control, setValue } = useTodoForm();

    const {
        rangeStart,
        rangeEnd,
        setRangeStart,
        setRangeEnd,
        displayMonth,
        setDisplayMonth,
        handleRangeSelect,
        effectiveSelectedDate,
    } = useRangeCalendar();

    const { createTodo, updateTodo } = useTodoActions({
        menteeId,
        date: todo?.startDate ?? '',
    });

    const { data: todoDetail } = useGetTodoDetailQuery(todo?.todoId ?? 0, {
        enabled: mode === 'edit' && !!todo?.todoId,
    });

    type PreviewItem = { type: 'local'; file: File } | { type: 'server'; fileUrl: string; fileName: string };

    const [previewFiles, setPreviewFiles] = useState<PreviewItem[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { mutateAsync: uploadFile } = useUploadFileMutation();

    const safeIndex = previewFiles.length === 0 ? 0 : Math.min(currentIndex, previewFiles.length - 1);

    const current = previewFiles[safeIndex];

    const onSubmit = handleSubmit(async (form) => {
        if (!rangeStart) return;

        const start = format(rangeStart, 'yyyy-MM-dd');
        const end = format(rangeEnd ?? rangeStart, 'yyyy-MM-dd');

        let materials = [];

        for (const item of previewFiles) {
            if (item.type === 'local') {
                const res = await uploadFile(item.file);

                if (res.success) {
                    materials.push({
                        fileUrl: res.data.fileUrl,
                        fileName: item.file.name,
                    });
                }
            }

            if (item.type === 'server') {
                materials.push({
                    fileUrl: item.fileUrl,
                    fileName: item.fileName,
                });
            }
        }

        const payload = {
            title: form.title!,
            subject: SUBJECT_MAP[form.subject!],
            goalDescription: form.learningGoal!,
            startDate: start,
            endDate: end,
            repeatDays: form.repeatDays ?? [],
            materials,
        };

        if (mode === 'create') {
            createTodo(payload);
        }

        if (mode === 'edit' && todo) {
            updateTodo(todo.todoId, payload);
        }

        closeModal('TODO');
    });

    useEffect(() => {
        if (mode === 'edit' && todo) {
            setValue('title', todo.title);
            setValue('subject', todo.subject === 'KOREAN' ? '국어' : todo.subject === 'ENGLISH' ? '영어' : '수학');
            setValue('learningGoal', todo.goalDescription);
        }
    }, [mode, todo, setValue]);

    useEffect(() => {
        if (!todoDetail?.data) return;

        const d = todoDetail.data;

        setValue('title', d.title);
        setValue('learningGoal', d.goalDescription);
        setValue('subject', d.subject === 'KOREAN' ? '국어' : d.subject === 'ENGLISH' ? '영어' : '수학');

        setRangeStart(new Date(d.startDate));
        setRangeEnd(new Date(d.endDate));

        if (d.materials?.length) {
            setPreviewFiles(
                d.materials.map((m) => ({
                    type: 'server',
                    fileUrl: m.fileUrl,
                    fileName: m.fileName,
                }))
            );
            setCurrentIndex(0);
        }
    }, [todoDetail]);

    return (
        <form
            className="fixed inset-0 z-999 flex bg-[#22222266] items-end justify-center md:items-center"
            onSubmit={onSubmit}
        >
            <Controller
                name="learningFile"
                control={control}
                render={({ field }) => (
                    <input
                        id={LEARNING_FILE_INPUT_ID}
                        type="file"
                        className="hidden"
                        accept=".pdf,image/*"
                        aria-hidden
                        ref={field.ref}
                        name={field.name}
                        onBlur={field.onBlur}
                        onChange={(e) => {
                            const files = Array.from(e.target.files ?? []);
                            const mapped = files.map((file) => ({
                                type: 'local' as const,
                                file,
                            }));

                            setPreviewFiles((prev) => {
                                const next = [...prev, ...mapped];
                                setCurrentIndex(next.length - 1);
                                return next;
                            });
                        }}
                    />
                )}
            />
            <div className="relative flex flex-col w-full max-h-[90vh] lg:max-h-none rounded-t-2xl bg-primary-blue-pale shadow-[0px_2px_4px_1px_#00000040] md:h-auto md:min-h-[800px] md:w-[720px] md:max-w-[720px] md:rounded-2xl lg:w-[611px] lg:min-h-[756px] lg:max-w-[611px] pt-[31px] pb-[24px] md:pb-[52px] lg:pt-[27px] lg:pb-[29px]">
                <div className="flex shrink-0 justify-between items-center px-[18px] md:px-[38px]">
                    <h3 className="text-primary-blue text-2xl font-bold">학습 추가하기</h3>
                    <div className="flex gap-[6px] items-center">
                        <button
                            type="submit"
                            className="hidden lg:block py-[9px] px-[24px] bg-primary-blue rounded-[35px] text-white text-ui-button shadow-[0px_3.2px_3.2px_0px_#00000040]"
                        >
                            저장하기
                        </button>
                        <button
                            type="button"
                            className="hidden lg:flex w-[44px] h-[44px] bg-primary-blue-dark rounded-full justify-center items-center shadow-[0px_3.64px_3.64px_0px_#00000040]"
                            onClick={() => closeModal('TODO')}
                        >
                            <X className="w-[15px] h-[15px] text-white" />
                        </button>
                    </div>
                </div>
                <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar lg:flex-none lg:overflow-visible mt-[33px]">
                    <div className="pb-[34px] px-[18px] md:px-[38px] border-b border-grayscale-border">
                        <div className="flex flex-col gap-[28px] md:hidden">
                            <Controller
                                name="subject"
                                control={control}
                                render={({ field }) => (
                                    <div className="flex gap-[17px] items-center">
                                        <h4>과목</h4>
                                        <div className="flex gap-[18px]">
                                            {SUBJECTS.map((s) => (
                                                <button
                                                    key={s}
                                                    type="button"
                                                    onClick={() => field.onChange(s)}
                                                    className={clsx(
                                                        'py-[4px] px-[17px] rounded-[8px] text-ui-label shadow-[0px_2px_4px_0px_#00000026]',
                                                        field.value === s
                                                            ? SUBJECT_ACTIVE_CLASS[s]
                                                            : 'bg-grayscale-bg-gray text-grayscale-black'
                                                    )}
                                                >
                                                    {s}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            />
                            <div className="flex gap-[17px] items-center min-w-0">
                                <h4 className="shrink-0">제목</h4>
                                <input
                                    {...register('title')}
                                    type="text"
                                    className="h-[28px] min-w-0 flex-1 bg-grayscale-bg-gray shadow-[inset_0px_2px_4px_0px_#00000040] rounded-[6px] px-[11px] py-[4px]"
                                    placeholder="제목을 입력하세요."
                                />
                            </div>
                            <div className="flex gap-[17px] items-center min-w-0">
                                <h4 className="shrink-0">학습목표</h4>
                                <textarea
                                    {...register('learningGoal')}
                                    className="h-[55px] min-w-0 flex-1 px-[11px] py-[5px] bg-grayscale-bg-gray shadow-[inset_0px_2px_4px_0px_#00000040] rounded-[7px] resize-none"
                                    placeholder="학습 목표를 입력하세요."
                                />
                            </div>
                            <div className="flex gap-[38px] items-center">
                                <h4>학습지</h4>
                                <label
                                    htmlFor={LEARNING_FILE_INPUT_ID}
                                    className="cursor-pointer bg-primary-blue text-white text-[12px] px-[13px] py-[6px] rounded-[35px] shadow-[0px_3.68px_3.68px_0px_#00000040]"
                                >
                                    + 추가하기
                                </label>
                            </div>
                            <div className="w-full h-[117px] bg-[#D9D9D9] rounded-[7px] shadow-[inset_0px_2px_4px_0px_#00000040] px-[22px] py-[20px]"></div>
                        </div>
                        <div className="hidden md:flex flex-col gap-[28px] w-full">
                            <div className="flex w-full gap-[80px] items-center">
                                <Controller
                                    name="subject"
                                    control={control}
                                    render={({ field }) => (
                                        <div className="flex gap-[17px] items-center">
                                            <h4>과목</h4>
                                            <div className="flex gap-[18px]">
                                                {SUBJECTS.map((s) => (
                                                    <button
                                                        key={s}
                                                        type="button"
                                                        onClick={() => field.onChange(s)}
                                                        className={clsx(
                                                            'py-[4px] px-[17px] rounded-[8px] text-ui-label shadow-[0px_2px_4px_0px_#00000026]',
                                                            field.value === s
                                                                ? SUBJECT_ACTIVE_CLASS[s]
                                                                : 'bg-grayscale-bg-gray text-grayscale-black'
                                                        )}
                                                    >
                                                        {s}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                />
                                <div className="flex flex-1 gap-[38px] items-center min-w-0">
                                    <h4 className="shrink-0">학습지</h4>
                                    <label
                                        htmlFor={LEARNING_FILE_INPUT_ID}
                                        className="cursor-pointer shrink-0 bg-primary-blue text-white text-[12px] px-[13px] py-[6px] rounded-[35px] shadow-[0px_3.68px_3.68px_0px_#00000040]"
                                    >
                                        + 추가하기
                                    </label>
                                </div>
                            </div>
                            <div className="flex w-full gap-[32px] min-w-0">
                                <div className="flex shrink-0 flex-col gap-[32px]">
                                    <div className="flex gap-[17px] items-center">
                                        <h4 className="shrink-0">제목</h4>
                                        <input
                                            {...register('title')}
                                            type="text"
                                            className="h-[28px] w-[265px] bg-grayscale-bg-gray shadow-[inset_0px_2px_4px_0px_#00000040] rounded-[6px] px-[11px] py-[4px]"
                                            placeholder="제목을 입력하세요."
                                        />
                                    </div>
                                    <div className="flex gap-[17px] items-center">
                                        <h4 className="shrink-0">학습목표</h4>
                                        <textarea
                                            {...register('learningGoal')}
                                            className="h-[55px] w-[223px] px-[11px] py-[5px] bg-grayscale-bg-gray shadow-[inset_0px_2px_4px_0px_#00000040] rounded-[7px] resize-none"
                                            placeholder="학습 목표를 입력하세요."
                                        />
                                    </div>
                                </div>
                                <div className="relative min-w-[184px] flex-1 h-[117px] rounded-[7px] overflow-hidden bg-[#D9D9D9]">
                                    {!previewFiles.length && (
                                        <div className="w-full h-full shadow-[inset_0px_2px_4px_0px_#00000040]" />
                                    )}

                                    {previewFiles.length > 0 && (
                                        <>
                                            {current?.type === 'local' &&
                                                (current.file.type.startsWith('image/') ? (
                                                    <img src={URL.createObjectURL(current.file)} />
                                                ) : (
                                                    <embed src={URL.createObjectURL(current.file)} />
                                                ))}
                                            {current?.type === 'server' &&
                                                (current.fileUrl.endsWith('.pdf') ? (
                                                    <embed src={current.fileUrl} />
                                                ) : (
                                                    <img src={current.fileUrl} />
                                                ))}

                                            <button
                                                type="button"
                                                className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1"
                                                onClick={() => {
                                                    setPreviewFiles((prev) => {
                                                        const next = prev.filter((_, i) => i !== currentIndex);

                                                        setCurrentIndex((ci) => {
                                                            if (next.length === 0) return 0;
                                                            if (ci >= next.length) return next.length - 1;
                                                            return ci;
                                                        });

                                                        return next;
                                                    });
                                                }}
                                            >
                                                <X size={14} />
                                            </button>

                                            {previewFiles.length > 1 && (
                                                <>
                                                    <button
                                                        type="button"
                                                        className="absolute left-1 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-1"
                                                        onClick={() =>
                                                            setCurrentIndex((i) =>
                                                                i === 0 ? previewFiles.length - 1 : i - 1
                                                            )
                                                        }
                                                    >
                                                        ‹
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="absolute right-1 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-1"
                                                        onClick={() =>
                                                            setCurrentIndex((i) =>
                                                                i === previewFiles.length - 1 ? 0 : i + 1
                                                            )
                                                        }
                                                    >
                                                        ›
                                                    </button>
                                                </>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-[18px] md:px-[38px] mt-[24px]">
                        <div className="flex flex-col gap-[17px] md:flex-row md:gap-[51px]">
                            <h4 className="pt-[7px]">학습 기간</h4>
                            <div className="w-full md:w-[352px] sm:w-[326px]">
                                <CommonMonthRangeCalendar
                                    selectedDate={effectiveSelectedDate}
                                    displayMonth={displayMonth}
                                    onSelect={handleRangeSelect}
                                    onChangeMonth={setDisplayMonth}
                                    rangeStart={rangeStart}
                                    rangeEnd={rangeEnd}
                                    classNames={{
                                        header: 'text-primary-blue',
                                        arrow: 'invert',
                                        weekday: 'text-primary-blue',
                                        date: 'text-primary-blue',
                                        selectedDate: 'bg-primary-blue text-white',
                                        range: 'bg-primary-blue text-white',
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="px-[18px] md:px-[38px] mt-[23px]">
                        <div className="flex flex-col gap-[17px] md:flex-row md:gap-[51px]">
                            <h4>학습 요일</h4>
                            <Controller
                                name="repeatDays"
                                control={control}
                                render={({ field }) => {
                                    const value = field.value ?? [];

                                    return (
                                        <div className="w-full md:w-[75%] flex gap-[15px] items-center">
                                            {DAYS.map((day) => {
                                                const active = value.includes(day.value);

                                                return (
                                                    <button
                                                        key={day.value}
                                                        type="button"
                                                        onClick={() =>
                                                            field.onChange(
                                                                active
                                                                    ? value.filter((d) => d !== day.value)
                                                                    : [...value, day.value]
                                                            )
                                                        }
                                                        className={clsx(
                                                            'w-[37px] h-[37px] rounded-full',
                                                            active
                                                                ? 'bg-[#001871] text-[#FEFEFE]'
                                                                : 'bg-grayscale-bg-gray text-grayscale-medium-gray'
                                                        )}
                                                    >
                                                        {day.label}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    );
                                }}
                            />
                        </div>
                        <div className="lg:hidden flex justify-center mt-[27px]">
                            <button
                                type="submit"
                                className="py-[11px] px-[47px] bg-primary-blue rounded-[35px] text-white text-ui-button shadow-[0px_3.2px_3.2px_0px_#00000040]"
                            >
                                저장하기
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default TodoModal;
