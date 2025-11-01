# Starter Template or Existing Project

Based on the PRD analysis, I've identified that **Amicly extends the existing ReferenceApp-Expo foundation**:

**Existing Foundation:** ReferenceApp-Expo React Native application with:
- Proven six-theme design system (#FF4D67 primary color, Urbanist typography, Z-component library)
- Redux-managed theme switching with 3 light + 3 dark theme variations
- Responsive scaling functions with moderateScale
- Monorepo structure already established
- Storybook integration for component development

**Architectural Constraints from ReferenceApp-Expo:**
- React Native 0.81.4+ with Expo SDK ~54.0.10 must be maintained
- Z-component library (ZButton, ZInput, ZText) with proven type system should be extended, not replaced
- Six-theme architecture (Classic Light, Ocean Breeze, Golden Hour, Classic Dark, Midnight Blue, Royal Purple)
- Existing state management patterns should be leveraged
- 85% code reuse target for future iOS deployment
- Performance optimization patterns already proven
- Theme selector interface with live preview functionality

**Modification Scope:** We can add new microservices for AI conversation, safety monitoring, and parent dashboard while maintaining the core mobile app foundation.

## Change Log
| Date | Version | Description | Author |
|------|---------|-------------|---------|
| 2025-09-28 | v1.0 | Initial fullstack architecture creation | Winston (Architect) |
