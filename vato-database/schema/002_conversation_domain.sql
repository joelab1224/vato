-- VATO Database Schema
-- Conversation Domain Tables
-- Created: 2025-11-05
-- 
-- Purpose: Episodic memory system for cognitive AI
-- Part of Capa 3.2 (Episodic Memory) in the cognitive architecture

-- =============================================================================
-- CONVERSATIONS: Episodic memory containers
-- =============================================================================
CREATE TABLE IF NOT EXISTS conversations (
    -- Primary identifier
    conversation_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- User ownership
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    
    -- Conversation metadata
    title VARCHAR(500),
    mode VARCHAR(50) DEFAULT 'general', -- 'research', 'creative', 'analytical', etc.
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'archived', 'deleted')),
    
    -- Temporal tracking (critical for episodic memory - Capa 3.2)
    started_at TIMESTAMP DEFAULT NOW(),
    last_message_at TIMESTAMP,
    
    -- Statistics
    message_count INTEGER DEFAULT 0,
    
    -- Working memory (Capa 3.1) - stores last N messages for context
    context_window JSONB DEFAULT '[]',
    
    -- Extended metadata
    -- Example: {"topics": ["AI", "database"], "emotional_arc": [0.5, 0.7, 0.6]}
    metadata JSONB DEFAULT '{}'
);

-- Indexes for conversations
CREATE INDEX IF NOT EXISTS idx_conversations_user_id ON conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_conversations_started_at ON conversations(started_at);
CREATE INDEX IF NOT EXISTS idx_conversations_last_message_at ON conversations(last_message_at);
CREATE INDEX IF NOT EXISTS idx_conversations_status ON conversations(status);
CREATE INDEX IF NOT EXISTS idx_conversations_context_window ON conversations USING GIN (context_window);

-- Comments
COMMENT ON TABLE conversations IS 'Episodic memory containers - conversation sessions';
COMMENT ON COLUMN conversations.context_window IS 'Working memory buffer - last N messages for active context';
COMMENT ON COLUMN conversations.mode IS 'Cognitive mode - determines processing strategy (Capa 4)';

-- =============================================================================
-- MESSAGES: Core cognitive input/output
-- =============================================================================
CREATE TABLE IF NOT EXISTS messages (
    -- Primary identifier
    message_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Conversation context
    conversation_id UUID NOT NULL REFERENCES conversations(conversation_id) ON DELETE CASCADE,
    
    -- Threading support
    parent_message_id UUID REFERENCES messages(message_id),
    
    -- Message role
    role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant', 'system', 'tool')),
    
    -- Content
    content TEXT NOT NULL,
    content_hash VARCHAR(64), -- For deduplication
    
    -- Vector embedding reference (for semantic search in Qdrant)
    embedding_id VARCHAR(100),
    
    -- Perceptual analysis (Capa 1.1 - NLP Engine)
    intent_classification JSONB, -- Example: {"primary": "question", "confidence": 0.9}
    emotional_tone JSONB, -- Example: {"emotion": "curious", "intensity": 0.7}
    
    -- Performance metrics
    tokens_used INTEGER,
    processing_time_ms INTEGER,
    
    -- Temporal tracking
    created_at TIMESTAMP DEFAULT NOW(),
    edited_at TIMESTAMP,
    
    -- Soft delete
    is_deleted BOOLEAN DEFAULT FALSE
);

-- Indexes for messages
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);
CREATE INDEX IF NOT EXISTS idx_messages_role ON messages(role);
CREATE INDEX IF NOT EXISTS idx_messages_parent_message_id ON messages(parent_message_id);
CREATE INDEX IF NOT EXISTS idx_messages_intent_classification ON messages USING GIN (intent_classification);
CREATE INDEX IF NOT EXISTS idx_messages_emotional_tone ON messages USING GIN (emotional_tone);

