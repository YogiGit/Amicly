# Development Workflow (amicaenv)

## Local Development Setup

### Prerequisites (amicaenv)
```bash
# Global Prerequisites (One-Time Setup)
node --version  # 18.19.0 (via nvm)
yarn --version  # 1.22.x or higher (only global dependency)

# Verify amicaenv activation
echo $PROJECT_ENV  # Should show: amicaenv

# Local development tools (via amicaenv)
yarn expo --version           # Expo CLI (local to project)
yarn eas --version            # EAS CLI (local to project)
yarn cdk --version            # AWS CDK (local to project)
yarn sls --version            # Serverless Framework (local to project)

# External tools (still global)
aws --version                 # AWS CLI v2 (global)
psql --version               # PostgreSQL client (global)
```

### amicaenv Setup
```bash
# Clone repository and activate amicaenv
git clone <amicly-repo>
cd amicly

# Activate amicaenv (project-isolated environment)
yarn env:activate             # Activates amicaenv and installs all dependencies

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with development values

# Initialize local database
yarn db:setup                 # Create local PostgreSQL database
yarn db:migrate               # Run database migrations
yarn db:seed                  # Seed with test data (teen-safe)

# Setup AWS development environment
aws configure                 # Configure AWS credentials (global AWS CLI)
yarn infra:bootstrap          # Bootstrap CDK in AWS account
yarn infra:deploy-dev         # Deploy development infrastructure
```

### amicaenv Development Commands
```bash
# Start all services in development mode
yarn dev                      # Start mobile app, parent dashboard, and local Lambda functions

# Start individual services
yarn dev:mobile               # React Native app with Expo
yarn dev:dashboard            # Parent dashboard (Next.js)
yarn dev:services             # Local Lambda functions with SAM
yarn dev:db                   # Start local PostgreSQL

# Testing commands
yarn test                     # Run all tests across packages
yarn test:mobile              # Mobile app tests with React Native Testing Library
yarn test:services            # Lambda function tests with Jest
yarn test:e2e                 # End-to-end tests with Detox
yarn test:safety              # Safety compliance tests

# Code quality and safety
yarn lint                     # ESLint across all packages
yarn type-check               # TypeScript compilation check
yarn safety-check             # Teen safety content validation
yarn format                   # Prettier code formatting
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
