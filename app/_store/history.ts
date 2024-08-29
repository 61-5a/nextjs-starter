import { create } from "zustand";

type HistoryStore = {
  history: string[];
  setHistory: (pathname: string) => void;
};

export const useHistoryStore = create<HistoryStore>((set) => ({
  history: ["/"],
  setHistory: (pathname: string) => {
    set((state) => ({
      history:
        pathname !== state.history[state.history.length - 1]
          ? [state.history[state.history.length - 2] ?? "/", state.history[state.history.length - 1], pathname]
          : state.history,
    }));
  },
}));
