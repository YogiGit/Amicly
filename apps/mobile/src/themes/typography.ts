import { moderateScale } from './commonStyle';

// Urbanist font weights (Regular, Medium, SemiBold, Bold)
export const FontWeights = {
  R: 'Urbanist-Regular',
  M: 'Urbanist-Medium',
  S: 'Urbanist-SemiBold',
  B: 'Urbanist-Bold',
};

// Available font sizes for ZText components
export const FontSizes = {
  12: moderateScale(12),
  14: moderateScale(14),
  16: moderateScale(16),
  18: moderateScale(18),
  20: moderateScale(20),
  22: moderateScale(22),
  24: moderateScale(24),
  26: moderateScale(26),
  28: moderateScale(28),
  30: moderateScale(30),
  32: moderateScale(32),
  34: moderateScale(34),
  36: moderateScale(36),
  40: moderateScale(40),
  46: moderateScale(46),
};

// ZText type format: [Weight][Size] (e.g., "B18" for Bold 18px)
export const getTypographyStyle = (type: string) => {
  const weight = type.charAt(0) as keyof typeof FontWeights;
  const size = parseInt(type.substring(1)) as keyof typeof FontSizes;

  return {
    fontFamily: FontWeights[weight] || FontWeights.R,
    fontSize: FontSizes[size] || FontSizes[16],
  };
};

// Pre-defined text styles for common use cases
export const TextStyles = {
  // Headlines
  H1: getTypographyStyle('B32'),
  H2: getTypographyStyle('B28'),
  H3: getTypographyStyle('S24'),
  H4: getTypographyStyle('S20'),
  H5: getTypographyStyle('M18'),
  H6: getTypographyStyle('M16'),

  // Body text
  Body1: getTypographyStyle('R16'),
  Body2: getTypographyStyle('R14'),

  // UI elements
  Button: getTypographyStyle('S16'),
  Caption: getTypographyStyle('R12'),
  Overline: getTypographyStyle('S12'),

  // Conversation specific
  MessageText: getTypographyStyle('R16'),
  MessageTime: getTypographyStyle('R12'),
  UserName: getTypographyStyle('S14'),
};