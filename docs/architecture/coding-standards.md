# Coding Standards

## Critical Fullstack Rules

- **Type Sharing:** Always define types in packages/shared-types and import from there to ensure consistency across frontend and backend

- **API Calls:** Never make direct HTTP calls - use the service layer with proper encryption and safety validation

- **Environment Variables:** Access only through config objects, never process.env directly, to ensure proper validation and type safety

- **Error Handling:** All API routes must use the standardized error handler with teen safety considerations and audit logging

- **State Updates:** Never mutate state directly - use proper Redux patterns with conversation-specific middleware for safety monitoring

- **Safety First:** All user-generated content must pass through safety validation before processing or storage

- **Privacy Compliance:** Age-graduated privacy rules must be enforced at both API and UI levels before any family data sharing

## ReferenceApp Theme Usage Rules (CRITICAL)

- **Always use theme colors:** Never use hardcoded colors except in theme definitions
- **Use custom components:** Prefer ZText, ZButton over native Text, TouchableOpacity
- **Theme access pattern:** Always get colors from Redux state: `useSelector(state => state.theme.theme)`
- **Theme type checking:** Use `themeType` for conditional logic: `themeType === 'dark' || themeType === 'darkBlue' || themeType === 'darkPurple'`

## ReferenceApp Theme Implementation Rules

- **Six-theme support:** Always ensure new components work with all 6 theme variations (light, lightBlue, lightWarm, dark, darkBlue, darkPurple)
- **Consistent naming:** Use semantic color names (backgroundColor, textColor, etc.) not specific colors
- **Theme persistence:** All theme changes must save to AsyncStorage using `setThemeColor()` action
- **Status bar adaptation:** Dark themes should use 'light-content', light themes use 'dark-content'

## ReferenceApp Component Patterns

- **Font sizing:** Use moderateScale() for all dimensions to ensure responsive design
- **Style composition:** Combine theme styles with local styles using array syntax
- **Navigation:** Use NavigationKeys constants, never hardcode screen names
- **ZText type format:** Use [Weight][Size] pattern (e.g., "B18" for Bold 18px)
- **ZText weights:** R(Regular), M(Medium), S(SemiBold), B(Bold)
- **ZText sizes:** 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 40, 46

## ReferenceApp State Management Rules

- **Redux structure:** Separate actions, reducers, and types by feature
- **Async operations:** Use Redux Thunk for API calls and side effects
- **Theme persistence:** Store theme preference in AsyncStorage using THEME constant

## ReferenceApp File Organization Rules

- **Screen containers:** Place in `/containers/` organized by feature/tab
- **Reusable components:** Place in `/components/common/`
- **Modal components:** Place in `/components/models/`
- **Theme-related screens:** Place theme selector components in `/containers/TabBar/profile/`

## Naming Conventions

| Element | Frontend | Backend | Example |
|---------|----------|---------|---------|
| Components | PascalCase | - | `ConversationBubble.tsx` |
| Hooks | camelCase with 'use' | - | `useConversationService.ts` |
| API Routes | - | kebab-case | `/api/conversation-history` |
| Database Tables | - | snake_case | `teen_users`, `safety_incidents` |
| Lambda Functions | - | camelCase | `messageHandler`, `crisisEscalation` |
| Safety Functions | - | camelCase with 'safety' | `safetyValidateContent` |