-- Comments
COMMENT ON TABLE messages IS 'Core cognitive input/output - all conversational exchanges';
COMMENT ON COLUMN messages.intent_classification IS 'Detected user intent from Capa 1.1 (NLP Engine)';
COMMENT ON COLUMN messages.emotional_tone IS 'Emotional analysis from Capa 1.1 (Emotion Detector)';
COMMENT ON COLUMN messages.embedding_id IS 'Reference to vector embedding in Qdrant for semantic search';

-- =============================================================================
-- MESSAGE_METADATA: Extended message attributes
-- =============================================================================
CREATE TABLE IF NOT EXISTS message_metadata (
    -- Primary identifier
    metadata_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Message reference
    message_id UUID NOT NULL REFERENCES messages(message_id) ON DELETE CASCADE,
    
    -- Key-value storage
    key VARCHAR(100) NOT NULL,
    value JSONB,
    
    -- Temporal tracking
    created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for message_metadata
CREATE INDEX IF NOT EXISTS idx_message_metadata_message_id ON message_metadata(message_id);
CREATE INDEX IF NOT EXISTS idx_message_metadata_key ON message_metadata(key);
CREATE INDEX IF NOT EXISTS idx_message_metadata_value ON message_metadata USING GIN (value);

-- Comments
COMMENT ON TABLE message_metadata IS 'Extended message attributes - flexible key-value storage';
COMMENT ON COLUMN message_metadata.key IS 'Metadata key - examples: "reasoning_trace", "attention_allocation", "confidence"';

-- =============================================================================
-- CONVERSATION_PARTICIPANTS: Multi-user conversation support
-- =============================================================================
CREATE TABLE IF NOT EXISTS conversation_participants (
    -- Primary identifier
    participant_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Relationships
    conversation_id UUID NOT NULL REFERENCES conversations(conversation_id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    
    -- Participant role
    role VARCHAR(20) DEFAULT 'participant' CHECK (role IN ('owner', 'participant', 'viewer')),
    
    -- Temporal tracking
    joined_at TIMESTAMP DEFAULT NOW(),
    left_at TIMESTAMP,
    
    -- Unique constraint
    UNIQUE(conversation_id, user_id)
);

-- Indexes for conversation_participants
CREATE INDEX IF NOT EXISTS idx_conversation_participants_conversation_id ON conversation_participants(conversation_id);
CREATE INDEX IF NOT EXISTS idx_conversation_participants_user_id ON conversation_participants(user_id);
CREATE INDEX IF NOT EXISTS idx_conversation_participants_role ON conversation_participants(role);

-- Comments
COMMENT ON TABLE conversation_participants IS 'Multi-user conversation support - participant tracking';

-- =============================================================================
-- CONVERSATION_TAGS: Categorization and search
-- =============================================================================
CREATE TABLE IF NOT EXISTS conversation_tags (
    -- Primary identifier
    tag_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Conversation reference
    conversation_id UUID NOT NULL REFERENCES conversations(conversation_id) ON DELETE CASCADE,
    
    -- Tag information
    tag_name VARCHAR(100) NOT NULL,
    auto_generated BOOLEAN DEFAULT FALSE,
    
    -- Temporal tracking
    created_at TIMESTAMP DEFAULT NOW(),
    
    -- Unique constraint
    UNIQUE(conversation_id, tag_name)
);

-- Indexes for conversation_tags
CREATE INDEX IF NOT EXISTS idx_conversation_tags_conversation_id ON conversation_tags(conversation_id);
CREATE INDEX IF NOT EXISTS idx_conversation_tags_tag_name ON conversation_tags(tag_name);
CREATE INDEX IF NOT EXISTS idx_conversation_tags_auto_generated ON conversation_tags(auto_generated);

-- Comments
COMMENT ON TABLE conversation_tags IS 'Conversation categorization - manual and auto-generated tags';
COMMENT ON COLUMN conversation_tags.auto_generated IS 'True if tag was auto-generated by AI, false if user-created';
