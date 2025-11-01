# Source Tree

The source code organization follows a monorepo structure with clear separation of concerns and age-appropriate development patterns:

## Core Principles

- **Domain-Driven Structure**: Each service/app organizes code by business domain (conversation, safety, family)
- **Shared-First Development**: Common types, utilities, and components are extracted to shared packages
- **Age-Graduated Security**: Source organization reflects teen privacy and safety requirements
- **ReferenceApp-Expo Extension**: Mobile app extends existing proven patterns while adding conversation capabilities

## Source Code Organization

### Frontend Applications (`apps/`)

**Mobile App (`apps/mobile/src/`)**
```plaintext
src/
├── components/           # Reusable UI components
│   ├── conversation/     # ConversationView, MessageBubble, VoiceButton
│   ├── safety/          # CrisisAlert, SafetyReporting, ContentFilter
│   ├── privacy/         # PrivacyControls, AgeGatedContent, ParentConsent
│   └── common/          # Extended ReferenceApp-Expo base components
├── screens/             # Full-screen views
│   ├── chat/           # ConversationScreen, VoiceNoteScreen
│   ├── safety/         # CrisisScreen, ReportingScreen
│   ├── settings/       # PrivacyScreen, FamilyScreen
│   └── auth/           # AgeVerification, ParentConsent
├── services/           # API clients and external integrations
│   ├── api/           # REST API clients with encryption
│   ├── ai/            # Conversation service integration
│   ├── safety/        # Safety monitoring integration
│   └── storage/       # Secure local storage management
├── stores/            # Redux state management
│   ├── conversation/ # Chat history, AI state, voice processing
│   ├── privacy/      # Age settings, parent controls, consent
│   ├── safety/       # Crisis detection, reporting state
│   └── auth/         # User session, family linking
├── navigation/       # Age-graduated routing
├── utils/           # Teen-specific utilities
│   ├── encryption/  # End-to-end encryption helpers
│   ├── validation/ # Age-appropriate input validation
│   └── analytics/  # Privacy-compliant usage tracking
└── types/          # Mobile-specific TypeScript types
```

**Parent Dashboard (`apps/parent-dashboard/src/`)**
```plaintext
src/
├── pages/              # Next.js pages
│   ├── dashboard/     # Family overview, conversation insights
│   ├── settings/      # Privacy controls, safety configuration
│   └── reports/       # Safety incident reports, progress tracking
├── components/        # Parent-specific components
│   ├── family/       # FamilyProgress, TeenInsights, ConversationSummary
│   ├── safety/       # IncidentReports, SafetyConfig, AlertSettings
│   └── privacy/      # PrivacyDashboard, ConsentManagement
├── services/         # Parent API clients
├── hooks/           # React hooks for family data
└── styles/          # Parent dashboard styling
```

### Backend Services (`services/`)

**AI Conversation Service (`services/ai-conversation/src/`)**
```plaintext
src/
├── handlers/           # Lambda function entry points
│   ├── message.ts     # Text message processing
│   ├── voice.ts       # Voice note transcription and processing
│   ├── context.ts     # Conversation context management
│   └── safety.ts      # Real-time safety monitoring
├── services/          # Business logic services
│   ├── bedrock.ts     # AWS Bedrock AI integration
│   ├── safety.ts      # Content safety analysis
│   ├── encryption.ts  # End-to-end encryption
│   └── analytics.ts   # Conversation analytics
├── models/           # Domain models and types
│   ├── conversation.ts # Message, Session, Context models
│   ├── safety.ts      # Safety incident models
│   └── analytics.ts   # Usage and progress models
└── middleware/       # Lambda middleware
    ├── auth.ts       # JWT validation and family verification
    ├── safety.ts     # Pre-processing safety checks
    └── audit.ts      # COPPA compliance logging
```

**Safety Pipeline (`services/safety-pipeline/src/`)**
```plaintext
src/
├── handlers/          # Safety processing entry points
│   ├── analysis.ts   # Content analysis and scoring
│   ├── detection.ts  # Crisis and harm detection
│   └── escalation.ts # Parent/authority notification
├── services/         # Safety business logic
│   ├── comprehend.ts # AWS Comprehend integration
│   ├── sagemaker.ts  # Custom safety model inference
│   └── notification.ts # Multi-channel alert system
└── models/          # Safety domain models
    ├── incident.ts  # Safety incident classification
    ├── alert.ts     # Alert and escalation models
    └── analysis.ts  # Content analysis results
```

**Family Service (`services/family-service/src/`)**
```plaintext
src/
├── handlers/         # Family management entry points
│   ├── family.ts    # Family CRUD operations
│   ├── privacy.ts   # Privacy control management
│   └── dashboard.ts # Parent dashboard data
├── services/        # Family business logic
│   ├── cognito.ts   # AWS Cognito integration
│   ├── privacy.ts   # Age-graduated privacy engine
│   └── analytics.ts # Family progress analytics
└── models/         # Family domain models
    ├── family.ts   # Family, Parent, Teen models
    ├── privacy.ts  # Privacy setting models
    └── progress.ts # Development progress models
```

### Shared Packages (`packages/`)

**Shared Types (`packages/shared-types/src/`)**
```plaintext
src/
├── api/              # API contract types
│   ├── conversation/ # Conversation API types
│   ├── safety/      # Safety API types
│   └── family/      # Family management API types
├── database/        # Database entity types
│   ├── conversation.ts # Message, session entities
│   ├── family.ts      # Family, user entities
│   └── safety.ts      # Incident, alert entities
├── privacy/         # Privacy control types
│   ├── age-settings.ts # Age-graduated settings
│   ├── consent.ts     # Parent consent types
│   └── controls.ts    # Privacy control models
└── safety/         # Safety incident types
    ├── incident.ts # Incident classification
    ├── analysis.ts # Content analysis types
    └── alert.ts    # Alert and escalation types
```

## Development Conventions

### File Naming
- **Components**: PascalCase (e.g., `ConversationBubble.tsx`)
- **Services**: camelCase (e.g., `aiConversation.ts`)
- **Types**: PascalCase interfaces (e.g., `ConversationMessage`)
- **Constants**: SCREAMING_SNAKE_CASE (e.g., `MAX_MESSAGE_LENGTH`)

### Import Organization
```typescript
// 1. External libraries
import React from 'react';
import { StyleSheet } from 'react-native';

// 2. Shared packages
import { ConversationMessage } from '@amicly/shared-types';
import { PrivacyLevel } from '@amicly/family-utils';

// 3. Local imports
import { ConversationBubble } from '../components/ConversationBubble';
import { safetyConfig } from '../config/safety';
```

### TypeScript Patterns
- **Strict mode enabled**: All packages use strict TypeScript
- **Shared types**: API contracts and domain models are shared across packages
- **Age-graduated types**: Types include age-appropriate validation and privacy levels
- **Safety-first**: All user input types include safety validation requirements

### Testing Structure
```plaintext
tests/
├── unit/           # Unit tests for individual functions/components
├── integration/    # Integration tests for service interactions
├── safety/         # Safety compliance and content filtering tests
└── e2e/           # End-to-end user journey tests
```

### Configuration Management
- **Environment-specific**: Separate configs for dev/staging/production
- **Safety-first**: All configs include safety and privacy defaults
- **Family-aware**: Configurations support age-graduated features
- **Compliance-ready**: Built-in COPPA and safety compliance settings
