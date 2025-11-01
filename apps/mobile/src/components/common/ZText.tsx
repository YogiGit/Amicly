import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { getTypographyStyle } from '../../themes/typography';
import { RootState } from '../../redux/store';

interface ZTextProps extends TextProps {
  type?: string; // e.g., "B18", "R16", "S14"
  color?: string;
}

export const ZText: React.FC<ZTextProps> = ({
  type = 'R16',
  color,
  style,
  children,
  ...props
}) => {
  const theme = useSelector((state: RootState) => state.theme.theme);

  const typographyStyle = getTypographyStyle(type);
  const textColor = color || theme.textColor;

  const combinedStyle = [
    typographyStyle,
    { color: textColor },
    style,
  ];

  return (
    <Text style={combinedStyle} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  // No default styles needed - everything comes from theme and typography
});