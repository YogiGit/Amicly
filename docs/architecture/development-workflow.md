# Development Workflow

## Local Development Setup

### Prerequisites
```bash
# Node.js and package managers
node --version  # 18.x or higher
npm --version   # 9.x or higher
yarn --version  # 1.22.x or higher

# React Native development
npx react-native doctor  # Validate RN environment
expo --version            # Expo CLI for mobile development

# AWS development tools
aws --version             # AWS CLI v2
sam --version             # AWS SAM for Lambda development
cdk --version             # AWS CDK for infrastructure

# Database tools
psql --version            # PostgreSQL client for local DB
```

### Initial Setup
```bash
# Clone repository and setup amicaenv
git clone <amicly-repo>
cd amicly

# Activate amicaenv (project-isolated environment)
yarn env:activate          # Activates amicaenv and installs all dependencies
# Alternative: source ./scripts/amicaenv-activate.sh

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with development values

# Initialize local database
yarn db:setup              # Create local PostgreSQL database
yarn db:migrate            # Run database migrations
yarn db:seed               # Seed with test data (teen-safe)

# Setup AWS development environment
aws configure              # Configure AWS credentials (global AWS CLI still needed)
yarn infra:bootstrap       # Bootstrap CDK in AWS account
yarn infra:deploy-dev      # Deploy development infrastructure
```

### Development Commands
```bash
# Start all services in development mode (amicaenv)
yarn dev                   # Start mobile app, parent dashboard, and local Lambda functions

# Start individual services
yarn dev:mobile            # React Native app with Expo
yarn dev:dashboard         # Parent dashboard (Next.js)
yarn dev:services          # Local Lambda functions with SAM
yarn dev:db                # Start local PostgreSQL

# Testing commands
yarn test                  # Run all tests across packages
yarn test:mobile           # Mobile app tests with React Native Testing Library
yarn test:services         # Lambda function tests with Jest
yarn test:e2e              # End-to-end tests with Detox
yarn test:safety           # Safety compliance tests

# Code quality and safety
yarn lint                  # ESLint across all packages
yarn type-check            # TypeScript compilation check
yarn safety-check          # Teen safety content validation
yarn format                # Prettier code formatting
```

## Environment Configuration

### Required Environment Variables
```bash
# Frontend (.env.local for mobile app)
EXPO_PUBLIC_API_BASE_URL=https://dev-api.amicly.com/v1
EXPO_PUBLIC_ENVIRONMENT=development
EXPO_PUBLIC_VOICE_UPLOAD_URL=https://dev-voice.amicly.com
EXPO_PUBLIC_CRISIS_SUPPORT_URL=https://dev-crisis.amicly.com
EXPO_PUBLIC_SENTRY_DSN=<development-sentry-dsn>

# Backend (.env for Lambda services)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=amicly_dev
DB_USER=amicly_dev_user
DB_PASSWORD=<development-password>
DB_SSL_MODE=prefer

# AWS Service Configuration
AWS_REGION=us-east-1
BEDROCK_MODEL_ID=anthropic.claude-v2
COMPREHEND_ENDPOINT=https://comprehend.us-east-1.amazonaws.com
S3_VOICE_BUCKET=amicly-dev-voice-files
KMS_KEY_ID=<development-kms-key>

# Safety and Compliance
CRISIS_TEXT_LINE_API_KEY=<development-api-key>
NCMEC_REPORTING_ENDPOINT=<development-endpoint>
SAFETY_SCORE_THRESHOLD=95
CRISIS_CONFIDENCE_THRESHOLD=80

# Shared Environment Variables
JWT_SECRET=<development-jwt-secret>
ENCRYPTION_KEY=<development-encryption-key>
LOG_LEVEL=debug
ENABLE_AUDIT_LOGGING=true
COPPA_COMPLIANCE_MODE=development
```
