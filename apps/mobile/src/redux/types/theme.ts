import { ThemeType, ThemeColors } from '../../themes/colors';

export interface ThemeState {
  themeType: ThemeType;
  theme: ThemeColors;
}

export const SET_THEME = 'SET_THEME';

export interface SetThemeAction {
  type: typeof SET_THEME;
  payload: ThemeType;
  [key: string]: any;
}