# Deployment Architecture

## Deployment Strategy

**Frontend Deployment:**
- **Platform:** AWS Amplify for mobile app distribution, Vercel for parent dashboard
- **Build Command:** `expo build --platform android --release-channel production`
- **Output Directory:** `apps/mobile/dist/` for mobile, `apps/parent-dashboard/.next/` for web
- **CDN/Edge:** CloudFront distribution with global edge locations for teen user performance

**Backend Deployment:**
- **Platform:** AWS Lambda via Serverless Framework with blue-green deployment
- **Build Command:** `npm run build:services` for TypeScript compilation and bundling
- **Deployment Method:** Serverless Framework with AWS CloudFormation for infrastructure as code

## CI/CD Pipeline
```yaml
# .github/workflows/deploy-prod.yaml
name: Production Deployment

on:
  push:
    branches: [main]
    paths:
      - 'apps/**'
      - 'services/**'
      - 'infrastructure/**'

jobs:
  safety-validation:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Safety Content Validation
        run: |
          npm run safety-check
          npm run compliance-check

      - name: Teen Safety Model Testing
        run: |
          npm run test:crisis-detection
          npm run test:content-moderation

  security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Security Vulnerability Scan
        uses: github/super-linter@v4

      - name: COPPA Compliance Validation
        run: npm run validate:coppa-compliance

  build-and-test:
    needs: [safety-validation, security-scan]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'yarn'

      - name: Install Dependencies
        run: yarn install --frozen-lockfile

      - name: Run Tests
        run: |
          yarn test:mobile
          yarn test:services
          yarn test:integration

      - name: Build Applications
        run: |
          yarn build:mobile
          yarn build:dashboard
          yarn build:services

  deploy-infrastructure:
    needs: build-and-test
    runs-on: ubuntu-latest
    steps:
      - name: Deploy AWS Infrastructure
        run: |
          cd infrastructure
          npm run cdk:deploy --context environment=production

      - name: Validate Infrastructure
        run: npm run validate:infrastructure

  deploy-services:
    needs: deploy-infrastructure
    runs-on: ubuntu-latest
    steps:
      - name: Deploy Lambda Services
        run: |
          npm run deploy:services -- --stage production

      - name: Run Service Health Checks
        run: npm run health-check:services

  deploy-applications:
    needs: deploy-services
    runs-on: ubuntu-latest
    steps:
      - name: Deploy Mobile App
        run: |
          expo publish --release-channel production

      - name: Deploy Parent Dashboard
        run: |
          cd apps/parent-dashboard
          vercel --prod --token ${{ secrets.VERCEL_TOKEN }}

  post-deployment:
    needs: deploy-applications
    runs-on: ubuntu-latest
    steps:
      - name: Run E2E Tests
        run: npm run test:e2e:production

      - name: Safety System Validation
        run: |
          npm run validate:crisis-detection
          npm run validate:content-filtering

      - name: Performance Monitoring Setup
        run: npm run setup:monitoring
```

## Environments

| Environment | Frontend URL | Backend URL | Purpose |
|-------------|-------------|-------------|---------|
| Development | http://localhost:3000 | http://localhost:3001 | Local development with safety testing |
| Staging | https://staging.amicly.com | https://staging-api.amicly.com | Pre-production safety validation |
| Production | https://app.amicly.com | https://api.amicly.com | Live environment with full compliance |
