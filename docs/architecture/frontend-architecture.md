# Frontend Architecture

## Component Architecture

### Component Organization
```
apps/mobile/src/
├── components/                 # Reusable UI components
│   ├── conversation/          # AI conversation specific
│   │   ├── ConversationBubble.tsx
│   │   ├── VoiceRecordingButton.tsx
│   │   ├── TypingIndicator.tsx
│   │   └── CrisisDetectionUI.tsx
│   ├── privacy/               # Privacy control components
│   │   ├── PrivacyToggle.tsx
│   │   ├── AgeGraduationInfo.tsx
│   │   └── FamilySharing.tsx
│   ├── tikto-z/              # Extended ReferenceApp-Expo components
│   │   ├── ZButton.tsx       # Extended with conversation actions
│   │   ├── ZInput.tsx        # Extended with voice input
│   │   └── ZText.tsx         # Extended with AI personality
│   └── safety/               # Safety and crisis components
│       ├── SafetyReporting.tsx
│       ├── CrisisResources.tsx
│       └── EmergencyContacts.tsx
├── screens/                   # Screen components
│   ├── ConversationScreen.tsx # Main AI chat interface
│   ├── PrivacyScreen.tsx     # Privacy control center
│   ├── OnboardingScreen.tsx  # Teen onboarding flow
│   └── SafetyScreen.tsx      # Crisis resources and reporting
├── navigation/               # Navigation configuration
│   ├── ConversationStack.tsx # Chat-focused navigation
│   └── TabNavigator.tsx      # Bottom tab navigation
├── services/                 # API and business logic
│   ├── conversationApi.ts    # AI conversation service
│   ├── voiceService.ts       # Voice processing
│   ├── privacyService.ts     # Privacy controls
│   └── safetyService.ts      # Safety reporting
├── stores/                   # Redux state management
│   ├── conversationSlice.ts  # Conversation state
│   ├── userSlice.ts          # Teen user state
│   ├── privacySlice.ts       # Privacy settings state
│   └── safetySlice.ts        # Safety incident state
└── utils/                    # Shared utilities
    ├── encryption.ts         # Client-side encryption helpers
    ├── voiceUtils.ts         # Audio processing utilities
    └── safetyUtils.ts        # Safety content helpers
```

### Component Template
```typescript
import React, { useState, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { ZText, ZButton } from '@tikto-expo/components';
import { useTheme } from '@tikto-expo/theming';
import { conversationApi } from '../services/conversationApi';
import { RootState } from '../stores/store';

interface ConversationBubbleProps {
  message: ConversationMessage;
  isFromAI: boolean;
  onSafetyReport?: () => void;
}

export const ConversationBubble: React.FC<ConversationBubbleProps> = ({
  message,
  isFromAI,
  onSafetyReport
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { privacySettings } = useSelector((state: RootState) => state.privacy);

  const [isPlaying, setIsPlaying] = useState(false);

  const handleVoicePlayback = useCallback(async () => {
    if (message.voiceFileUrl) {
      setIsPlaying(true);
      // Voice playback implementation with ReferenceApp-Expo audio patterns
      await playVoiceMessage(message.voiceFileUrl);
      setIsPlaying(false);
    }
  }, [message.voiceFileUrl]);

  const bubbleStyle = {
    backgroundColor: isFromAI
      ? theme.colors.aiMessage
      : theme.colors.userMessage,
    alignSelf: isFromAI ? 'flex-start' : 'flex-end',
    maxWidth: '80%',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    marginVertical: theme.spacing.xs,
  };

  return (
    <View style={bubbleStyle}>
      <ZText
        variant={isFromAI ? 'aiResponse' : 'userMessage'}
        style={{ color: theme.colors.text }}
      >
        {message.content}
      </ZText>

      {message.voiceFileUrl && (
        <ZButton
          variant="voice"
          onPress={handleVoicePlayback}
          loading={isPlaying}
          icon={isPlaying ? 'pause' : 'play'}
        >
          {isPlaying ? 'Playing...' : 'Play Voice'}
        </ZButton>
      )}

      {isFromAI && privacySettings.allowSafetyReporting && (
        <ZButton
          variant="subtle"
          size="small"
          onPress={onSafetyReport}
          style={{ marginTop: theme.spacing.xs }}
        >
          Report Concern
        </ZButton>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // Minimal styles - leverage ReferenceApp-Expo theming system
});
```

## State Management Architecture

### State Structure
```typescript
// Root state extending ReferenceApp-Expo patterns
interface RootState {
  // Existing ReferenceApp-Expo state
  theme: ThemeState;
  user: UserState;

  // Amicly-specific state
  conversation: ConversationState;
  privacy: PrivacyState;
  safety: SafetyState;
  voice: VoiceState;
  aiPersonality: AIPersonalityState;
}

interface ConversationState {
  activeConversation: Conversation | null;
  conversations: Conversation[];
  messages: Record<string, ConversationMessage[]>;
  isAITyping: boolean;
  messageCache: Record<string, ConversationMessage>;
  networkStatus: 'online' | 'offline' | 'syncing';
  unsentMessages: ConversationMessage[];
}

interface PrivacyState {
  currentSettings: PrivacySettings;
  ageRange: TeenAgeRange;
  parentSharingTopics: string[];
  memoryRetentionDays: number;
  graduationStatus: 'pending' | 'active' | 'completed';
}

interface SafetyState {
  incidents: SafetyIncident[];
  crisisResources: CrisisResource[];
  emergencyContacts: EmergencyContact[];
  safetyScore: number;
  monitoringStatus: 'active' | 'escalated' | 'resolved';
}

interface VoiceState {
  isRecording: boolean;
  recordingPermission: 'granted' | 'denied' | 'pending';
  audioQuality: 'high' | 'medium' | 'low';
  processingQueue: VoiceProcessingJob[];
  offlineRecordings: OfflineRecording[];
}
```

