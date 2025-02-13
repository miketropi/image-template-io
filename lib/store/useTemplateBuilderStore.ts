import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type TemplateBuilderState = {
  name: string;
  age: number;
  setName: (name: string) => void;
};

export const useTemplateBuilderStore = create<TemplateBuilderState>()(
  immer((set) => ({
    name: 'Guest',
    age: 20,
    setName: (name) => set((state) => { state.name = name; })
  }))
);
