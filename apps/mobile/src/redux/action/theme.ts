import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dispatch } from 'redux';
import { ThemeType } from '../../themes/colors';
import { SET_THEME, SetThemeAction } from '../types/theme';

export const THEME_STORAGE_KEY = 'AMICLY_THEME';

export const setTheme = (themeType: ThemeType): SetThemeAction => ({
  type: SET_THEME,
  payload: themeType,
});

export const setThemeColor = (themeType: ThemeType) => {
  return async (dispatch: Dispatch) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, themeType);
      dispatch(setTheme(themeType));
    } catch (error) {
      console.error('Error saving theme to AsyncStorage:', error);
      // Still dispatch the theme change even if storage fails
      dispatch(setTheme(themeType));
    }
  };
};

export const loadThemeFromStorage = () => {
  return async (dispatch: Dispatch) => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme) {
        dispatch(setTheme(savedTheme as ThemeType));
      }
    } catch (error) {
      console.error('Error loading theme from AsyncStorage:', error);
      // Default to light theme if loading fails
      dispatch(setTheme('light'));
    }
  };
};