### State Management Patterns
- **RTK Query Integration:** Conversation API calls with automatic caching and background sync
- **Optimistic Updates:** Immediate UI updates for message sending with rollback on failure
- **Offline-First:** Queue messages when offline, sync when connection restored
- **Privacy-Aware Caching:** Respect teen's data retention settings in local cache
- **Crisis State Management:** Separate high-priority state slice for safety incidents

## Routing Architecture

### Route Organization
```
Navigation Structure (extending ReferenceApp-Expo patterns):
├── AuthStack (Conditional)
│   ├── OnboardingScreen
│   ├── AgeVerificationScreen
│   └── FamilyLinkingScreen
└── MainNavigator (After auth)
    ├── ConversationStack (Primary)
    │   ├── ConversationScreen
    │   ├── ConversationHistoryScreen
    │   └── VoiceCallScreen
    ├── PrivacyStack
    │   ├── PrivacyDashboard
    │   ├── FamilySharingScreen
    │   └── AgeGraduationScreen
    ├── SafetyStack
    │   ├── SafetyResourcesScreen
    │   ├── CrisisReportingScreen
    │   └── EmergencyContactsScreen
    └── SettingsStack (ReferenceApp-Expo extended)
        ├── ProfileScreen
        ├── AIPersonalityScreen
        └── AppPreferencesScreen
```

### Protected Route Pattern
```typescript
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from '@react-navigation/native';
import { RootState } from '../stores/store';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiresParentConsent?: boolean;
  minimumAge?: TeenAgeRange;
  requiresVerification?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiresParentConsent = false,
  minimumAge,
  requiresVerification = false
}) => {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.user);
  const { privacySettings } = useSelector((state: RootState) => state.privacy);

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  if (requiresParentConsent && !user.parentConsent) {
    return <Navigate to="/auth/parent-consent" replace />;
  }

  if (minimumAge && !meetsAgeRequirement(user.ageRange, minimumAge)) {
    return <Navigate to="/age-restriction" replace />;
  }

  if (requiresVerification && user.safetyStatus === 'escalated') {
    return <Navigate to="/safety/verification" replace />;
  }

  return <>{children}</>;
};

// Age graduation helper
const meetsAgeRequirement = (
  userAge: TeenAgeRange,
  requiredAge: TeenAgeRange
): boolean => {
  const ageOrder = ['13-14', '15-16', '17-18'];
  return ageOrder.indexOf(userAge) >= ageOrder.indexOf(requiredAge);
};
```

## Frontend Services Layer

### API Client Setup
```typescript
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../stores/store';
import { encryptMessage, decryptMessage } from '../utils/encryption';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://api.amicly.com/v1',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    headers.set('x-app-version', '1.0.0');
    headers.set('x-platform', 'react-native');
    return headers;
  },
});

export const conversationApi = createApi({
  reducerPath: 'conversationApi',
  baseQuery,
  tagTypes: ['Conversation', 'Message', 'Safety'],
  endpoints: (builder) => ({
    getConversations: builder.query<Conversation[], void>({
      query: () => '/conversations',
      providesTags: ['Conversation'],
      transformResponse: (response: any) => {
        // Decrypt conversation data client-side
        return response.conversations.map(decryptConversation);
      },
    }),

    sendMessage: builder.mutation<ConversationResponse, SendMessageRequest>({
      query: ({ conversationId, content, messageType }) => ({
        url: `/conversations/${conversationId}/messages`,
        method: 'POST',
        body: {
          content: encryptMessage(content),
          messageType,
          timestamp: new Date().toISOString(),
        },
      }),
      invalidatesTags: ['Conversation', 'Message'],
      // Optimistic updates for immediate UI response
      onQueryStarted: async ({ conversationId, content }, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          conversationApi.util.updateQueryData('getMessages', conversationId, (draft) => {
            draft.push({
              id: `temp-${Date.now()}`,
              content,
              sender: 'teen',
              timestamp: new Date().toISOString(),
              isOptimistic: true,
            });
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});
```

### Service Example
```typescript
import { useState, useCallback } from 'react';
import { conversationApi } from './conversationApi';
import { safetyService } from './safetyService';
import { voiceService } from './voiceService';

export const useConversationService = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const sendMessage = useCallback(async (
    conversationId: string,
    content: string,
    messageType: 'text' | 'voice' = 'text',
    voiceFile?: string
  ) => {
    setIsProcessing(true);

    try {
      // Pre-process voice if needed
      let processedContent = content;
      if (messageType === 'voice' && voiceFile) {
        const transcription = await voiceService.transcribe(voiceFile);
        processedContent = transcription.text;
      }

      // Safety check before sending
      const safetyCheck = await safetyService.checkContent(processedContent);
      if (safetyCheck.blocked) {
        throw new Error('Message blocked by safety filter');
      }

      // Send message through API
      const response = await conversationApi.endpoints.sendMessage.initiate({
        conversationId,
        content: processedContent,
        messageType,
        voiceFileUrl: voiceFile,
      });

      // Handle safety incidents if detected
      if (response.data.safetyCheck.escalationRequired) {
        await safetyService.handleEscalation(response.data.safetyCheck);
      }

      return response.data;
    } catch (error) {
      // Handle offline mode
      if (error.message.includes('network')) {
        await queueOfflineMessage(conversationId, content, messageType);
      }
      throw error;
    } finally {
      setIsProcessing(false);
    }
  }, []);

  return {
    sendMessage,
    isProcessing,
  };
};
```
