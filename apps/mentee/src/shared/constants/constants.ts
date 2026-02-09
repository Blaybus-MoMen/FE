export const SUBJECT_COLOR = {
    '국어': 'bg-secondary-sky-pale',
    '영어': 'bg-accent-purple',
    '수학': 'bg-point-yellow',
}

export const SUBJECT_NAME = {
    'KOREAN': '국어',
    'ENGLISH': '영어',
    'MATH': '수학',
}

export const SUBJECT_TODO_CARD_STYLE = {
    KOREAN: {
        headerBg: 'bg-[#BFEAFE4D]',
        subjectBg: 'bg-secondary-sky-light',
    },
    ENGLISH: {
        headerBg: 'bg-[#D7C1F24D]',
        subjectBg: 'bg-accent-purple',
    },
    MATH: {
        headerBg: 'bg-[#FFF59D26]',
        subjectBg: 'bg-point-yellow',
    },
} as const

export const SUBJECT_LIST = [
    {
        label: SUBJECT_NAME.KOREAN,
        value: 'KOREAN',
    },
    {
        label: SUBJECT_NAME.ENGLISH,
        value: 'ENGLISH',
    },
    {
        label: SUBJECT_NAME.MATH,
        value: 'MATH',
    },
]