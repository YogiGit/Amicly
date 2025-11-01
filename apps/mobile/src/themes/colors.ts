// Six-theme color system for Amicly (ReferenceApp-Expo foundation)

export interface ThemeColors {
  backgroundColor: string;
  textColor: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  borderColor: string;
  cardBackground: string;
  shadowColor: string;
  statusBarStyle: 'dark-content' | 'light-content';
}

export const lightTheme: ThemeColors = {
  backgroundColor: '#FFFFFF',
  textColor: '#000000',
  primaryColor: '#FF4D67',
  secondaryColor: '#F8F9FA',
  accentColor: '#007AFF',
  borderColor: '#E1E5E9',
  cardBackground: '#FFFFFF',
  shadowColor: '#000000',
  statusBarStyle: 'dark-content',
};

export const lightBlueTheme: ThemeColors = {
  backgroundColor: '#F0F9FF',
  textColor: '#0F172A',
  primaryColor: '#FF4D67',
  secondaryColor: '#E0F2FE',
  accentColor: '#0EA5E9',
  borderColor: '#BAE6FD',
  cardBackground: '#FFFFFF',
  shadowColor: '#0369A1',
  statusBarStyle: 'dark-content',
};

export const lightWarmTheme: ThemeColors = {
  backgroundColor: '#FFFBEB',
  textColor: '#1C1917',
  primaryColor: '#FF4D67',
  secondaryColor: '#FEF3C7',
  accentColor: '#F59E0B',
  borderColor: '#FDE68A',
  cardBackground: '#FFFFFF',
  shadowColor: '#92400E',
  statusBarStyle: 'dark-content',
};

export const darkTheme: ThemeColors = {
  backgroundColor: '#000000',
  textColor: '#FFFFFF',
  primaryColor: '#FF4D67',
  secondaryColor: '#1A1A1A',
  accentColor: '#007AFF',
  borderColor: '#333333',
  cardBackground: '#1A1A1A',
  shadowColor: '#FFFFFF',
  statusBarStyle: 'light-content',
};

export const darkBlueTheme: ThemeColors = {
  backgroundColor: '#0F172A',
  textColor: '#F1F5F9',
  primaryColor: '#FF4D67',
  secondaryColor: '#1E293B',
  accentColor: '#38BDF8',
  borderColor: '#334155',
  cardBackground: '#1E293B',
  shadowColor: '#F1F5F9',
  statusBarStyle: 'light-content',
};

export const darkPurpleTheme: ThemeColors = {
  backgroundColor: '#1A0B2E',
  textColor: '#F3E8FF',
  primaryColor: '#FF4D67',
  secondaryColor: '#2D1B69',
  accentColor: '#A855F7',
  borderColor: '#4C1D95',
  cardBackground: '#2D1B69',
  shadowColor: '#F3E8FF',
  statusBarStyle: 'light-content',
};

export const themes = {
  light: lightTheme,
  lightBlue: lightBlueTheme,
  lightWarm: lightWarmTheme,
  dark: darkTheme,
  darkBlue: darkBlueTheme,
  darkPurple: darkPurpleTheme,
};

export type ThemeType = keyof typeof themes;

export const getTheme = (themeType: ThemeType): ThemeColors => {
  return themes[themeType];
};

export const isDarkTheme = (themeType: ThemeType): boolean => {
  return themeType === 'dark' || themeType === 'darkBlue' || themeType === 'darkPurple';
};