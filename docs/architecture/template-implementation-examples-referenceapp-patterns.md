# Template Implementation Examples (ReferenceApp Patterns)

## ZText Component Template
```typescript
import React from 'react';
import {Text} from 'react-native';
import {useSelector} from 'react-redux';
import Typography from '../../themes/typography';

const ZText = ({type, style, align, color, children, ...props}) => {
  const colors = useSelector(state => state.theme.theme);

  const fontWeights = () => {
    switch (type.charAt(0).toUpperCase()) {
      case 'R': return Typography.fontWeights.Regular;
      case 'M': return Typography.fontWeights.Medium;
      case 'S': return Typography.fontWeights.SemiBold;
      case 'B': return Typography.fontWeights.Bold;
      default: return Typography.fontWeights.Regular;
    }
  };

  const fontSize = () => {
    const size = type.slice(1);
    return Typography.fontSizes[`f${size}`] || Typography.fontSizes.f14;
  };

  return (
    <Text
      style={[
        type && {...fontWeights(), ...fontSize()},
        {color: color ? color : colors.textColor},
        align && {textAlign: align},
        style,
      ]}
      {...props}>
      {children}
    </Text>
  );
};

export default React.memo(ZText);
```

## Theme State Management Template
```typescript
// Theme reducer with support for all 6 themes
const getThemeByType = (themeType) => {
  switch (themeType) {
    case 'light': return colors.light;
    case 'lightBlue': return colors.lightBlue;
    case 'lightWarm': return colors.lightWarm;
    case 'dark': return colors.dark;
    case 'darkBlue': return colors.darkBlue;
    case 'darkPurple': return colors.darkPurple;
    default: return colors.light;
  }
};

// Theme action with AsyncStorage persistence
export const setThemeColor = (themeType) => {
  return async dispatch => {
    try {
      await AsyncStorage.setItem(THEME, themeType);
      dispatch({ type: CHANGE_THEME, payload: themeType });
    } catch (error) {
      console.log('Error saving theme:', error);
    }
  };
};
```

## Component with Theme Support Template
```typescript
// Example: Creating a new themed component
import {useSelector} from 'react-redux';
import {colors} from '../themes/colors';

const ConversationBubble = ({ message, isFromAI }) => {
  const currentTheme = useSelector(state => state.theme.theme);
  const themeType = useSelector(state => state.theme.themeType);

  // Check if it's a dark theme
  const isDarkTheme = ['dark', 'darkBlue', 'darkPurple'].includes(themeType);

  return (
    <View style={[
      styles.container,
      {backgroundColor: isFromAI
        ? currentTheme.btnColor3
        : currentTheme.primary
      }
    ]}>
      <ZText
        type="R16"
        color={isFromAI ? currentTheme.textColor : currentTheme.textRevertColor}
      >
        {message}
      </ZText>
    </View>
  );
};
```

## Theme Selector Implementation Template
```typescript
// Theme options configuration
const themeOptions = [
  {
    id: 'light',
    name: 'Classic Light',
    description: 'Clean and bright',
    theme: colors.light,
    category: 'light'
  },
  {
    id: 'lightBlue',
    name: 'Ocean Breeze',
    description: 'Cool blue tones',
    theme: colors.lightBlue,
    category: 'light'
  },
  {
    id: 'lightWarm',
    name: 'Golden Hour',
    description: 'Warm and cozy',
    theme: colors.lightWarm,
    category: 'light'
  },
  {
    id: 'dark',
    name: 'Classic Dark',
    description: 'Sleek and modern',
    theme: colors.dark,
    category: 'dark'
  },
  {
    id: 'darkBlue',
    name: 'Midnight Blue',
    description: 'Deep ocean vibes',
    theme: colors.darkBlue,
    category: 'dark'
  },
  {
    id: 'darkPurple',
    name: 'Royal Purple',
    description: 'Luxurious darkness',
    theme: colors.darkPurple,
    category: 'dark'
  }
];

// Theme selection handler
const handleThemeSelect = (themeKey) => {
  dispatch(setThemeColor(themeKey));
};
```
