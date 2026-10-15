import { createContext, useContext } from 'react';

// Kept apart from DirectionalTheme.jsx so that file only exports components (react-refresh rule).
export const ColorModeContext = createContext(null);

// { mode, toggleMode }; see DirectionalTheme.
export function useColorMode() {
  const value = useContext(ColorModeContext);
  if (!value) throw new Error('useColorMode must be used inside <DirectionalTheme>.');
  return value;
}
