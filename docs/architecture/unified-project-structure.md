# Unified Project Structure

```plaintext
amicly/
├── .github/                    # CI/CD workflows
│   └── workflows/
│       ├── ci.yaml            # Automated testing and safety validation
│       ├── deploy-staging.yaml # Staging deployment with safety checks
│       └── deploy-prod.yaml   # Production deployment with compliance validation
├── apps/                       # Application packages
│   ├── mobile/                 # React Native app (extended ReferenceApp-Expo)
│   │   ├── src/
│   │   │   ├── components/     # Conversation, privacy, safety components
│   │   │   ├── screens/        # Chat, privacy, crisis screens
│   │   │   ├── services/       # API clients with encryption
│   │   │   ├── stores/         # Redux with conversation & privacy state
│   │   │   ├── navigation/     # Age-graduated route protection
│   │   │   └── utils/          # Teen-specific utilities
│   │   ├── assets/             # ReferenceApp-Expo design system assets
│   │   ├── tests/              # Mobile app tests
│   │   ├── app.config.js       # Expo configuration
│   │   └── package.json
│   ├── parent-dashboard/       # Next.js web app for parents
│   │   ├── src/
│   │   │   ├── pages/          # Parent dashboard pages
│   │   │   ├── components/     # Family progress, safety components
│   │   │   ├── services/       # Parent API clients
│   │   │   ├── hooks/          # Family data hooks
│   │   │   └── styles/         # Parent dashboard styling
│   │   ├── public/             # Static assets
│   │   ├── tests/              # Web app tests
│   │   ├── next.config.js      # Next.js configuration
│   │   └── package.json
├── services/                   # AWS Lambda microservices
│   ├── ai-conversation/        # AI conversation processing
│   │   ├── src/
│   │   │   ├── handlers/       # Message, voice, context handlers
│   │   │   ├── services/       # Bedrock, safety, encryption services
│   │   │   └── models/         # Conversation domain models
│   │   ├── tests/              # Lambda function tests
│   │   ├── serverless.yml      # Serverless Framework config
│   │   └── package.json
│   ├── safety-pipeline/        # Content moderation & crisis detection
│   │   ├── src/
│   │   │   ├── handlers/       # Analysis, detection, escalation
│   │   │   ├── services/       # Comprehend, SageMaker, notifications
│   │   │   └── models/         # Safety incident models
│   │   ├── tests/              # Safety pipeline tests
│   │   ├── serverless.yml      # Safety service config
│   │   └── package.json
│   ├── family-service/         # Family management & privacy
│   │   ├── src/
│   │   │   ├── handlers/       # Family, privacy, dashboard handlers
│   │   │   ├── services/       # Cognito, privacy engine, analytics
│   │   │   └── models/         # Family domain models
│   │   ├── tests/              # Family service tests
│   │   ├── serverless.yml      # Family service config
│   │   └── package.json
│   └── shared/                 # Shared service utilities
│       ├── src/
│       │   ├── middleware/     # Auth, error handling, audit logging
│       │   ├── types/          # Shared TypeScript types
│       │   └── utils/          # Encryption, validation, metrics
│       └── package.json
├── packages/                   # Shared packages
│   ├── shared-types/           # TypeScript interfaces
│   │   ├── src/
│   │   │   ├── api/            # API request/response types
│   │   │   ├── database/       # Database entity types
│   │   │   ├── privacy/        # Privacy control types
│   │   │   └── safety/         # Safety incident types
│   │   └── package.json
│   ├── tikto-z-extended/       # Extended ReferenceApp-Expo components
│   │   ├── src/
│   │   │   ├── conversation/   # ConversationBubble, VoiceButton
│   │   │   ├── privacy/        # PrivacyToggle, AgeGraduation
│   │   │   └── safety/         # CrisisUI, SafetyReporting
│   │   └── package.json
│   ├── family-utils/           # Shared family logic
│   │   ├── src/
│   │   │   ├── privacy/        # Age-graduated privacy logic
│   │   │   ├── analytics/      # Family progress calculations
│   │   │   └── communication/  # Parent-teen communication helpers
│   │   └── package.json
│   └── config/                 # Shared configuration
│       ├── eslint/             # ESLint rules for teen safety
│       ├── typescript/         # Shared TypeScript config
│       ├── jest/               # Testing configuration
│       └── prettier/           # Code formatting rules
├── infrastructure/             # AWS CDK infrastructure
│   ├── lib/
│   │   ├── api-gateway-stack.ts      # API Gateway with teen auth
│   │   ├── lambda-stack.ts           # Lambda functions deployment
│   │   ├── database-stack.ts         # Aurora with encryption
│   │   ├── cognito-stack.ts          # Family authentication
│   │   ├── s3-stack.ts               # Voice file storage
│   │   ├── monitoring-stack.ts       # CloudWatch + safety alerts
│   │   └── compliance-stack.ts       # COPPA compliance resources
│   ├── bin/
│   │   └── infrastructure.ts         # CDK app entry point
│   ├── tests/                        # Infrastructure tests
│   ├── cdk.json                      # CDK configuration
│   └── package.json
├── scripts/                    # Build and deployment scripts
│   ├── build-all.sh           # Build all packages and services
│   ├── deploy-services.sh     # Deploy Lambda services
│   ├── setup-dev.sh           # Development environment setup
│   ├── safety-test.sh         # Run safety compliance tests
│   └── e2e-test.sh            # End-to-end testing script
├── docs/                       # Project documentation
│   ├── prd.md                 # Product requirements
│   ├── front-end-spec.md      # UI/UX specification
│   ├── architecture.md        # This document
│   ├── safety-compliance.md   # Safety and COPPA compliance
│   ├── api-documentation.md   # API reference
│   └── deployment-guide.md    # Deployment instructions
├── .env.example                # Environment variables template
├── .gitignore                 # Git ignore patterns
├── package.json               # Root package.json with workspaces
├── lerna.json                 # Lerna monorepo configuration
├── turbo.json                 # Turborepo build optimization
└── README.md                  # Project overview and setup
```
