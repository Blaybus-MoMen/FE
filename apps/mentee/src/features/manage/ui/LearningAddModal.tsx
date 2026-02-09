import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useModalActions } from '@/shared/store/modal.store';
import { MODAL_KEY } from '@/shared/model/modal';
import { SUBJECT_LIST } from '@/shared/constants/constants';
import { clsx } from 'clsx';
import MobileSelect from '@/shared/ui/MobileSelect';

const YEARS = Array.from({ length: 11 }, (_, i) => 2020 + i);
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);
const getDaysInMonth = (year: number, month: number) =>
    new Date(year, month, 0).getDate();
const DAYS = (year: number, month: number) =>
    Array.from({ length: getDaysInMonth(year, month) }, (_, i) => i + 1);

const WEEKDAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'] as const;

const learningAddSchema = z.object({
    subject: z.enum(['KOREAN', 'ENGLISH', 'MATH']),
    title: z.string().min(1, '제목을 입력하세요.'),
    goalDescription: z.string().min(1, '학습 목표를 입력하세요.'),
    startYear: z.number(),
    startMonth: z.number(),
    startDay: z.number(),
    endYear: z.number(),
    endMonth: z.number(),
    endDay: z.number(),
    studyDays: z.array(z.number().min(0).max(6)).min(1, '학습 요일을 1개 이상 선택하세요.'),
}).refine(
    (data) => {
        const start = new Date(data.startYear, data.startMonth - 1, data.startDay).getTime();
        const end = new Date(data.endYear, data.endMonth - 1, data.endDay).getTime();
        return start <= end;
    },
    { message: '종료일은 시작일 이후여야 합니다.', path: ['endDay'] }
);

type LearningAddFormValues = z.infer<typeof learningAddSchema>;

