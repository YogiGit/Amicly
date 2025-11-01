# Core Workflows

## AI Conversation with Safety Monitoring

```mermaid
sequenceDiagram
    participant T as Teen Mobile App
    participant G as API Gateway
    participant A as AI Conversation Service
    participant S as Safety Pipeline Service
    participant B as AWS Bedrock
    participant D as Aurora Database
    participant F as Family Service

    T->>G: POST /conversations/{id}/messages
    Note over T,G: Teen sends message to AI

    G->>A: Route message to AI service
    A->>S: Submit message for safety check

    par Real-time Safety Analysis
        S->>S: Analyze sentiment & content
        S->>D: Log safety analysis
        alt Crisis detected
            S->>F: Trigger crisis escalation
            F->>F: Notify parents (if permitted)
        end
    end

    A->>B: Generate AI response with safety prompts
    B-->>A: Return safe AI response

    A->>S: Verify AI response safety
    S-->>A: Approve response (safety score >95)

    A->>D: Store encrypted conversation
    A->>G: Return user & AI messages
    G->>T: Deliver conversation update

    Note over T,D: <3 second total response time
```

## Crisis Detection and Family Escalation

```mermaid
sequenceDiagram
    participant T as Teen Mobile App
    participant S as Safety Pipeline Service
    participant C as Crisis Response Orchestrator
    participant F as Family Service
    participant E as External Crisis API
    participant P as Parent Dashboard
    participant N as Notification Service

    T->>S: Message with crisis indicators detected
    S->>S: ML analysis confirms crisis (confidence >80%)
    S->>C: Trigger crisis workflow

    C->>F: Check teen's privacy settings
    F-->>C: Return family notification permissions

    par Crisis Response Actions
        C->>E: Submit to Crisis Text Line API
        E-->>C: Professional resource connection
        and
        alt Parent notification permitted
            C->>N: Send parent emergency notification
            N->>P: Real-time dashboard alert
        end
        and
        C->>T: Provide immediate coping resources
    end

    C->>S: Update incident status
    S->>S: Schedule 24hr follow-up check

    Note over T,E: Professional help connected within 60 seconds
```

## Age-Graduated Privacy Control Update

```mermaid
sequenceDiagram
    participant T as Teen Mobile App
    participant P as Privacy Control Engine
    participant F as Family Service
    participant D as Aurora Database
    participant N as Parent Dashboard

    T->>P: Request privacy settings update
    P->>P: Validate teen's age range and permissions

    alt Age 13-14 (Guided)
        P->>T: Show limited privacy options with explanations
        T->>P: Select guided privacy changes
        P->>F: Notify parents of privacy change intent
        F->>N: Display change request to parents
        Note over T,N: 24hr parent review period
    else Age 15-16 (Balanced)
        P->>T: Show balanced privacy controls
        T->>P: Update privacy settings
        P->>F: Log privacy change for family transparency
    else Age 17-18 (Autonomous)
        P->>T: Show full privacy controls
        T->>P: Update privacy settings immediately
        P->>D: Store privacy preferences
    end

    P->>D: Apply new privacy rules to existing data
    P->>T: Confirm privacy settings updated

    Note over T,D: Privacy changes respect developmental appropriateness
```

## Voice Conversation Processing

```mermaid
sequenceDiagram
    participant T as Teen Mobile App
    participant V as Voice Processing Service
    participant A as AI Conversation Service
    participant S3 as S3 Storage
    participant TR as AWS Transcribe
    participant PO as AWS Polly

    T->>T: Teen records voice message (hold-to-talk)
    T->>V: Upload voice file
    V->>S3: Store encrypted voice file

    par Voice Processing
        V->>TR: Transcribe audio to text
        TR-->>V: Return transcription (confidence >90%)
    end

    V->>A: Send transcribed text for AI processing
    A->>A: Generate AI text response
    A-->>V: Return AI response text

    par Response Synthesis
        V->>PO: Synthesize AI response to speech
        PO-->>V: Return audio file
        V->>S3: Store response audio
    end

    V->>T: Return transcription + AI text + audio URLs
    T->>T: Display conversation + play AI voice response

    Note over T,PO: <500ms transcription + <2 seconds total voice processing
```

## Family Dashboard Data Aggregation

```mermaid
sequenceDiagram
    participant P as Parent Dashboard
    participant F as Family Service
    participant D as Aurora Database
    participant T as Teen Mobile App
    participant PR as Privacy Control Engine

    P->>F: Request family dashboard data
    F->>PR: Check teen privacy permissions

    par Privacy-Filtered Data Collection
        F->>D: Query teen conversation statistics
        D-->>F: Return aggregated, anonymized data
        and
        F->>D: Query teen emotional trends
        D-->>F: Return shareable emotional patterns
        and
        F->>D: Query achievement milestones
        D-->>F: Return teen-approved achievements
    end

    PR->>PR: Filter data based on teen privacy settings
    PR-->>F: Return privacy-compliant data subset

    F->>P: Deliver family dashboard data
    P->>P: Render parent-appropriate insights

    Note over P,D: Teen privacy controls override all parent data access
```
