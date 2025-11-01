# Components

## Mobile App Shell (React Native)

**Responsibility:** Core mobile application extending ReferenceApp-Expo foundation, handling conversation UI, voice recording, and teen-facing privacy controls

**Key Interfaces:**
- Conversation API client for real-time messaging
- Voice recording and playback interface
- Privacy control management UI
- Crisis support emergency interface

**Dependencies:** API Gateway, AWS Cognito for auth, Redux store management, ReferenceApp-Expo Z-component library

**Technology Stack:** React Native 0.72+, Expo SDK, TypeScript, Redux Toolkit, existing ReferenceApp-Expo patterns with conversation-specific extensions

## AI Conversation Service (Lambda)

**Responsibility:** Processes teen messages through safety filters, generates contextually appropriate AI responses using teen-safe prompting, and maintains conversation memory

**Key Interfaces:**
- REST API endpoints for message processing
- AWS Bedrock integration for AI model access
- Safety pipeline integration for content moderation
- Conversation encryption/decryption service

**Dependencies:** AWS Bedrock (AI models), Safety Pipeline Service, Aurora PostgreSQL (conversation storage), ElastiCache (response caching)

**Technology Stack:** Node.js Lambda functions, TypeScript, AWS Bedrock SDK, custom safety prompting framework, conversation context management

## Safety Pipeline Service (Lambda)

**Responsibility:** Real-time content analysis, crisis detection using teen-specific patterns, escalation management, and safety incident tracking with human review integration

**Key Interfaces:**
- Content analysis API for incoming messages
- Crisis detection ML model integration
- Parent notification system interface
- Professional resource connection API

**Dependencies:** AWS Comprehend, custom SageMaker models, SNS for notifications, Aurora PostgreSQL for incident tracking

**Technology Stack:** Python Lambda functions for ML processing, AWS Comprehend API, custom crisis detection models, incident management workflows

## Family Service (Lambda)

**Responsibility:** Manages family account linking, age-graduated privacy enforcement, parent dashboard data aggregation, and COPPA-compliant consent flows

**Key Interfaces:**
- Family registration and linking API
- Privacy setting enforcement engine
- Parent dashboard data aggregation
- Age graduation automation service

**Dependencies:** AWS Cognito for family auth, Aurora PostgreSQL for family data, Privacy Control Engine, Teen Progress Analytics

**Technology Stack:** Node.js Lambda functions, TypeScript, Cognito SDK for complex family auth patterns, privacy rule engine

## Voice Processing Service (Lambda)

**Responsibility:** Speech-to-text transcription, text-to-speech synthesis with personality, voice file storage management, and <500ms processing performance

**Key Interfaces:**
- Voice upload and transcription API
- Speech synthesis with AI personality
- Voice file secure storage management
- Real-time audio streaming support

**Dependencies:** AWS Transcribe, AWS Polly, S3 for voice file storage, CloudFront for voice file delivery

**Technology Stack:** Node.js Lambda functions, AWS Transcribe/Polly SDKs, streaming audio processing, voice personality configuration

## Parent Dashboard (Next.js)

**Responsibility:** Web-based parent interface providing age-appropriate oversight, safety notifications, family progress insights, and educational resources

**Key Interfaces:**
- Family dashboard web application
- Real-time safety notification system
- Teen progress visualization components
- Educational resource content management

**Dependencies:** Family Service APIs, Teen Progress APIs, Safety Notification Service, CDN for static assets

**Technology Stack:** Next.js 13+, TypeScript, server-side rendering, responsive design for mobile parents, real-time WebSocket updates

## Privacy Control Engine

**Responsibility:** Enforces age-graduated privacy rules, manages encryption key rotation, handles teen consent workflows, and audits family data access

**Key Interfaces:**
- Privacy rule evaluation API
- Encryption key management service
- Consent workflow orchestration
- Family data access audit logging

**Dependencies:** AWS KMS for encryption, Aurora PostgreSQL for privacy rules, Family Service integration, Audit Logging Service

**Technology Stack:** Node.js Lambda functions, AWS KMS SDK, privacy rule DSL, encryption key lifecycle management

## Crisis Response Orchestrator

**Responsibility:** Coordinates emergency responses, manages professional resource connections, handles parent notifications during crises, and maintains crisis follow-up workflows

**Key Interfaces:**
- Crisis escalation workflow API
- Professional resource integration
- Emergency contact notification system
- Crisis resolution tracking interface

**Dependencies:** Safety Pipeline Service, Family Service, SNS for emergency notifications, external professional resource APIs

**Technology Stack:** Step Functions for workflow orchestration, Lambda for individual crisis steps, SNS/SES for multi-channel notifications