const formatDate = (year: number, month: number, day: number) =>
    `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

const parseDateString = (dateStr: string) => {
    const [y, m, d] = dateStr.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    return { year: y, month: m, day: d, weekday: date.getDay() };
};

const LearningAddModal = ({ date }: { date: string }) => {
    const { closeModal } = useModalActions();
    const { year, month, day, weekday } = parseDateString(date);

    const {
        register,
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isValid },
    } = useForm<LearningAddFormValues>({
        resolver: zodResolver(learningAddSchema),
        defaultValues: {
            subject: 'KOREAN',
            title: '',
            goalDescription: '',
            startYear: year,
            startMonth: month,
            startDay: day,
            endYear: year,
            endMonth: month,
            endDay: day,
            studyDays: [weekday],
        },
    });



    const startYear = watch('startYear');
    const startMonth = watch('startMonth');
    const startDay = watch('startDay');
    const endYear = watch('endYear');
    const endMonth = watch('endMonth');
    const endDay = watch('endDay');

    const onSubmit = (data: LearningAddFormValues) => {
        const startDate = formatDate(data.startYear, data.startMonth, data.startDay);
        const endDate = formatDate(data.endYear, data.endMonth, data.endDay);
        void { data, startDate, endDate };
        closeModal(MODAL_KEY.LEARNING_ADD);
    };

    const studyDays = watch('studyDays');
    const toggleStudyDay = (day: number) => {
        const next = studyDays.includes(day)
            ? studyDays.filter((d: number) => d !== day)
            : [...studyDays, day].sort((a, b) => a - b);
        setValue('studyDays', next);
    };

    return (
        <div
            className="fixed inset-0 z-50 flex flex-col justify-end "
            role="presentation"
            onClick={() => closeModal(MODAL_KEY.LEARNING_ADD)}
        >
            <div
                role="dialog"
                aria-modal="true"
                className="w-full rounded-tl-[30px] rounded-tr-[30px] bg-white min-h-[457px] shadow-[0px_7px_33px_0px_rgba(0,0,0,0.25)] py-[24px] px-[22px]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-center">
                    <h3 className="font-medium text-primary-blue">학습 추가하기</h3>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                    <div className='mt-[24px] flex flex-col gap-[16px] pb-[26px] border-b border-grayscale-bg-gray'>
                        <div className="flex gap-[28px] items-center">
                            <h4 className='text-[14px]'>과목</h4>
                            <div className="flex gap-[18px]">
                                <Controller
                                    name="subject"
                                    control={control}
                                    render={({ field }) => (
                                        <>
                                            {SUBJECT_LIST.map((item) => (
                                                <button
                                                    key={item.value}
                                                    type="button"
                                                    onClick={() => field.onChange(item.value)}
                                                    className={clsx(
                                                        'py-[4px] px-[17px] rounded-[8px] text-[14px] shadow-[0px_2px_4px_0px_#00000026]',
                                                        field.value === item.value
                                                            ? 'bg-primary-blue text-white'
                                                            : 'bg-grayscale-bg-gray text-grayscale-black'
                                                    )}
                                                >
                                                    {item.label}
                                                </button>
                                            ))}
                                        </>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="flex gap-[28px] items-center">
                            <h4 className='text-[14px]'>제목</h4>
                            <input
                                {...register('title')}
                                type="text"
                                className="h-[28px] w-[265px] bg-grayscale-bg-gray shadow-[inset_0px_2px_4px_0px_#00000040] rounded-[50px] px-[11px] py-[4px] text-[14px] placeholder:text-[12px]"
                                placeholder="제목을 입력하세요."
                            />
                        </div>
                        {errors.title && (
                            <p className="text-[12px] text-red-500 -mt-2">{errors.title.message}</p>
                        )}
                    </div>
                    <div className='mt-[13px] flex flex-col gap-[25px]'>
                        <div className="flex gap-[28px] items-center">
                            <h4 className='text-[14px]'>학습 목표</h4>
                            <input
                                {...register('goalDescription')}
                                type="text"
                                className="h-[28px] w-[242px] bg-grayscale-bg-gray shadow-[inset_0px_2px_4px_0px_#00000040] rounded-[50px] px-[11px] py-[4px] text-[14px] placeholder:text-[12px]"
                                placeholder="학습 목표를 입력하세요."
                            />
                        </div>
                        {errors.goalDescription && (
                            <p className="text-[12px] text-red-500 -mt-2">{errors.goalDescription.message}</p>
                        )}
                        <ul className="flex flex-col gap-[13px] list-none p-0 m-0">
                            <li className="flex gap-[28px] items-center">
                                <h4 className="text-[14px] w-[72px] shrink-0">학습 시작</h4>
                                <div className="flex items-center gap-[5px] flex-wrap">
                                    <Controller
                                        name="startYear"
                                        control={control}
                                        render={({ field }) => (
                                            <MobileSelect
                                                value={field.value}
                                                options={YEARS}
                                                getLabel={(y) => `${y}년`}
                                                onChange={(y) => {
                                                    field.onChange(y);
                                                    const maxDay = getDaysInMonth(y, startMonth);
                                                    if (startDay > maxDay) setValue('startDay', maxDay);
                                                }}
                                            />
                                        )}
                                    />
                                    <Controller
                                        name="startMonth"
                                        control={control}
                                        render={({ field }) => (
                                            <MobileSelect
                                                value={field.value}
                                                options={MONTHS}
                                                getLabel={(m) => `${m}월`}
                                                onChange={(m) => {
                                                    field.onChange(m);
                                                    const maxDay = getDaysInMonth(startYear, m);
                                                    if (startDay > maxDay) setValue('startDay', maxDay);
                                                }}
                                            />
                                        )}
                                    />
                                    <Controller
                                        name="startDay"
                                        control={control}
                                        render={({ field }) => (
                                            <MobileSelect
                                                value={Math.min(field.value, getDaysInMonth(startYear, startMonth))}
                                                options={DAYS(startYear, startMonth)}
                                                getLabel={(d) => `${d}일`}
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                </div>
                            </li>
                            <li className="flex gap-[28px] items-center">
                                <h4 className="text-[14px] w-[72px] shrink-0">학습 종료</h4>
                                <div className="flex items-center gap-[6px] flex-wrap">
                                    <Controller
                                        name="endYear"
                                        control={control}
                                        render={({ field }) => (
                                            <MobileSelect
                                                value={field.value}
                                                options={YEARS}
                                                getLabel={(y) => `${y}년`}
                                                onChange={(y) => {
                                                    field.onChange(y);
                                                    const maxDay = getDaysInMonth(y, endMonth);
                                                    if (endDay > maxDay) setValue('endDay', maxDay);
                                                }}
                                            />
                                        )}
                                    />
                                    <Controller
                                        name="endMonth"
                                        control={control}
                                        render={({ field }) => (
                                            <MobileSelect
                                                value={field.value}
                                                options={MONTHS}
                                                getLabel={(m) => `${m}월`}
                                                onChange={(m) => {
                                                    field.onChange(m);
                                                    const maxDay = getDaysInMonth(endYear, m);
                                                    if (endDay > maxDay) setValue('endDay', maxDay);
                                                }}
                                            />
                                        )}
                                    />
                                    <Controller
                                        name="endDay"
                                        control={control}
                                        render={({ field }) => (
                                            <MobileSelect
                                                value={Math.min(field.value, getDaysInMonth(endYear, endMonth))}
                                                options={DAYS(endYear, endMonth)}
                                                getLabel={(d) => `${d}일`}
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                </div>
                            </li>
                        </ul>
                        {errors.endDay && (
                            <p className="text-[12px] text-red-500">{errors.endDay.message}</p>
                        )}
                        <div className="flex flex-col gap-[17px] md:flex-row md:gap-[51px]">
                            <h4>학습 요일</h4>
                            <Controller
                                name="studyDays"
                                control={control}
                                render={({ field }) => (
                                    <div className="w-full md:w-[75%] flex gap-[15px] items-center">
                                        {WEEKDAY_LABELS.map((_, i) => (
                                            <button
                                                key={i}
                                                type="button"
                                                onClick={() => toggleStudyDay(i)}
                                                className={clsx(
                                                    'w-[37px] h-[37px] rounded-full text-[14px]',
                                                    field.value.includes(i)
                                                        ? 'bg-primary-blue text-white'
                                                        : 'bg-grayscale-bg-gray text-grayscale-medium-gray'
                                                )}
                                            >
                                                {WEEKDAY_LABELS[i]}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={!isValid}
                        className="w-full mt-[24px] py-[14px] rounded-[50px] bg-primary-blue text-white text-[14px] font-medium disabled:bg-grayscale-light-gray disabled:text-grayscale-dark-gray"
                    >
                        추가하기
                    </button>
                </form>
            </div>
        </div >
    );
};

export default LearningAddModal;
