# API Specification

```yaml
openapi: 3.0.0
info:
  title: Amicly AI Companion API
  version: 1.0.0
  description: REST API for Amicly teen AI companion with family integration and safety-first design
servers:
  - url: https://api.amicly.com/v1
    description: Production API
  - url: https://staging-api.amicly.com/v1
    description: Staging environment

paths:
  # Authentication Endpoints
  /auth/register:
    post:
      summary: Register new teen user with age verification
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                username:
                  type: string
                  minLength: 3
                birthYear:
                  type: integer
                  minimum: 2005
                email:
                  type: string
                  format: email
                parentEmail:
                  type: string
                  format: email
                  description: Required for users under 16
      responses:
        '201':
          description: User successfully registered
        '400':
          description: Invalid registration data or age verification failed

  /auth/login:
    post:
      summary: Authenticate teen user
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                username:
                  type: string
                password:
                  type: string
      responses:
        '200':
          description: Authentication successful
          content:
            application/json:
              schema:
                type: object
                properties:
                  accessToken:
                    type: string
                  refreshToken:
                    type: string
                  user:
                    $ref: '#/components/schemas/TeenUser'

  # Conversation Endpoints
  /conversations:
    get:
      summary: Get conversation history for authenticated teen
      security:
        - BearerAuth: []
      parameters:
        - name: limit
          in: query
          schema:
            type: integer
            default: 20
        - name: before
          in: query
          schema:
            type: string
            format: date-time
      responses:
        '200':
          description: Conversation list retrieved
          content:
            application/json:
              schema:
                type: object
                properties:
                  conversations:
                    type: array
                    items:
                      $ref: '#/components/schemas/Conversation'
                  hasMore:
                    type: boolean

    post:
      summary: Start new conversation thread
      security:
        - BearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                initialMessage:
                  type: string
                conversationType:
                  type: string
                  enum: [text, voice]
      responses:
        '201':
          description: New conversation created
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Conversation'

  /conversations/{conversationId}/messages:
    post:
      summary: Send message to AI companion
      security:
        - BearerAuth: []
      parameters:
        - name: conversationId
          in: path
          required: true
          schema:
            type: string
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                content:
                  type: string
                messageType:
                  type: string
                  enum: [text, voice]
                voiceFileUrl:
                  type: string
                  format: uri
      responses:
        '201':
          description: Message processed and AI response generated
          content:
            application/json:
              schema:
                type: object
                properties:
                  userMessage:
                    $ref: '#/components/schemas/ConversationMessage'
                  aiResponse:
                    $ref: '#/components/schemas/ConversationMessage'
                  safetyCheck:
                    $ref: '#/components/schemas/SafetyCheckResult'

  # Voice Processing Endpoints
  /voice/upload:
    post:
      summary: Upload voice recording for transcription
      security:
        - BearerAuth: []
      requestBody:
        required: true
        content:
          multipart/form-data:
            schema:
              type: object
              properties:
                audioFile:
                  type: string
                  format: binary
                conversationId:
                  type: string
      responses:
        '200':
          description: Voice processed and transcribed
          content:
            application/json:
              schema:
                type: object
                properties:
                  transcription:
                    type: string
                  confidence:
                    type: number
                  voiceFileUrl:
                    type: string

  /voice/synthesize:
    post:
      summary: Convert AI text response to speech
      security:
        - BearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                text:
                  type: string
                voicePersonality:
                  type: string
                  enum: [supportive, casual, coaching]
      responses:
        '200':
          description: Text synthesized to speech
          content:
            application/json:
              schema:
                type: object
                properties:
                  audioUrl:
                    type: string
                  duration:
                    type: number

  # Privacy Control Endpoints
  /privacy/settings:
    get:
      summary: Get teen's current privacy settings
      security:
        - BearerAuth: []
      responses:
        '200':
          description: Privacy settings retrieved
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PrivacySettings'

    put:
      summary: Update privacy settings (age-appropriate controls)
      security:
        - BearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PrivacySettings'
      responses:
        '200':
          description: Privacy settings updated
        '403':
          description: Action not allowed for current age group

  # Safety and Crisis Endpoints
  /safety/report:
    post:
      summary: Report safety concern or request help
      security:
        - BearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                reportType:
                  type: string
                  enum: [crisis, inappropriate_content, technical_issue]
                description:
                  type: string
                urgency:
                  type: string
                  enum: [low, medium, high, emergency]
      responses:
        '201':
          description: Safety report submitted
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SafetyIncident'

  # Family Integration Endpoints (Parent Dashboard)
  /family/dashboard:
    get:
      summary: Get family dashboard data for parent
      security:
        - BearerAuth: []
      responses:
        '200':
          description: Dashboard data retrieved
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/FamilyDashboard'

  /family/teens/{teenId}/progress:
    get:
      summary: Get teen's sharable progress data
      security:
        - BearerAuth: []
      parameters:
        - name: teenId
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Teen progress data (respecting privacy settings)
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/TeenProgress'

components:
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT

  schemas:
    TeenUser:
      type: object
      properties:
        id:
          type: string
        username:
          type: string
        ageRange:
          type: string
          enum: ['13-14', '15-16', '17-18']
        privacyLevel:
          type: string
          enum: [guided, balanced, autonomous]
        createdAt:
          type: string
          format: date-time

    Conversation:
      type: object
      properties:
        id:
          type: string
        title:
          type: string
        emotionalTone:
          type: string
          enum: [supportive, neutral, concerned, celebratory]
        messageCount:
          type: integer
        lastMessageAt:
          type: string
          format: date-time
        parentSharable:
          type: boolean

    ConversationMessage:
      type: object
      properties:
        id:
          type: string
        sender:
          type: string
          enum: [teen, ai]
        content:
          type: string
        messageType:
          type: string
          enum: [text, voice, system]
        timestamp:
          type: string
          format: date-time

    SafetyCheckResult:
      type: object
      properties:
        safetyScore:
          type: number
          minimum: 0
          maximum: 100
        flags:
          type: array
          items:
            type: string
        escalationRequired:
          type: boolean

    PrivacySettings:
      type: object
      properties:
        parentSharingEnabled:
          type: boolean
        sharableTopics:
          type: array
          items:
            type: string
        memoryRetentionDays:
          type: integer
        crisisContactPermissions:
          type: object

    SafetyIncident:
      type: object
      properties:
        id:
          type: string
        incidentType:
          type: string
          enum: [crisis_detection, inappropriate_content, manual_report]
        severityLevel:
          type: string
          enum: [low, moderate, high, emergency]
        status:
          type: string
          enum: [open, investigating, resolved]
        createdAt:
          type: string
          format: date-time

    FamilyDashboard:
      type: object
      properties:
        familyId:
          type: string
        teens:
          type: array
          items:
            $ref: '#/components/schemas/TeenOverview'
        recentActivity:
          type: array
          items:
            $ref: '#/components/schemas/ActivitySummary'

    TeenProgress:
      type: object
      properties:
        teenId:
          type: string
        conversationStats:
          type: object
        emotionalTrends:
          type: object
        achievementMilestones:
          type: array
        lastActive:
          type: string
          format: date-time
```
