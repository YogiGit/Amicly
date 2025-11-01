# Data Models

## TeenUser

**Purpose:** Represents the primary teen user with age-graduated privacy controls and safety monitoring capabilities

**Key Attributes:**
- `id`: string - Unique user identifier (UUID)
- `username`: string - Display name chosen by teen
- `email`: string - Optional for account recovery (age-dependent)
- `ageRange`: enum - 13-14, 15-16, 17-18 (for privacy graduation)
- `birthYear`: number - Year only for COPPA compliance
- `privacyLevel`: enum - guided, balanced, autonomous (auto-set by age)
- `parentConsent`: boolean - Required for under-13 users
- `safetyStatus`: enum - active, monitoring, escalated, resolved
- `createdAt`: timestamp - Account creation
- `lastActiveAt`: timestamp - Session tracking

### TypeScript Interface
```typescript
interface TeenUser {
  id: string;
  username: string;
  email?: string;
  ageRange: '13-14' | '15-16' | '17-18';
  birthYear: number;
  privacyLevel: 'guided' | 'balanced' | 'autonomous';
  parentConsent: boolean;
  safetyStatus: 'active' | 'monitoring' | 'escalated' | 'resolved';
  familyId?: string;
  encryptionKeyId: string;
  createdAt: Date;
  lastActiveAt: Date;
  preferences: UserPreferences;
}

interface UserPreferences {
  voiceEnabled: boolean;
  parentSharingTopics: string[];
  memoryRetentionDays: number;
  crisisContactPreferences: CrisisContact[];
}
```

### Relationships
- Has one Family (optional for single-user accounts)
- Has many Conversations
- Has many SafetyIncidents
- Has one AIPersonality configuration

## Conversation

**Purpose:** Stores encrypted conversation threads with user-controlled retention and family sharing permissions

**Key Attributes:**
- `id`: string - Unique conversation identifier
- `teenUserId`: string - Owner of the conversation
- `title`: string - Auto-generated or user-defined thread title
- `encryptedContent`: blob - E2E encrypted conversation data
- `emotionalTone`: enum - supportive, neutral, concerned, celebratory
- `containsSensitiveContent`: boolean - Flagged for privacy review
- `parentSharable`: boolean - Teen-controlled sharing permission
- `retentionDate`: timestamp - Auto-deletion date
- `safetyScore`: number - 0-100 content safety rating
- `topicTags`: string[] - AI-generated conversation categories

### TypeScript Interface
```typescript
interface Conversation {
  id: string;
  teenUserId: string;
  title: string;
  encryptedContent: Buffer;
  emotionalTone: 'supportive' | 'neutral' | 'concerned' | 'celebratory';
  containsSensitiveContent: boolean;
  parentSharable: boolean;
  retentionDate: Date;
  safetyScore: number;
  topicTags: string[];
  messageCount: number;
  createdAt: Date;
  updatedAt: Date;
  lastMessageAt: Date;
}

interface ConversationMessage {
  id: string;
  conversationId: string;
  sender: 'teen' | 'ai';
  content: string;
  messageType: 'text' | 'voice' | 'system';
  voiceFileUrl?: string;
  safetyFlags: string[];
  timestamp: Date;
}
```

### Relationships
- Belongs to one TeenUser
- Has many ConversationMessages
- May trigger SafetyIncidents
- References AIPersonality for response generation

## Family

**Purpose:** Links teen and parent accounts with age-appropriate oversight and communication channels

**Key Attributes:**
- `id`: string - Unique family identifier
- `familyName`: string - Display name for family unit
- `primaryParentId`: string - Main parent/guardian account
- `teenIds`: string[] - Array of teen user IDs in family
- `privacyAgreement`: object - Agreed-upon family privacy rules
- `communicationPreferences`: object - How/when parents receive updates
- `emergencyContacts`: array - Crisis escalation contact information
- `subscriptionTier`: enum - free, premium, family_plus

