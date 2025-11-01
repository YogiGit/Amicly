# Testing Strategy

## Testing Pyramid
```
    E2E Tests (Crisis Scenarios)
   /                              \
  Integration Tests (Safety Pipeline)
 /                                    \
Frontend Unit Tests    Backend Unit Tests
(Conversation Components)  (AI Safety Services)
```

## Test Organization

### Frontend Tests
```
apps/mobile/tests/
├── components/
│   ├── conversation/
│   │   ├── ConversationBubble.test.tsx
│   │   ├── VoiceRecording.test.tsx
│   │   └── CrisisDetection.test.tsx
│   ├── privacy/
│   │   ├── PrivacyToggle.test.tsx
│   │   └── AgeGraduation.test.tsx
│   └── safety/
│       ├── SafetyReporting.test.tsx
│       └── EmergencyContacts.test.tsx
├── screens/
│   ├── ConversationScreen.test.tsx
│   ├── PrivacyScreen.test.tsx
│   └── SafetyScreen.test.tsx
├── services/
│   ├── conversationApi.test.ts
│   ├── voiceService.test.ts
│   └── safetyService.test.ts
└── utils/
    ├── encryption.test.ts
    └── safetyValidation.test.ts
```

### Backend Tests
```
services/ai-conversation/tests/
├── handlers/
│   ├── messageHandler.test.ts
│   ├── voiceHandler.test.ts
│   └── contextHandler.test.ts
├── services/
│   ├── bedrockService.test.ts
│   ├── safetyService.test.ts
│   └── encryptionService.test.ts
└── integration/
    ├── conversationFlow.test.ts
    ├── safetyPipeline.test.ts
    └── crisisEscalation.test.ts
```

### E2E Tests
```
e2e/tests/
├── conversation-flows/
│   ├── normal-conversation.e2e.ts
│   ├── voice-conversation.e2e.ts
│   └── crisis-conversation.e2e.ts
├── family-interactions/
│   ├── parent-dashboard.e2e.ts
│   ├── privacy-controls.e2e.ts
│   └── age-graduation.e2e.ts
└── safety-scenarios/
    ├── crisis-detection.e2e.ts
    ├── content-moderation.e2e.ts
    └── emergency-escalation.e2e.ts
```

## Test Examples

### Frontend Component Test
```typescript
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { ConversationBubble } from '../ConversationBubble';
import { createMockStore } from '../../utils/testUtils';

describe('ConversationBubble', () => {
  it('should display crisis support options for concerning AI responses', async () => {
    const mockStore = createMockStore({
      privacy: {
        currentSettings: { allowSafetyReporting: true }
      }
    });

    const concerningMessage = {
      id: 'test-message',
      content: 'I understand you might be feeling overwhelmed. Would you like to talk to someone who can help?',
      sender: 'ai' as const,
      safetyFlags: ['supportive-intervention'],
      timestamp: new Date().toISOString()
    };

    const { getByText, getByTestId } = render(
      <Provider store={mockStore}>
        <ConversationBubble
          message={concerningMessage}
          isFromAI={true}
          onSafetyReport={jest.fn()}
        />
      </Provider>
    );

    // Verify crisis support options are displayed
    expect(getByTestId('crisis-support-button')).toBeTruthy();
    expect(getByText('Talk to a counselor')).toBeTruthy();

    // Test crisis support activation
    fireEvent.press(getByTestId('crisis-support-button'));

    await waitFor(() => {
      expect(getByText('Connecting you with support...')).toBeTruthy();
    });
  });

  it('should respect teen privacy settings for safety reporting', () => {
    const mockStore = createMockStore({
      privacy: {
        currentSettings: { allowSafetyReporting: false }
      }
    });

    const { queryByTestId } = render(
      <Provider store={mockStore}>
        <ConversationBubble
          message={{ content: 'Test message', sender: 'ai' }}
          isFromAI={true}
        />
      </Provider>
    );

    expect(queryByTestId('safety-report-button')).toBeNull();
  });
});
```

