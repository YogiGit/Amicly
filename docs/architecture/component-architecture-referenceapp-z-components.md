# Component Architecture (ReferenceApp Z-Components)

## Custom Component System

The project uses ReferenceApp's sophisticated custom component library with consistent theming:

### ZText Component Pattern
```typescript
// Intelligent text component with automatic theme integration
<ZText
  type="B18"           // Bold 18px
  color={colors.primary}
  align="center"
>
  {content}
</ZText>

// Type format: [Weight][Size]
// Weights: R(Regular), M(Medium), S(SemiBold), B(Bold)
// Sizes: 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 40, 46
```

### ZButton Component Pattern
```typescript
// Themed button with consistent styling
<ZButton
  title="Continue"
  textType="B16"
  onPress={handlePress}
  bgColor={colors.primary}
  frontIcon={<Icon />}
/>
```

## Theme Selector System

The project includes ReferenceApp's sophisticated theme selector that allows users to choose from 6 curated themes with live preview functionality.

### Theme Selector Features
- **Visual theme cards** with live color previews
- **Organized sections** (Light Themes / Dark Themes)
- **Selected theme indicators** with badges
- **Automatic persistence** to AsyncStorage
- **Immediate application** across entire app

### Theme Names and Descriptions

| Theme ID | Display Name | Description | Best For |
|----------|-------------|-------------|----------|
| `light` | Classic Light | Clean and bright | General use, readability |
| `lightBlue` | Ocean Breeze | Cool blue tones | Calming, professional |
| `lightWarm` | Golden Hour | Warm and cozy | Comfortable reading |
| `dark` | Classic Dark | Sleek and modern | Night use, battery saving |
| `darkBlue` | Midnight Blue | Deep ocean vibes | Sophisticated, elegant |
| `darkPurple` | Royal Purple | Luxurious darkness | Creative, artistic |
