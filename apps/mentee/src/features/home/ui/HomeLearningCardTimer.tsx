import { useState, useEffect } from 'react';
import alarm from '@/assets/icons/alarm.svg';
import play from '@/assets/icons/play.svg';
import pause from '@/assets/icons/pause.svg';
import stop from '@/assets/icons/stop.svg';
import { useUpdateStudyTimeMutation } from '@/entities/study/queries/study.queries';

const STORAGE_KEY = 'learning-timer';

function formatElapsed(seconds: number): string {
    if (!Number.isFinite(seconds) || seconds < 0) {
        return '00:00:00';
    }

    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    return [h, m, s].map((n) => String(n).padStart(2, '0')).join(':');
}

interface StoredTimer {
    elapsedSeconds: number;
    startedAt: number | null;
    isActive: boolean;
}

export interface IHomeLearningCardTimerProps {
    todoId: number;
}
function getInitialTimerState(todoId: number) {
    const raw = localStorage.getItem(`learning-timer-${todoId}`);
    if (!raw) {
        return {
            elapsedSeconds: 0,
            startedAt: null,
            isActive: false,
        };
    }

    return JSON.parse(raw);
}

export const HomeLearningCardTimer = ({ todoId }: IHomeLearningCardTimerProps) => {
    const initial = getInitialTimerState(todoId);

    const [elapsedSeconds, setElapsedSeconds] = useState(
        () => initial.elapsedSeconds
    );
    const [startedAt, setStartedAt] = useState<number | null>(
        () => initial.startedAt
    );
    const [isActive, setIsActive] = useState(
        () => initial.isActive
    );
    const [now, setNow] = useState(() => Date.now());

    const { mutateAsync } = useUpdateStudyTimeMutation()




    useEffect(() => {
        if (!isActive) return;

        const interval = setInterval(() => {
            setNow(Date.now());
        }, 1000);

        return () => clearInterval(interval);
    }, [isActive]);

    useEffect(() => {
        if (!startedAt && elapsedSeconds === 0) return;

        const data: StoredTimer = {
            elapsedSeconds,
            startedAt,
            isActive,
        };

        localStorage.setItem(`${STORAGE_KEY}-${todoId}`, JSON.stringify(data));
    }, [elapsedSeconds, startedAt, isActive, todoId]);

    const displaySeconds = (() => {
        if (!isActive) return elapsedSeconds;
        if (!startedAt) return elapsedSeconds;

        const diff = Math.floor((now - startedAt) / 1000);
        return Math.max(0, elapsedSeconds + diff);
    })();


    const handleStart = () => {
        setStartedAt(Date.now());
        setIsActive(true);
    };

    const handlePause = () => {
        if (!startedAt) return;

        const diff = Math.floor((Date.now() - startedAt) / 1000);
        setElapsedSeconds((prev: number) => prev + diff);
        setStartedAt(null);
        setIsActive(false);
    };

    const handleStop = async () => {
        try {
            setElapsedSeconds(0);
            setStartedAt(null);
            setIsActive(false);
            localStorage.removeItem(`${STORAGE_KEY}-${todoId}`);
            const params = {
                todoId,
                studyTime: displaySeconds,
            }
            await mutateAsync(params)
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='flex-1 rounded-[20px] bg-[#FEFEFE] p-[12px] h-[135px] flex flex-col justify-between'>
            <div className='flex gap-[4px]'>
                <img src={alarm} alt='alarm' />
                <p className='text-[14px] text-grayscale-dark-gray'>타이머</p>
            </div>

            <p className='text-[28px] text-grayscale-dark-gray'>
                {formatElapsed(displaySeconds)}
            </p>

            <div className='flex justify-end gap-[4px]'>
                {displaySeconds === 0 && !isActive ? (
                    <button onClick={handleStart}>
                        <img src={play} alt='play' />
                    </button>
                ) : isActive ? (
                    <>
                        <button onClick={handlePause}>
                            <img src={pause} alt='pause' />
                        </button>
                        <button onClick={handleStop}>
                            <img src={stop} alt='stop' />
                        </button>
                    </>
                ) : (
                    <>
                        <button onClick={handleStart}>
                            <img src={play} alt='play' />
                        </button>
                        <button onClick={handleStop}>
                            <img src={stop} alt='stop' />
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};