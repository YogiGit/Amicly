# Technical Assumptions

## Repository Structure: Monorepo

**Decision:** Extend existing ReferenceApp-Expo monorepo structure with AI conversation microservices, shared component libraries, and cross-platform code targeting 85% reuse between Android/iOS.

**Rationale:** Leverages existing infrastructure investment while enabling rapid iteration across AI services, mobile app, and parent dashboard. Monorepo supports shared design system and business logic while allowing independent deployment of AI processing services.

## Service Architecture

**Decision:** Microservices within Monorepo - Core mobile app as primary service with dedicated AI conversation, safety moderation, and parent dashboard microservices.

**Technical Architecture:**
- **Mobile App Service:** React Native app with existing ReferenceApp-Expo foundation
- **AI Conversation Service:** Dedicated microservice for AI model integration, conversation processing, and emotional memory management
- **Safety Pipeline Service:** Real-time content moderation, crisis detection, and escalation procedures
- **Parent Dashboard Service:** Web application for family account management and progress insights
- **Shared Services:** Authentication, user management, and data storage extending existing infrastructure

## Testing Requirements

**Decision:** Full Testing Pyramid with specialized safety testing protocols.

**Testing Strategy:**
- **Unit Testing:** Individual component and service testing with 80%+ coverage
- **Integration Testing:** AI conversation flow testing, parent-teen privacy boundary validation, safety escalation workflows
- **End-to-End Testing:** Complete user journeys including voice processing, crisis detection, and cross-platform synchronization
- **Safety Testing:** Specialized protocols for age-appropriate response validation, crisis scenario testing, and content moderation accuracy
- **Performance Testing:** AI response time validation, voice processing latency, and scalability under load

## Additional Technical Assumptions and Requests

**AI Model Integration:**
- **Primary:** OpenAI GPT-4 or Anthropic Claude with custom teen-safety prompting and conversation context management
- **Backup Strategy:** Multi-provider integration to prevent service disruption
- **Cost Management:** API rate limiting and usage optimization targeting $3K-$8K monthly at scale

**Voice Processing:**
- **Speech Services:** Azure Speech Services or Google Cloud Speech API for <500ms processing latency
- **Real-time Communication:** WebSocket integration for live voice conversations
- **Offline Capability:** Local speech processing fallback for basic functionality

**Data Architecture:**
- **Conversation Storage:** Encrypted conversation logs with user-controlled retention and deletion
- **Emotional Memory:** Privacy-compliant pattern analysis with granular user control over data retention
- **Family Data:** Secure parent-teen account linking with privacy boundary enforcement

**Infrastructure Requirements:**
- **Scalability:** Auto-scaling microservices for AI conversation processing during peak usage
- **Security:** SOC 2 compliance with additional COPPA/GDPR requirements for teen users
- **Performance:** CDN for low-latency voice processing across geographic regions
- **Monitoring:** Real-time conversation quality monitoring and safety incident alerting

**Mobile Development:**
- **React Native 0.72+** with Expo SDK leveraging existing component library
- **Platform Targets:** Android 5.0+ (API 21) primary, iOS 14+ for Phase 2
- **Voice Integration:** Expo AV + third-party speech libraries for multimodal communication
- **State Management:** Extend existing state management for conversation history and privacy controls