### Backend API Test
```typescript
import { handler } from '../handlers/messageHandler';
import { createMockAPIEvent } from '../../utils/testUtils';
import { BedrockService } from '../services/bedrockService';
import { SafetyService } from '../services/safetyService';

jest.mock('../services/bedrockService');
jest.mock('../services/safetyService');

describe('Message Handler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should process normal conversation message successfully', async () => {
    const mockBedrockService = BedrockService as jest.Mocked<typeof BedrockService>;
    const mockSafetyService = SafetyService as jest.Mocked<typeof SafetyService>;

    mockSafetyService.prototype.analyzeContent.mockResolvedValue({
      score: 98,
      flags: [],
      escalationRequired: false
    });

    mockBedrockService.prototype.generateResponse.mockResolvedValue({
      content: 'That sounds really interesting! Can you tell me more about what you enjoyed about it?',
      modelVersion: 'claude-v2',
      safetyScore: 99
    });

    const event = createMockAPIEvent({
      pathParameters: { conversationId: 'test-conversation' },
      body: JSON.stringify({
        content: 'I had a great day at school today',
        messageType: 'text'
      }),
      requestContext: {
        authorizer: {
          teenUserId: 'test-teen-user',
          ageRange: '15-16'
        }
      }
    });

    const result = await handler(event, {} as any, {} as any);

    expect(result.statusCode).toBe(201);

    const responseBody = JSON.parse(result.body);
    expect(responseBody.aiResponse.content).toContain('interesting');
    expect(responseBody.safetyCheck.escalationRequired).toBe(false);
  });

  it('should trigger crisis escalation for concerning messages', async () => {
    const mockSafetyService = SafetyService as jest.Mocked<typeof SafetyService>;

    mockSafetyService.prototype.analyzeContent.mockResolvedValue({
      score: 25,
      flags: ['self-harm-indicator', 'crisis-language'],
      escalationRequired: true,
      severityLevel: 'high'
    });

    const event = createMockAPIEvent({
      pathParameters: { conversationId: 'test-conversation' },
      body: JSON.stringify({
        content: 'I don\'t think I can handle this anymore',
        messageType: 'text'
      }),
      requestContext: {
        authorizer: {
          teenUserId: 'test-teen-user',
          ageRange: '15-16'
        }
      }
    });

    const result = await handler(event, {} as any, {} as any);

    expect(result.statusCode).toBe(202);

    const responseBody = JSON.parse(result.body);
    expect(responseBody.message).toContain('support specialist');
    expect(responseBody.supportContact).toBeTruthy();
  });
});
```

### E2E Test
```typescript
import { device, element, by, expect } from 'detox';

describe('Crisis Support Flow', () => {
  beforeEach(async () => {
    await device.reloadReactNative();

    // Login as test teen user
    await element(by.id('username-input')).typeText('test-teen-user');
    await element(by.id('password-input')).typeText('test-password');
    await element(by.id('login-button')).tap();

    // Wait for conversation screen to load
    await waitFor(element(by.id('conversation-screen')))
      .toBeVisible()
      .withTimeout(5000);
  });

  it('should provide immediate crisis support when concerning message is sent', async () => {
    // Send a concerning message
    await element(by.id('message-input')).typeText('I feel like giving up on everything');
    await element(by.id('send-button')).tap();

    // Verify crisis support UI appears
    await waitFor(element(by.id('crisis-support-ui')))
      .toBeVisible()
      .withTimeout(3000);

    await expect(element(by.text('We\'re here to help'))).toBeVisible();
    await expect(element(by.id('crisis-hotline-button'))).toBeVisible();
    await expect(element(by.id('counselor-chat-button'))).toBeVisible();

    // Test crisis hotline connection
    await element(by.id('crisis-hotline-button')).tap();

    await waitFor(element(by.text('Connecting to Crisis Text Line...')))
      .toBeVisible()
      .withTimeout(2000);

    // Verify connection establishment
    await waitFor(element(by.text('Connected - Crisis Counselor')))
      .toBeVisible()
      .withTimeout(10000);
  });

  it('should respect teen privacy during crisis while notifying parents', async () => {
    // Navigate to privacy settings
    await element(by.id('settings-tab')).tap();
    await element(by.id('privacy-settings')).tap();

    // Verify crisis override explanation
    await expect(element(by.text('Crisis Override'))).toBeVisible();
    await expect(element(by.text('Parents will be notified only during emergencies'))).toBeVisible();

    // Send concerning message
    await element(by.id('conversation-tab')).tap();
    await element(by.id('message-input')).typeText('I don\'t want to be here anymore');
    await element(by.id('send-button')).tap();

    // Verify teen sees crisis support immediately
    await waitFor(element(by.id('crisis-support-ui')))
      .toBeVisible()
      .withTimeout(3000);

    // Verify parent notification indicator (but not conversation content)
    await expect(element(by.text('Your family has been notified that you\'re getting support'))).toBeVisible();
  });
});
```
