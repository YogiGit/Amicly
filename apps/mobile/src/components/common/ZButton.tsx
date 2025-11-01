import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, StyleSheet, ViewStyle } from 'react-native';
import { useSelector } from 'react-redux';
import { ZText } from './ZText';
import { moderateScale } from '../../themes/commonStyle';
import { RootState } from '../../redux/store';

interface ZButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  textType?: string;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  containerStyle?: ViewStyle;
}

export const ZButton: React.FC<ZButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  textType,
  backgroundColor,
  textColor,
  borderColor,
  style,
  containerStyle,
  ...props
}) => {
  const theme = useSelector((state: RootState) => state.theme.theme);

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: moderateScale(8),
      alignItems: 'center',
      justifyContent: 'center',
    };

    // Size styles
    switch (size) {
      case 'small':
        baseStyle.paddingVertical = moderateScale(8);
        baseStyle.paddingHorizontal = moderateScale(16);
        break;
      case 'large':
        baseStyle.paddingVertical = moderateScale(16);
        baseStyle.paddingHorizontal = moderateScale(32);
        break;
      default: // medium
        baseStyle.paddingVertical = moderateScale(12);
        baseStyle.paddingHorizontal = moderateScale(24);
    }

    // Variant styles
    switch (variant) {
      case 'secondary':
        baseStyle.backgroundColor = backgroundColor || theme.secondaryColor;
        baseStyle.borderWidth = 1;
        baseStyle.borderColor = borderColor || theme.borderColor;
        break;
      case 'outline':
        baseStyle.backgroundColor = 'transparent';
        baseStyle.borderWidth = 2;
        baseStyle.borderColor = borderColor || theme.primaryColor;
        break;
      default: // primary
        baseStyle.backgroundColor = backgroundColor || theme.primaryColor;
    }

    return baseStyle;
  };

  const getTextColor = (): string => {
    if (textColor) return textColor;

    switch (variant) {
      case 'secondary':
        return theme.textColor;
      case 'outline':
        return theme.primaryColor;
      default: // primary
        return '#FFFFFF';
    }
  };

  const getTextType = (): string => {
    if (textType) return textType;

    switch (size) {
      case 'small':
        return 'S14';
      case 'large':
        return 'S18';
      default:
        return 'S16';
    }
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      {...props}
    >
      <ZText
        type={getTextType()}
        color={getTextColor()}
      >
        {title}
      </ZText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // No default styles needed - everything comes from theme
});