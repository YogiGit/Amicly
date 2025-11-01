# Amicly - Safety-First Teen AI Companion

A comprehensive AI companion platform designed specifically for teenagers, built with safety, privacy, and family-centered design as core principles.

## 🏗️ Architecture Overview

Amicly extends the proven ReferenceApp-Expo foundation with AI conversation capabilities while maintaining sophisticated six-theme architecture support. The platform follows a monorepo structure with project-isolated development environments (amicaenv).

### Key Features
- **Six-Theme Design System**: Classic Light, Ocean Breeze, Golden Hour, Classic Dark, Midnight Blue, Royal Purple
- **ReferenceApp-Expo Foundation**: Battle-tested mobile architecture with Z-component library
- **Safety-First Design**: Age-graduated privacy controls and real-time safety monitoring
- **Family-Centered**: Parent dashboard and transparent conversation oversight
- **amicaenv Isolation**: Project-specific development tools for conflict-free development

## 🚀 Quick Start (amicaenv)

### Prerequisites (Global - One-Time Setup)

```bash
# Install Node.js via Node Version Manager
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18.19.0
nvm use 18.19.0

# Install Yarn (only global dependency required)
npm install -g yarn

# Optional: Install direnv for automatic environment activation
# macOS: brew install direnv
# Ubuntu: apt install direnv
```

### amicaenv Project Setup

```bash
# Clone and enter project
git clone <amicly-repo>
cd amicly

# Activate amicaenv (project-isolated environment)
yarn env:activate

# Alternative: Use direnv for automatic activation
direnv allow

# Verify environment
yarn env:status
```

## 🛠️ Development Commands (amicaenv)

### Environment Management
```bash
yarn env:status              # Check environment status
yarn env:activate            # Activate amicaenv
yarn fix-deps                # Fix dependency warnings and update versions
```

### Development Services
```bash
yarn dev                     # Start all development services (mobile + dashboard + services)
yarn dev:mobile              # Start mobile app (Expo)
yarn dev:dashboard           # Start parent dashboard (Next.js)
yarn dev:services            # Start serverless functions locally
yarn dev:db                  # Start local PostgreSQL database
```

### Mobile Development
```bash
yarn expo start              # Start Expo development server
yarn expo start --clear      # Start with cache cleared
yarn expo start --ios        # Start for iOS
yarn expo start --android    # Start for Android
```

### Component Development
```bash
yarn storybook               # Start Storybook for component development
```

### Backend Development
```bash
yarn sls offline             # Start serverless functions locally
yarn cdk deploy --profile dev # Deploy infrastructure to dev
```

### Testing & Quality
```bash
yarn test                    # Run all tests
yarn test:mobile             # Mobile app tests
yarn test:dashboard          # Parent dashboard tests
yarn test:services           # Backend service tests
yarn test:packages           # Shared package tests
yarn test:e2e                # End-to-end tests
yarn test:safety             # Safety compliance tests

yarn lint                    # ESLint across all packages
yarn type-check              # TypeScript compilation check
yarn safety-check            # Teen safety content validation
yarn format                  # Prettier code formatting
```

### Build Commands
```bash
yarn build                   # Build all packages and services
yarn build:packages          # Build shared packages
yarn build:apps              # Build mobile and dashboard apps
yarn build:mobile            # Build mobile app
yarn build:dashboard         # Build parent dashboard
yarn build:services          # Build backend services
```

### Database & Infrastructure
```bash
yarn db:setup               # Create local PostgreSQL database
yarn db:migrate              # Run database migrations
yarn db:seed                 # Seed with test data

yarn infra:bootstrap         # Bootstrap CDK in AWS account
yarn infra:deploy-dev        # Deploy development infrastructure
```

## 📁 Project Structure

```
amicly/
├── apps/                           # Applications
│   ├── mobile/                     # React Native app (ReferenceApp-Expo extended)
│   │   ├── src/
│   │   │   ├── components/common/  # Z-Components (ZText, ZButton, ZHeader)
│   │   │   ├── themes/             # Six-theme color system
│   │   │   ├── redux/              # State management with theme persistence
│   │   │   └── ...
│   │   ├── App.tsx                 # Main app with theme integration
│   │   ├── app.json                # Expo configuration
│   │   └── package.json
│   └── parent-dashboard/           # Next.js web app for parents
├── services/                       # AWS Lambda microservices
│   ├── ai-conversation/            # AI conversation processing
│   ├── safety-pipeline/            # Safety monitoring and alerts
│   └── family-service/             # Family management and privacy
├── packages/                       # Shared packages
│   ├── shared-types/               # TypeScript types
│   ├── referenceapp-z-extended/    # Extended Z-component library
│   ├── family-utils/               # Family-specific utilities
│   └── config/                     # Shared configuration
├── infrastructure/                 # AWS CDK infrastructure code
├── scripts/                        # Build and deployment scripts
│   ├── amicaenv-activate.sh        # Environment activation
│   └── build-all.sh                # Build all packages
├── .nvmrc                          # Node version specification
├── .envrc                          # direnv configuration
├── .env.example                    # Environment variables template
└── package.json                    # Root workspace configuration
```

