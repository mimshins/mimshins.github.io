/* eslint-disable @typescript-eslint/ban-ts-comment */
import createStore, { type State } from "zustand";
import { persist } from "zustand/middleware";

interface PageState extends State {
  isPageLoading: boolean;
  isDarkMode: boolean;
  setPageLoading: (isLoading: boolean) => void;
  setIsDarkMode: (isDarkMode: boolean) => void;
}

export const usePageState = createStore<PageState>(
  persist(
    set => ({
      isPageLoading: false,
      isDarkMode: false,
      setPageLoading: isPageLoading => set(() => ({ isPageLoading })),
      setIsDarkMode: isDarkMode => set(() => ({ isDarkMode }))
    }),
    {
      name: "theme-mode-storage",
      //@ts-ignore
      partialize: state => ({
        isDarkMode: state.isDarkMode
      })
    }
  )
);
