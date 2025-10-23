import { create } from "zustand";

interface Count {
  count: number;
  increment: (value: number) => void;
  decrement: (value: number) => void;
}

const useCounterStore = create<Count>((set) => ({
  count: 0,
  increment: (value) => set({ count: value + 1 }),
  decrement: (value) => set({ count: value - 1 }),
}));
export default useCounterStore;
