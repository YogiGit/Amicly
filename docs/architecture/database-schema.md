# Database Schema

```sql
-- Enable required extensions for encryption and performance
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";

-- Teen Users Table with COPPA compliance
CREATE TABLE teen_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255), -- Optional for under-16 users
    age_range teen_age_range NOT NULL,
    birth_year INTEGER NOT NULL CHECK (birth_year >= 2005),
    privacy_level privacy_level_enum NOT NULL,
    parent_consent BOOLEAN NOT NULL DEFAULT false,
    safety_status safety_status_enum NOT NULL DEFAULT 'active',
    family_id UUID REFERENCES families(id),
    encryption_key_id VARCHAR(255) NOT NULL, -- AWS KMS key ID
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_active_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    preferences JSONB NOT NULL DEFAULT '{}',

    -- Compliance and audit
    coppa_consent_at TIMESTAMP WITH TIME ZONE,
    parent_email VARCHAR(255), -- Required for under-16

    -- Indexes for performance
    INDEX idx_teen_users_family_id (family_id),
    INDEX idx_teen_users_age_range (age_range),
    INDEX idx_teen_users_safety_status (safety_status),
    INDEX idx_teen_users_last_active (last_active_at)
);

-- Custom types for teen age ranges and privacy levels
CREATE TYPE teen_age_range AS ENUM ('13-14', '15-16', '17-18');
CREATE TYPE privacy_level_enum AS ENUM ('guided', 'balanced', 'autonomous');
CREATE TYPE safety_status_enum AS ENUM ('active', 'monitoring', 'escalated', 'resolved');

-- Families Table for parent-teen linking
CREATE TABLE families (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    family_name VARCHAR(100) NOT NULL,
    primary_parent_id UUID NOT NULL,
    secondary_parent_ids UUID[] DEFAULT '{}',
    privacy_agreement JSONB NOT NULL DEFAULT '{}',
    communication_preferences JSONB NOT NULL DEFAULT '{}',
    emergency_contacts JSONB NOT NULL DEFAULT '[]',
    subscription_tier subscription_tier_enum NOT NULL DEFAULT 'free',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_families_primary_parent (primary_parent_id)
);

CREATE TYPE subscription_tier_enum AS ENUM ('free', 'premium', 'family_plus');

-- Conversations Table with encryption
CREATE TABLE conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    teen_user_id UUID NOT NULL REFERENCES teen_users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    encrypted_content BYTEA, -- Encrypted conversation metadata
    emotional_tone emotional_tone_enum NOT NULL DEFAULT 'neutral',
    contains_sensitive_content BOOLEAN NOT NULL DEFAULT false,
    parent_sharable BOOLEAN NOT NULL DEFAULT false,
    retention_date TIMESTAMP WITH TIME ZONE NOT NULL,
    safety_score DECIMAL(5,2) CHECK (safety_score >= 0 AND safety_score <= 100),
    topic_tags TEXT[] DEFAULT '{}',
    message_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_message_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    -- Performance indexes
    INDEX idx_conversations_teen_user_id (teen_user_id),
    INDEX idx_conversations_last_message (last_message_at DESC),
    INDEX idx_conversations_retention (retention_date),
    INDEX idx_conversations_safety_score (safety_score),
    INDEX idx_conversations_parent_sharable (parent_sharable) WHERE parent_sharable = true
);

CREATE TYPE emotional_tone_enum AS ENUM ('supportive', 'neutral', 'concerned', 'celebratory');

-- Conversation Messages Table with per-message encryption
CREATE TABLE conversation_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    sender message_sender_enum NOT NULL,
    encrypted_content BYTEA NOT NULL, -- Per-message encryption
    message_type message_type_enum NOT NULL,
    voice_file_s3_key VARCHAR(255), -- S3 object key for voice files
    safety_flags TEXT[] DEFAULT '{}',
    ai_model_version VARCHAR(50), -- Track AI model used for responses
    processing_time_ms INTEGER, -- Performance tracking
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    -- Partitioning by conversation for performance
    INDEX idx_messages_conversation_created (conversation_id, created_at DESC),
    INDEX idx_messages_safety_flags (safety_flags) WHERE array_length(safety_flags, 1) > 0
) PARTITION BY HASH (conversation_id);

CREATE TYPE message_sender_enum AS ENUM ('teen', 'ai', 'system');
CREATE TYPE message_type_enum AS ENUM ('text', 'voice', 'system');

-- Safety Incidents Table for crisis tracking
CREATE TABLE safety_incidents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    teen_user_id UUID NOT NULL REFERENCES teen_users(id),
    conversation_id UUID REFERENCES conversations(id),
    incident_type incident_type_enum NOT NULL,
    severity_level severity_level_enum NOT NULL,
    encrypted_trigger_content BYTEA, -- Encrypted content that triggered incident
    ai_confidence DECIMAL(5,2) CHECK (ai_confidence >= 0 AND ai_confidence <= 100),
    human_reviewed BOOLEAN NOT NULL DEFAULT false,
    reviewed_by VARCHAR(100),
    escalation_actions JSONB NOT NULL DEFAULT '[]',
    resolution_status resolution_status_enum NOT NULL DEFAULT 'open',
    follow_up_required BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,

    -- Critical indexes for safety monitoring
    INDEX idx_safety_incidents_teen_user (teen_user_id),
    INDEX idx_safety_incidents_severity (severity_level, created_at DESC),
    INDEX idx_safety_incidents_status (resolution_status),
    INDEX idx_safety_incidents_unresolved (created_at) WHERE resolution_status IN ('open', 'investigating')
);

CREATE TYPE incident_type_enum AS ENUM ('crisis_detection', 'inappropriate_content', 'manual_report');
CREATE TYPE severity_level_enum AS ENUM ('low', 'moderate', 'high', 'emergency');
CREATE TYPE resolution_status_enum AS ENUM ('open', 'investigating', 'resolved', 'false_positive');

-- AI Personality Configurations
CREATE TABLE ai_personalities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    teen_user_id UUID NOT NULL REFERENCES teen_users(id) ON DELETE CASCADE,
    personality_traits JSONB NOT NULL,
    communication_style communication_style_enum NOT NULL DEFAULT 'supportive',
    life_coaching_focus TEXT[] DEFAULT '{}',
    encrypted_conversation_memory BYTEA, -- Encrypted learned patterns
    restricted_topics TEXT[] DEFAULT '{}',
    response_patterns JSONB NOT NULL DEFAULT '{}',
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    version VARCHAR(20) NOT NULL DEFAULT '1.0',

    UNIQUE(teen_user_id), -- One personality per teen
    INDEX idx_ai_personalities_teen_user (teen_user_id)
);

CREATE TYPE communication_style_enum AS ENUM ('casual', 'formal', 'supportive', 'coaching');

-- Voice Files Metadata (S3 references)
CREATE TABLE voice_files (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    teen_user_id UUID NOT NULL REFERENCES teen_users(id),
    conversation_message_id UUID REFERENCES conversation_messages(id),
    s3_bucket VARCHAR(100) NOT NULL,
    s3_key VARCHAR(255) NOT NULL,
    file_size_bytes INTEGER NOT NULL,
    duration_seconds DECIMAL(6,2),
    encryption_key_id VARCHAR(255) NOT NULL, -- AWS KMS key for S3 encryption
    transcription_confidence DECIMAL(5,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP WITH TIME ZONE, -- For automatic cleanup

    INDEX idx_voice_files_teen_user (teen_user_id),
    INDEX idx_voice_files_expires (expires_at) WHERE expires_at IS NOT NULL
);

-- Audit Log for COPPA compliance and safety monitoring
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    teen_user_id UUID REFERENCES teen_users(id),
    family_id UUID REFERENCES families(id),
    action_type VARCHAR(100) NOT NULL,
    resource_type VARCHAR(100) NOT NULL,
    resource_id UUID,
    actor_type actor_type_enum NOT NULL,
    actor_id UUID NOT NULL,
    action_details JSONB NOT NULL DEFAULT '{}',
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    -- Compliance and monitoring indexes
    INDEX idx_audit_logs_teen_user (teen_user_id, created_at DESC),
    INDEX idx_audit_logs_family (family_id, created_at DESC),
    INDEX idx_audit_logs_action_type (action_type, created_at DESC)
) PARTITION BY RANGE (created_at);

CREATE TYPE actor_type_enum AS ENUM ('teen', 'parent', 'system', 'moderator');

-- Row Level Security for multi-tenancy
ALTER TABLE teen_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversation_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies (example for teen data isolation)
CREATE POLICY teen_isolation ON teen_users
    USING (id = current_setting('app.teen_user_id')::UUID);

CREATE POLICY conversation_isolation ON conversations
    USING (teen_user_id = current_setting('app.teen_user_id')::UUID);
```
