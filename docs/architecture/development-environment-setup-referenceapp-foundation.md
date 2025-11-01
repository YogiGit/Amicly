# Development Environment Setup (amicaenv - ReferenceApp Foundation)

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
yarn env:activate

# Or use direnv (automatic activation when entering directory)
echo "use node 18.19.0" > .envrc
echo 'export PATH="./node_modules/.bin:$PATH"' >> .envrc
echo 'export PROJECT_ENV="amicaenv"' >> .envrc
direnv allow

# Install all dependencies (including dev tools locally)
yarn install
```

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
