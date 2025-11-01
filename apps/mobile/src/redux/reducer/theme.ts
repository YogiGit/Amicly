import { getTheme } from '../../themes/colors';
import { ThemeState, SET_THEME, SetThemeAction } from '../types/theme';

const initialState: ThemeState = {
  themeType: 'light',
  theme: getTheme('light'),
};

export const themeReducer = (
  state = initialState,
  action: SetThemeAction
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