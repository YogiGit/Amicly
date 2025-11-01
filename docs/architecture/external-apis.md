# External APIs

## AWS Bedrock API

- **Purpose:** Primary AI conversation models with teen-safe content generation and safety filtering
- **Documentation:** https://docs.aws.amazon.com/bedrock/
- **Base URL(s):** https://bedrock-runtime.{region}.amazonaws.com
- **Authentication:** AWS IAM roles with Lambda execution permissions
- **Rate Limits:** 1000 requests/minute per model, with burst capacity

**Key Endpoints Used:**
- `POST /model/{modelId}/invoke` - Generate AI responses with custom teen-safe prompting
- `POST /model/{modelId}/invoke-with-response-stream` - Streaming responses for real-time conversation

**Integration Notes:** Custom safety prompting framework wraps all Bedrock calls to ensure age-appropriate responses. Conversation context managed through Lambda memory optimization for <3 second response times.

## AWS Comprehend API

- **Purpose:** Content sentiment analysis, language detection, and inappropriate content filtering for safety pipeline
- **Documentation:** https://docs.aws.amazon.com/comprehend/
- **Base URL(s):** https://comprehend.{region}.amazonaws.com
- **Authentication:** AWS IAM roles with Comprehend access permissions
- **Rate Limits:** 100 transactions/second for real-time analysis

**Key Endpoints Used:**
- `POST /DetectSentiment` - Analyze emotional tone of teen messages for crisis detection
- `POST /DetectToxicContent` - Identify inappropriate content requiring moderation
- `POST /ClassifyDocument` - Custom teen crisis classification models

**Integration Notes:** Real-time integration processes every message through safety pipeline without blocking conversation flow. Custom models trained on teen-specific language patterns and crisis indicators.

## Crisis Text Line API

- **Purpose:** Professional crisis intervention for teens during mental health emergencies
- **Documentation:** https://www.crisistextline.org/api (partner access required)
- **Base URL(s):** https://api.crisistextline.org/v1
- **Authentication:** API key with crisis partner certification
- **Rate Limits:** Emergency services - no rate limits for crisis escalation

**Key Endpoints Used:**
- `POST /crisis/report` - Submit teen crisis situation for professional intervention
- `GET /resources/teen` - Retrieve age-appropriate crisis resources and coping strategies
- `POST /follow-up/schedule` - Schedule follow-up support after crisis resolution

**Integration Notes:** Integrated into Crisis Response Orchestrator with automatic escalation triggers. Direct professional handoff maintains teen anonymity while ensuring appropriate intervention level.

## NCMEC CyberTipline API

- **Purpose:** Report suspected child exploitation or safety violations as required by law
- **Documentation:** https://www.missingkids.org/gethelpnow/cybertipline
- **Base URL(s):** https://www.cybertipline.org/api/v1
- **Authentication:** NCMEC partner credentials with verified reporter status
- **Rate Limits:** Legal reporting - no limits for mandatory disclosures

**Key Endpoints Used:**
- `POST /report/submit` - Submit legally required reports of suspected exploitation
- `GET /incident/status` - Track report status for compliance documentation

**Integration Notes:** Automated integration for legally mandated reporting scenarios. All reports include comprehensive audit trails and legal compliance documentation for regulatory requirements.

## SendGrid Email API

- **Purpose:** Family communication, parent notifications, and crisis alert delivery across multiple channels
- **Documentation:** https://docs.sendgrid.com/api-reference
- **Base URL(s):** https://api.sendgrid.com/v3
- **Authentication:** API key with verified sender domain
- **Rate Limits:** 100 emails/second with burst capacity for emergency notifications

**Key Endpoints Used:**
- `POST /mail/send` - Deliver parent notifications respecting teen privacy settings
- `POST /templates/{template_id}/send` - Send crisis alerts using pre-approved emergency templates
- `GET /suppression/bounces` - Monitor delivery for critical safety notifications

**Integration Notes:** Template-based system ensures consistent family communication. Priority queuing for crisis notifications ensures immediate delivery during emergencies.
