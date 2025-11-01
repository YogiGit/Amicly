# Tech Stack

| Category | Technology | Version | Purpose | Rationale |
|----------|------------|---------|---------|-----------|
| Frontend Language | TypeScript | ~5.9.2 | Type-safe mobile development | Extends ReferenceApp-Expo foundation, ensures safety in teen-facing code |
| Frontend Framework | React Native + Expo | 0.81.4 / ~54.0.10 | Cross-platform mobile app | Maintains existing ReferenceApp-Expo investment, 85% iOS code reuse target |
| UI Component Library | ReferenceApp-Expo Z-Components | Current | Six-theme proven design system | Leverages #FF4D67 brand, Urbanist fonts, battle-tested performance with 6 theme variations |
| State Management | Redux Toolkit + RTK Query | ^2.9.0 | Predictable state with caching | Extends existing ReferenceApp-Expo patterns, handles AI conversation state |
| Navigation | React Navigation v6 | ^7.1.17 | Navigation management | De facto standard for React Native navigation from ReferenceApp |
| Design System Tool | Storybook | ^9.1.4 | Component development | Isolated component development and testing from ReferenceApp patterns |
| Vector Graphics | React Native SVG | 15.12.1 | Scalable graphics | High-quality icons and illustrations |
| Icon Library | React Native Vector Icons | ^10.3.0 | Icon system | Comprehensive icon library from ReferenceApp |
| Font Management | Expo Font | Built-in | Custom typography | Urbanist font family integration (Regular, Medium, SemiBold, Bold) |
| Backend Language | TypeScript | 5.x | Unified language across stack | Shared types between frontend/backend, team efficiency |
| Backend Framework | AWS Lambda + Serverless Framework | 3.x | Serverless microservices | Auto-scaling for AI workloads, cost efficiency, AWS ecosystem |
| API Style | REST + WebSocket | OpenAPI 3.0 | HTTP APIs + real-time chat | Proven mobile compatibility, real-time conversation support |
| Database | AWS RDS Aurora Serverless v2 | PostgreSQL 14+ | Scalable relational storage | ACID compliance for financial/safety data, auto-scaling |
| Cache | AWS ElastiCache Redis | 7.x | Session and conversation caching | Sub-second conversation history, AI response caching |
| File Storage | AWS S3 + CloudFront | Current | Voice recordings and assets | Secure teen voice data, global CDN for performance |
| Authentication | AWS Cognito + Custom Lambda | Current | Multi-factor family auth | COPPA compliance, age-graduated controls, family linking |
| Frontend Testing | Jest + React Native Testing Library | 29.x | Component and integration tests | Extends ReferenceApp-Expo testing patterns, conversation flow testing |
| Backend Testing | Jest + Supertest | 29.x | API and Lambda function tests | TypeScript compatibility, AWS Lambda testing support |
| E2E Testing | Detox + AWS Device Farm | 20.x | Real device testing | React Native native support, teen device compatibility testing |
| Build Tool | Expo CLI + EAS Build | Latest | Mobile app compilation | Maintains ReferenceApp-Expo build pipeline, cross-platform support |
| Bundler | Metro (React Native) + Webpack | Current | Mobile and web bundling | React Native default, parent dashboard web bundling |
| IaC Tool | AWS CDK | 2.x | Infrastructure as Code | TypeScript-based infrastructure, version control for compliance |
| CI/CD | GitHub Actions + AWS CodePipeline | Current | Automated deployment | Multi-environment safety testing, compliance audit trails |
| Monitoring | AWS CloudWatch + X-Ray | Current | Application performance monitoring | AI conversation latency tracking, safety incident monitoring |
| Logging | AWS CloudWatch Logs + Structured Logging | Current | Centralized log management | COPPA-compliant log retention, safety audit requirements |
| CSS Framework | Styled Components + ReferenceApp-Expo Theming | 5.x | Component styling | Maintains existing six-theme design system, conversation-specific styling |
| Package Manager | Yarn | Latest | Dependency management | Fast and reliable package management from ReferenceApp |
| Code Quality | Metro | ^0.77.0 | Bundle optimization | React Native specific bundler |

---