### TypeScript Interface
```typescript
interface Family {
  id: string;
  familyName: string;
  primaryParentId: string;
  secondaryParentIds: string[];
  teenIds: string[];
  privacyAgreement: FamilyPrivacyAgreement;
  communicationPreferences: CommunicationSettings;
  emergencyContacts: EmergencyContact[];
  subscriptionTier: 'free' | 'premium' | 'family_plus';
  createdAt: Date;
  updatedAt: Date;
}

interface FamilyPrivacyAgreement {
  allowedTopics: string[];
  restrictedTopics: string[];
  notificationSettings: NotificationPreferences;
  graduationRules: PrivacyGraduationRules;
}
```

### Relationships
- Has one primary ParentUser
- Has many TeenUsers
- Has many FamilyProgressReports
- References SubscriptionPlans

## SafetyIncident

**Purpose:** Tracks and manages crisis detection, content moderation, and safety escalations with audit trail

**Key Attributes:**
- `id`: string - Unique incident identifier
- `teenUserId`: string - Teen involved in incident
- `incidentType`: enum - crisis_detection, inappropriate_content, manual_report
- `severityLevel`: enum - low, moderate, high, emergency
- `triggerContent`: string - Content that triggered incident (encrypted)
- `aiConfidence`: number - ML model confidence in detection
- `humanReviewed`: boolean - Whether human moderator reviewed
- `escalationActions`: array - Actions taken (parent notify, professional contact, etc.)
- `resolutionStatus`: enum - open, investigating, resolved, false_positive
- `followUpRequired`: boolean - Whether ongoing monitoring needed

### TypeScript Interface
```typescript
interface SafetyIncident {
  id: string;
  teenUserId: string;
  conversationId?: string;
  incidentType: 'crisis_detection' | 'inappropriate_content' | 'manual_report';
  severityLevel: 'low' | 'moderate' | 'high' | 'emergency';
  triggerContent: string; // encrypted
  aiConfidence: number;
  humanReviewed: boolean;
  reviewedBy?: string;
  escalationActions: EscalationAction[];
  resolutionStatus: 'open' | 'investigating' | 'resolved' | 'false_positive';
  followUpRequired: boolean;
  createdAt: Date;
  resolvedAt?: Date;
  notes: string;
}

interface EscalationAction {
  actionType: 'parent_notify' | 'professional_contact' | 'emergency_services';
  status: 'pending' | 'completed' | 'failed';
  timestamp: Date;
  details: Record<string, any>;
}
```

### Relationships
- Belongs to one TeenUser
- May reference one Conversation
- Links to Family for parent notifications
- Creates AuditLogEntries for compliance

## AIPersonality

**Purpose:** Configures AI conversation behavior, emotional intelligence, and life coaching integration for each teen

**Key Attributes:**
- `id`: string - Unique personality configuration ID
- `teenUserId`: string - Associated teen user
- `personalityTraits`: object - AI behavioral characteristics
- `communicationStyle`: enum - casual, formal, supportive, coaching
- `lifeCachingFocus`: array - Areas of guidance (academic, social, emotional)
- `conversationMemory`: object - Learned patterns and preferences
- `restrictedTopics`: array - Parent or safety-configured topic limits
- `responsePatterns`: object - Customized AI response templates

### TypeScript Interface
```typescript
interface AIPersonality {
  id: string;
  teenUserId: string;
  personalityTraits: PersonalityTraits;
  communicationStyle: 'casual' | 'formal' | 'supportive' | 'coaching';
  lifeCachingFocus: LifeCoachingArea[];
  conversationMemory: ConversationMemory;
  restrictedTopics: string[];
  responsePatterns: ResponsePattern[];
  lastUpdated: Date;
  version: string;
}

interface PersonalityTraits {
  empathy: number; // 1-10 scale
  humor: number;
  directness: number;
  supportiveness: number;
  challengeLevel: number;
}

type LifeCoachingArea = 'academic' | 'social' | 'emotional' | 'health' | 'career' | 'family';
```

### Relationships
- Belongs to one TeenUser
- Influences Conversation generation
- References LifeCoachingTemplates
- Updates based on ConversationFeedback
