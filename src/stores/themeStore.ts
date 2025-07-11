import { create } from 'zustand'

// type ThemeState = {
//   darkMode: boolean
// };

type AppStoreProps = {
  footerCopyText: string
  appName: string
}

// type ThemeAction = {
//   toggleTheme: (darkMode: ThemeState['darkMode']) => void
// };

// const getInitialDarkMode = (): boolean => {
//   const stored = localStorage.getItem("darkMode");
//   return stored ? JSON.parse(stored) : false;
// }

// export const useToggleTheme = create<ThemeState & ThemeAction>((set) => ({
//   darkMode: getInitialDarkMode(),
//   toggleTheme: () => set((state) => {
//     const next = !state.darkMode;
//     localStorage.setItem("darkMode", JSON.stringify(next));

//     return { darkMode: next };
//   }),
// }));

export const useAppStore = create<AppStoreProps>(() => ({
  appName: "Rizz Movie",
  footerCopyText: "2025 © Rizz Movie by rizzkijo.",
}));