## 🎨 Six-Theme System

Amicly inherits and extends the ReferenceApp-Expo six-theme architecture:

### Light Themes
- **Classic Light**: Clean, bright interface for day use
- **Ocean Breeze**: Calming blue tones for focus sessions
- **Golden Hour**: Warm, energizing colors for creative work

### Dark Themes
- **Classic Dark**: Sleek and modern for night use
- **Midnight Blue**: Deep ocean vibes for sophisticated feel
- **Royal Purple**: Luxurious darkness for creative, artistic users

### Theme Integration
```typescript
// Access current theme in components
const theme = useSelector((state: RootState) => state.theme.theme);

// Use ZText with theme integration
<ZText type="B18" color={theme.primaryColor}>
  Themed Text
</ZText>

// Theme-aware styling
const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.backgroundColor,
    borderColor: theme.borderColor,
  },
});
```

## 🔧 amicaenv Benefits

- **Version Isolation**: Project-specific tool versions prevent conflicts
- **Reproducible Environment**: Exact same tools across all developer machines
- **Fast Setup**: Single command activation with all dependencies
- **CI/CD Compatibility**: Same environment for local development and build pipelines
- **Minimal Global Dependencies**: Only Node.js and Yarn required globally
- **Team Consistency**: Standardized toolchain across entire development team

## 🧪 Testing Strategy

### Mobile App Testing
```bash
# Component tests with React Native Testing Library
yarn test:mobile

# E2E tests with Detox
yarn test:e2e

# Theme testing across all six themes
yarn test:themes
```

### Backend Testing
```bash
# Lambda function tests with Jest + Supertest
yarn test:services

# Safety compliance testing
yarn test:safety

# Integration tests
yarn test:integration
```

## 🚨 Safety & Compliance

Amicly is built with teen safety as the foundational principle:

- **Real-time Content Monitoring**: AWS Comprehend + custom safety models
- **Crisis Detection**: Immediate escalation protocols
- **Age-Graduated Privacy**: COPPA-compliant privacy controls
- **Family Transparency**: Parent dashboard with conversation insights
- **Audit Logging**: Complete audit trail for compliance

## 🏥 Troubleshooting (amicaenv)

### Environment Issues
```bash
# Check environment status
yarn env:status

# Reactivate environment
yarn env:activate

# Fix dependency warnings and version conflicts
yarn fix-deps

# Manual cleanup (if needed)
rm -rf node_modules
yarn install
```

### Dependency Warnings

If you see warnings about `glob`, `rimraf`, or other deprecated packages:

```bash
# Run the automated fix script
yarn fix-deps

# Or suppress warnings during install
yarn install --silent
```

**Note**: Most warnings come from sub-dependencies and will be resolved by package maintainers. The `yarn resolutions` in `package.json` handles critical fixes.

### Common Issues

1. **"Command not found" errors**: Ensure amicaenv is activated (`yarn env:activate`)
2. **Dependency warnings**: Run `yarn fix-deps` to update to latest versions
3. **Version conflicts**: Check `.nvmrc` matches your Node version
4. **Permission errors**: Ensure scripts are executable (`chmod +x scripts/*.sh`)
5. **Build failures**: Run `yarn type-check` to identify TypeScript issues

### Development Tips

1. **Use yarn scripts**: Always prefer `yarn expo` over global `expo`
2. **Theme testing**: Test components across all six themes
3. **Safety validation**: All user content must pass safety checks
4. **Type safety**: Import shared types from `@shared/*`

## 📝 Contributing

1. Ensure amicaenv is activated before development
2. Follow ReferenceApp-Expo Z-component patterns
3. Test across all six themes
4. Add comprehensive tests with safety validation
5. Update documentation for new features

## 📄 License

Proprietary - All rights reserved

---

**Built with ❤️ for teen safety and family connection**