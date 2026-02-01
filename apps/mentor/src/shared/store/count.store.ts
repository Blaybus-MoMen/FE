import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'


interface CounterStore {
    count: number
    increment: () => void
    decrement: () => void
}

export const useCounterStore = create<CounterStore>((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),

}))

export const useCounterActions = () => {
    return useCounterStore(
        useShallow((state) => ({
            increment: state.increment,
            decrement: state.decrement,
        }))
    );
};