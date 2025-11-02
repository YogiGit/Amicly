# Development Environment Setup (amicaenv - Project-Isolated Environment)

## Prerequisites (Global - One-Time Setup)
```bash
# Install Node.js (v18 or later) via Node Version Manager
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18.19.0
nvm use 18.19.0

# Install Yarn package manager globally (only global dependency)
npm install -g yarn

# Optional: Install direnv for automatic environment activation
# macOS: brew install direnv
# Ubuntu: apt install direnv
```

## amicaenv Project Environment Setup
```bash
# Clone and enter project
git clone <amicly-repo>
cd amicly

# Activate amicaenv (project-isolated environment)
./scripts/amicaenv-activate.sh

# Or use direnv (automatic activation when entering directory)
echo "use node 18.19.0" > .envrc
echo 'export PATH="./node_modules/.bin:$PATH"' >> .envrc
echo 'export PROJECT_ENV="amicaenv"' >> .envrc
direnv allow

# Install all dependencies (including dev tools locally)
yarn install
```

## amicaenv Dependencies (Local to Project)
```json
// package.json devDependencies
{
  "devDependencies": {
    "@expo/cli": "^0.17.0",
    "eas-cli": "^5.8.0",
    "@aws-cdk/cli": "^2.x",
    "serverless": "^3.x",
    "@storybook/cli": "^9.1.4",
    "aws-cli-js": "^2.x",
    "typescript": "~5.9.2",
    "jest": "^29.x"
  },
  "scripts": {
    "env:activate": "./scripts/amicaenv-activate.sh",
    "env:status": "echo $PROJECT_ENV && node --version && yarn --version",
    "expo": "expo",
    "eas": "eas",
    "cdk": "cdk",
    "sls": "serverless",
    "storybook": "storybook"
  }
}
```

## amicaenv Benefits
- **Version Isolation**: Project-specific tool versions prevent conflicts
- **Reproducible Environment**: Exact same tools across all developer machines
- **Fast Setup**: Single command activation with all dependencies
- **CI/CD Compatibility**: Same environment for local development and build pipelines
- **Minimal Global Dependencies**: Only Node.js and Yarn required globally
- **Team Consistency**: Standardized toolchain across entire development team

## amicaenv Development Commands
```bash
# Verify environment is active
yarn env:status  # Should show: amicaenv, Node 18.x, Yarn version

# Mobile Development
yarn expo start                    # Start Expo development server
yarn expo start --clear           # Start with cache cleared
yarn expo start --ios             # Start for iOS
yarn expo start --android         # Start for Android

# Component Development
yarn storybook dev                 # Start Storybook for component development
yarn storybook build              # Build Storybook for production

# Backend Development
yarn sls offline                   # Start serverless functions locally
yarn cdk deploy --profile dev      # Deploy infrastructure to dev environment

# AWS Tools (local versions)
yarn eas build --platform ios     # Build iOS app
yarn eas submit --platform ios    # Submit to App Store

# Database
yarn db:start                      # Start local PostgreSQL
yarn db:migrate                    # Run database migrations
yarn db:seed                       # Seed with test data
```

## Project Structure for Implementation (ReferenceApp Pattern)

```
amicly/
├── apps/
│   ├── mobile/                # React Native app (extended ReferenceApp)
│   │   ├── src/
│   │   │   ├── assets/
│   │   │   │   ├── fonts/
│   │   │   │   │   ├── Urbanist-Regular.ttf
│   │   │   │   │   ├── Urbanist-Medium.ttf
│   │   │   │   │   ├── Urbanist-SemiBold.ttf
│   │   │   │   │   └── Urbanist-Bold.ttf
│   │   │   │   ├── images/
│   │   │   │   └── svgs/
│   │   │   ├── components/
│   │   │   │   ├── common/
│   │   │   │   │   ├── ZText.tsx
│   │   │   │   │   ├── ZButton.tsx
│   │   │   │   │   ├── ZHeader.tsx
│   │   │   │   │   └── ZSafeAreaView.tsx
│   │   │   │   └── models/          # Modal components
│   │   │   ├── containers/
│   │   │   │   ├── auth/           # Authentication screens
│   │   │   │   ├── TabBar/         # Main tab navigation screens
│   │   │   │   │   └── profile/    # Theme selector location
│   │   │   │   └── OnBoarding.tsx
│   │   │   ├── navigation/
│   │   │   │   ├── Type/
│   │   │   │   │   ├── StackNavigation.tsx
│   │   │   │   │   └── TabBarNavigation.tsx
│   │   │   │   ├── NavigationKeys.ts
│   │   │   │   └── index.ts
│   │   │   ├── redux/
│   │   │   │   ├── action/
│   │   │   │   ├── reducer/
│   │   │   │   ├── store/
│   │   │   │   └── types/
│   │   │   ├── themes/
│   │   │   │   ├── colors.ts
│   │   │   │   ├── typography.ts
│   │   │   │   ├── commonStyle.ts
│   │   │   │   ├── flex.ts
│   │   │   │   ├── margin.ts
│   │   │   │   ├── padding.ts
│   │   │   │   └── index.ts
│   │   │   ├── utils/
│   │   │   │   ├── helpers.ts
│   │   │   │   └── validators.ts
│   │   │   ├── common/
│   │   │   │   └── constants.ts
│   │   │   └── index.ts
│   │   ├── .rnstorybook/           # Storybook configuration
│   │   ├── App.tsx                 # Main app with Storybook integration
│   │   ├── app.json               # Expo configuration
│   │   └── package.json
│   └── parent-dashboard/           # Next.js web app
├── services/                      # Lambda microservices
├── packages/
│   ├── shared/                    # Shared types and utilities
│   └── referenceapp-z-extended/   # Extended Z-component library
└── infrastructure/                # AWS CDK
```

## Environment Configuration

### Required Environment Variables
```bash
# Expo Configuration
EXPO_PUBLIC_STORYBOOK=false  # Enable/disable Storybook mode

# App Configuration
APP_NAME=Amicly
APP_VERSION=1.0.0
```

### Expo Configuration (app.json)
```json
{
  "expo": {
    "name": "Amicly",
    "slug": "amicly",
    "version": "1.0.0",
    "orientation": "portrait",
    "userInterfaceStyle": "light",
    "plugins": [
      ["expo-font", {
        "fonts": [
          "./src/assets/fonts/Urbanist-Bold.ttf",
          "./src/assets/fonts/Urbanist-Regular.ttf",
          "./src/assets/fonts/Urbanist-SemiBold.ttf",
          "./src/assets/fonts/Urbanist-Medium.ttf"
        ]
      }]
    ]
  }
}
```
