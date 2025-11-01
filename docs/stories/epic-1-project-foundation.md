# Epic 1: Project Foundation & Development Setup

## Epic Goal
Establish the Amicly development foundation by extending the ReferenceApp-Expo React Native base with AI conversation infrastructure, ensuring developers can build, test, and deploy the safety-first teen AI companion.

## Epic Description

**Existing Foundation Context:**
- Current system: ReferenceApp-Expo React Native application
- Technology stack: React Native 0.81.4+, Expo SDK ~54.0.10, Z-component library, Redux theme management
- Design system: Six-theme architecture (3 light + 3 dark variations), #FF4D67 primary color, Urbanist typography (Regular, Medium, SemiBold, Bold), proven responsive scaling with moderateScale
- Architecture: Monorepo structure with established patterns, Storybook integration for component development

**Foundation Enhancement:**
- Extend ReferenceApp-Expo with AI conversation capabilities while preserving sophisticated six-theme system
- Add AWS serverless backend services for AI processing and safety monitoring
- Integrate new conversation-first UX patterns while maintaining all six theme variations (Classic Light, Ocean Breeze, Golden Hour, Classic Dark, Midnight Blue, Royal Purple)
- Establish development workflow for mobile + serverless backend

**Success Criteria:**
- Developers can set up complete development environment in <30 minutes
- Mobile app builds and runs with conversation interface mockups
- AWS infrastructure provisioned and accessible
- All team members can deploy to development environment

## Stories

### Story 1.1: Development Environment Setup & Documentation
**Goal:** Enable developers to quickly set up local development environment
- Set up ReferenceApp-Expo extension with new conversation packages
- Document Node.js (v18+), Yarn, Expo CLI, AWS CLI, EAS CLI requirements
- Create setup scripts for local development with six-theme support
- Add README with step-by-step setup instructions including Storybook integration

### Story 1.2: Mobile App Foundation Extension
**Goal:** Extend ReferenceApp-Expo mobile app with conversation UI foundation
- Add conversation screen using Z-component library patterns (ZText, ZButton, ZHeader)
- Integrate AI conversation state management with existing Redux patterns and theme management
- Create conversation UI components (message bubbles, input, voice controls) that work across all six themes
- Maintain ReferenceApp-Expo design system (six-theme architecture, #FF4D67 primary colors, Urbanist typography with all weights)
- Ensure conversation components support theme switching with live preview functionality

### Story 1.3: AWS Infrastructure Foundation & External Service Setup
**Goal:** Provision core AWS services and establish external service access with fallbacks
- Set up API Gateway with authentication routes and rate limiting
- Create Lambda function templates for AI conversation service
- Provision RDS Aurora database for conversation storage
- **CRITICAL:** Apply for AWS Bedrock model access (Claude) - 2-4 week timeline
- Configure AWS IAM roles and secure credential management
- Set up service quotas and monitoring for API limits
- Create mock AI service for development during Bedrock approval
- Configure AWS SES for email notifications

### Story 1.4: Development Workflow & CI/CD
**Goal:** Establish reliable development and deployment processes
- Set up GitHub Actions for mobile app builds
- Configure AWS deployment pipeline for Lambda services
- Add testing framework for both mobile and backend
- Create environment management (dev/staging/prod)

## Technical Dependencies
- **Prerequisite:** ReferenceApp-Expo foundation must be accessible and buildable with six-theme architecture
- **External (CRITICAL):** AWS account with Bedrock access for AI models (2-4 week approval)
- **External:** Apple Developer account for iOS testing (if applicable)
- **External:** Crisis Text Line API access for safety escalation
- **Sequential:** Story 1.1 must complete before 1.2-1.4 can begin effectively
- **Parallel:** AWS Bedrock application should start immediately alongside Story 1.1

## Definition of Done
- [ ] All developers can set up environment using README instructions
- [ ] Mobile app builds and displays conversation interface mockup with theme switching capability
- [ ] All six themes (Classic Light, Ocean Breeze, Golden Hour, Classic Dark, Midnight Blue, Royal Purple) render correctly
- [ ] Storybook integration works for component development and testing
- [ ] AWS backend services are provisioned and reachable
- [ ] CI/CD pipeline successfully deploys to development environment
- [ ] All existing ReferenceApp-Expo functionality remains intact including six-theme system
- [ ] Test suite runs successfully for both mobile and backend components
- [ ] Theme persistence through AsyncStorage functioning correctly

## Risk Mitigation
- **Primary Risk:** AWS Bedrock access delays (2-4 weeks) blocking AI development
- **Mitigation:**
  - Apply for Bedrock access IMMEDIATELY on project start
  - Implement comprehensive mock AI service for development
  - Use OpenAI API as temporary fallback if available
- **Secondary Risk:** AWS service quotas insufficient for teen usage patterns
- **Mitigation:**
  - Request quota increases during infrastructure setup
  - Implement rate limiting and queue management
  - Monitor usage patterns and scale proactively
- **Rollback Plan:** Maintain original ReferenceApp-Expo functionality including six-theme system, can roll back AWS changes independently

## Notes for Story Manager
This epic is critical for unblocking all subsequent development. Focus on getting a minimal but complete development environment rather than perfect implementation - we can refine in later epics.