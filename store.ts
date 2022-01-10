import createStore, { State } from "zustand";

interface PageState extends State {
  isPageLoading: boolean;
  isDarkMode: boolean;
  setPageLoading: (isLoading: boolean) => void;
  setIsDarkMode: (isDarkMode: boolean) => void;
}

export const usePageState = createStore<PageState>(set => ({
  isPageLoading: false,
  isDarkMode: false,
  setPageLoading: isPageLoading => set(() => ({ isPageLoading })),
  setIsDarkMode: isDarkMode => set(() => ({ isDarkMode }))
}));
