import { themeReducer } from '../../redux/reducer/theme';
import { setTheme } from '../../redux/action/theme';
import { getTheme } from '../../themes/colors';

describe('themeReducer', () => {
  it('should return the initial state', () => {
    const initialState = {
      themeType: 'light' as const,
      theme: getTheme('light'),
    };
    expect(themeReducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(initialState);
  });

  it('should handle SET_THEME action', () => {
    const action = setTheme('dark');
    const expectedState = {
      themeType: 'dark',
      theme: getTheme('dark'),
    };
    expect(themeReducer(undefined, action)).toEqual(expectedState);
  });
});