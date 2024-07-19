import { create } from "zustand";

type State = {
  query: string;
};

type Action = {
  clear: () => void;
  updateQuery: (value: string) => void;
};

export const useSearchQuery = create<State & Action>((set) => ({
  query: "",
  clear: () => set({ query: "" }),
  updateQuery: (value) => set({ query: value }),
}));
