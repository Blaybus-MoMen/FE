import type { Subjects } from '@/entities/manage/api/manage.api.type';

export const SUBJECT_MAP: Record<'국어' | '영어' | '수학', Subjects> = {
    국어: 'KOREAN',
    영어: 'ENGLISH',
    수학: 'MATH',
};
