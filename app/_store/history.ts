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

    // set((state) => {
    //   const lastHistory = state.history[state.history.length - 1];
    //   const secondLastHistory = state.history[state.history.length - 2] ?? "/";

    //   if (pathname !== lastHistory) {
    //     return {
    //       history: [secondLastHistory, lastHistory, pathname],
    //     };
    //   } else return state;
    // });
  },
}));
