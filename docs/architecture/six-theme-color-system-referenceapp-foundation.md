# Six-Theme Color System (ReferenceApp Foundation)

## Six-Theme Architecture

The project implements ReferenceApp's sophisticated 6-theme system with 3 light and 3 dark variations, allowing users to personalize their experience through an intuitive theme selector interface.

## Primary Color Palette

```javascript
// Primary Brand Colors (shared across all themes)
const commonColor = {
  white: '#FFFFFF',
  black: '#000000',
  primary: '#FF4D67',        // Main brand color (pink/red)
  primaryTransparent: '#FF4D6714', // 14% opacity primary
  lightRed: '#FF5C74',       // Lighter variant
  redColor: '#F75555',       // Error states
  orange: '#FB9400',         // Warning/accent
  blue: '#7210FF',           // Info/secondary actions
  yellow: '#FFD300',         // Highlights
  grayScale1: '#F5F5F5',     // Lightest gray
  grayScale3: '#E0E0E0',     // Light gray
  grayScale4: '#BDBDBD',     // Medium light gray
  grayScale5: '#9E9E9E',     // Medium gray
  grayScale7: '#616161',     // Dark gray
}
```

## Complete Theme Implementations

```javascript
// === LIGHT THEMES ===

// 1. Classic Light Theme
const LightColor = {
  light: 'light',
  backgroundColor: '#FFFFFF',
  textColor: '#212121',
  textRevertColor: '#FFFFFF',
  btnColor3: '#EEEEEE',
  inputBg: '#FAFAFA',
  dark3: '#FFEDF0',
  iconColor: '#9E9E9E',
  bColor: '#EEEEEE',
  btnColor1: '#FFFFFF',
}

// 2. Ocean Breeze (Light Blue)
const LightBlueColor = {
  lightBlue: 'lightBlue',
  backgroundColor: '#F8FAFF',
  textColor: '#1A1F36',
  textRevertColor: '#FFFFFF',
  btnColor3: '#E8F1FF',
  inputBg: '#F0F6FF',
  dark3: '#E3F2FD',
  iconColor: '#7B8BB2',
  bColor: '#E0EFFF',
  btnColor1: '#F8FAFF',
}

// 3. Golden Hour (Light Warm)
const LightWarmColor = {
  lightWarm: 'lightWarm',
  backgroundColor: '#FFFBF7',
  textColor: '#2D1B0E',
  textRevertColor: '#FFFFFF',
  btnColor3: '#FFF2E6',
  inputBg: '#FEF8F2',
  dark3: '#FFF0E6',
  iconColor: '#B8956A',
  bColor: '#FFEAD6',
  btnColor1: '#FFFBF7',
}

// === DARK THEMES ===

// 4. Classic Dark Theme
const DarkColor = {
  dark: 'dark',
  backgroundColor: '#181A20',
  textColor: '#FFFFFF',
  textRevertColor: '#212121',
  btnColor3: '#1F222A',
  inputBg: '#1F222A',
  dark3: '#35383F',
  iconColor: '#616161',
  bColor: '#35383F',
  btnColor1: '#1F222A',
}

// 5. Midnight Blue (Dark Blue)
const DarkBlueColor = {
  darkBlue: 'darkBlue',
  backgroundColor: '#0F1419',
  textColor: '#E8F4FF',
  textRevertColor: '#0F1419',
  btnColor3: '#1A2332',
  inputBg: '#162029',
  dark3: '#243447',
  iconColor: '#5A6B7D',
  bColor: '#243447',
  btnColor1: '#1A2332',
}

// 6. Royal Purple (Dark Purple)
const DarkPurpleColor = {
  darkPurple: 'darkPurple',
  backgroundColor: '#1A0F1F',
  textColor: '#F5F0FF',
  textRevertColor: '#1A0F1F',
  btnColor3: '#2D1B35',
  inputBg: '#251A2E',
  dark3: '#3D2A47',
  iconColor: '#8B7A9B',
  bColor: '#3D2A47',
  btnColor1: '#2D1B35',
}

// Export all themes with common colors
export const colors = {
  light: { ...LightColor, ...commonColor },
  lightBlue: { ...LightBlueColor, ...commonColor },
  lightWarm: { ...LightWarmColor, ...commonColor },
  dark: { ...DarkColor, ...commonColor },
  darkBlue: { ...DarkBlueColor, ...commonColor },
  darkPurple: { ...DarkPurpleColor, ...commonColor },
}
```

## Typography System (Urbanist Font Family)

```javascript
// Font Family Configuration
const fontWeights = {
  Regular: { fontFamily: 'Urbanist-Regular' },
  Medium: { fontFamily: 'Urbanist-Medium' },
  SemiBold: { fontFamily: 'Urbanist-SemiBold' },
  Bold: { fontFamily: 'Urbanist-Bold' },
}

// Font Size Scale (using moderateScale for responsive sizing)
const fontSizes = {
  f12: { fontSize: moderateScale(12) },
  f14: { fontSize: moderateScale(14) },
  f16: { fontSize: moderateScale(16) },
  f18: { fontSize: moderateScale(18) },
  f20: { fontSize: moderateScale(20) },
  f24: { fontSize: moderateScale(24) },
  f28: { fontSize: moderateScale(28) },
  f32: { fontSize: moderateScale(32) },
  f36: { fontSize: moderateScale(36) },
  f40: { fontSize: moderateScale(40) },
}
```
