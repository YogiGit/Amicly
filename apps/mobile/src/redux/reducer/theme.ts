import { getTheme } from '../../themes/colors';
import { ThemeState, SET_THEME, SetThemeAction } from '../types/theme';

const initialState: ThemeState = {
  themeType: 'light',
  theme: getTheme('light'),
};

type ThemeAction = SetThemeAction | { type: string; [key: string]: any };

export const themeReducer = (
  state = initialState,
  action: ThemeAction
): ThemeState => {
  switch (action.type) {
    case SET_THEME:
      return {
        ...state,
        themeType: action.payload,
        theme: getTheme(action.payload),
      };
    default:
      return state;
  }
};