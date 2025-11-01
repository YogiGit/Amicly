import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Responsive scaling function for ReferenceApp-Expo compatibility
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

export const horizontalScale = (size: number) => (width / guidelineBaseWidth) * size;
export const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
export const moderateScale = (size: number, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;

// Common styles used throughout the app
export const CommonStyles = {
  shadow: {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  center: {
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  flex1: {
    flex: 1,
  },
  fullWidth: {
    width: '100%',
  },
  fullHeight: {
    height: '100%',
  },
  row: {
    flexDirection: 'row' as const,
  },
  column: {
    flexDirection: 'column' as const,
  },
  spaceBetween: {
    justifyContent: 'space-between' as const,
  },
  spaceAround: {
    justifyContent: 'space-around' as const,
  },
  alignCenter: {
    alignItems: 'center' as const,
  },
  alignStart: {
    alignItems: 'flex-start' as const,
  },
  alignEnd: {
    alignItems: 'flex-end' as const,
  },
  textCenter: {
    textAlign: 'center' as const,
  },
  textLeft: {
    textAlign: 'left' as const,
  },
  textRight: {
    textAlign: 'right' as const,
  },
  absolute: {
    position: 'absolute' as const,
  },
  relative: {
    position: 'relative' as const,
  },
  borderRadius: {
    borderRadius: moderateScale(8),
  },
  roundedFull: {
    borderRadius: moderateScale(999),
  },
};