# VATO Database Architecture
## Domain-Driven Design with Double Diamond Methodology

---

## Table of Contents

1. [Double Diamond Framework Overview](#double-diamond-framework-overview)
2. [Diamond 1: Discover & Define - Problem Space](#diamond-1-discover--define---problem-space)
3. [Diamond 2: Develop & Deliver - Solution Space](#diamond-2-develop--deliver---solution-space)
4. [Domain Model Architecture](#domain-model-architecture)
5. [Detailed Domain Schemas](#detailed-domain-schemas)
6. [Cross-Domain Relationships](#cross-domain-relationships)
7. [Implementation Strategy](#implementation-strategy)

---

## Double Diamond Framework Overview

```
DISCOVER → DEFINE → DEVELOP → DELIVER

   ◇              ◇
  / \            / \
 /   \          /   \
|     |        |     |
 \   /          \   /
  \ /            \ /
   ◇              ◇

Problem Space    Solution Space
```

---

## Diamond 1: Discover & Define - Problem Space

### Phase 1: DISCOVER - Divergent Research

#### What data does VATO need to track?

**User Interaction Data:**
- Conversations and messages
- User intent patterns
- Emotional states over time
- Interaction frequency and patterns
- Feedback and corrections
- Command history

**Cognitive Memory Data:**
- Working memory (current session)
- Episodic memory (past conversations)
- Semantic memory (learned concepts)
- Procedural memory (how to do things)
- Memory importance scoring
- Memory decay and reinforcement

**Knowledge Management Data:**
- User documents (PDFs, audio, images)
- Document chunks and embeddings
- Citations and references
- Knowledge graphs (concepts, entities)
- Document metadata and relationships
- Access patterns and relevance

**Agentic System Data:**
- Agent capabilities and states
- Task queues and execution history
- Inter-agent communication
- Agent decision trees
- Performance metrics
- Tool usage patterns

**Worldview & Context Data:**
- User preferences and values
- Domain expertise tracking
- Cultural context markers
- Language patterns
- Temporal context (time-based behaviors)
- Environmental context

**Bias & Personalization Data:**
- Detected user biases
- Preference patterns
- Communication style preferences
- Topic sensitivities
- Ethical boundaries
- Privacy preferences

**System Metadata:**
- Configuration and settings
- Model versions and providers
- Feature flags
- Audit trails
- Performance metrics
- Error logs

---

### Phase 2: DEFINE - Convergent Synthesis

#### Core Problem Statement:
*How do we structure data to enable an AI system that learns, remembers, adapts, and maintains context across multiple dimensions of user interaction while respecting privacy and enabling transparent reasoning?*

#### Key Requirements Synthesis:

1. **Temporal Continuity**: Track evolution of all entities over time
2. **Relationship Richness**: Complex many-to-many relationships across domains
3. **Multi-modal Data**: Text, embeddings, audio, images, structured data
4. **Graph-Like Traversal**: Navigate concepts, memories, and relationships
5. **Privacy-First**: Clear data ownership and deletion boundaries
6. **Performance**: Fast retrieval for real-time interaction
7. **Auditability**: Complete provenance and reasoning chains

#### Identified Core Domains:

1. **Identity Domain** - Who is using the system
2. **Conversation Domain** - Interactive dialogues
3. **Memory Domain** - Cognitive storage system
4. **Knowledge Domain** - Document and information management
5. **Cognition Domain** - Thinking and reasoning processes
6. **Persona Domain** - Adaptive personalities and modes
7. **Provenance Domain** - Source tracking and citations
8. **System Domain** - Configuration and operations

---

## Diamond 2: Develop & Deliver - Solution Space

### Phase 3: DEVELOP - Divergent Ideation

#### Database Technology Mapping

**PostgreSQL (Relational)** - Core transactional data:
- User accounts and authentication
- Session management
- Configuration and settings
- Audit logs
- Structured metadata

**Neo4j (Graph)** - Relationship-heavy data:
- Memory relationships and associations
- Concept networks and knowledge graphs
- Agent communication graphs
- Citation and provenance chains
- User preference networks

**Qdrant/Pinecone (Vector)** - Semantic search data:
- Message embeddings
- Document chunk embeddings
- Semantic memory vectors
- Intent classification vectors

**Redis (Cache/Queue)** - Real-time operational data:
- Working memory (current session)
- Task queues
- Rate limiting
- Session state
- Real-time metrics

**MongoDB (Document Store)** - Semi-structured data:
- Raw conversation logs
- Document metadata
- Agent execution logs
- Complex nested configurations

---

### Phase 4: DELIVER - Convergent Implementation

#### Final Domain Architecture Decision:

**8 Core Domains with Polyglot Persistence Strategy**

```
┌─────────────────────────────────────────────────────────────┐
│                     VATO DATA ARCHITECTURE                  │
└─────────────────────────────────────────────────────────────┘

         ┌──────────────┐
         │   IDENTITY   │ (PostgreSQL)
         │   DOMAIN     │
         └──────┬───────┘
                │
    ┌───────────┼───────────┐
    │           │           │
┌───▼──┐   ┌───▼──┐   ┌───▼──┐
│CONVO │   │MEMORY│   │KNOWL │
│DOMAIN│   │DOMAIN│   │DOMAIN│
└───┬──┘   └───┬──┘   └───┬──┘
    │          │          │
    └────┬─────┴─────┬────┘
         │           │
    ┌────▼──┐   ┌───▼──┐
    │COGNIT │   │PERSON│
    │DOMAIN │   │DOMAIN│
    └────┬──┘   └───┬──┘
         │          │
         └────┬─────┘
              │
         ┌────▼────┐
         │PROVNCE  │
         │DOMAIN   │
         └────┬────┘
              │
         ┌────▼────┐
         │ SYSTEM  │
         │ DOMAIN  │
         └─────────┘
```

---

## Domain Model Architecture

### Domain 1: IDENTITY DOMAIN

**Purpose**: User identity, authentication, and profile management

**Database**: PostgreSQL (primary), Redis (session cache)

**Core Entities**:

```sql
-- USERS
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE,
    auth_provider VARCHAR(50), -- 'local', 'oauth_google', etc.
    external_auth_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    last_active_at TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    account_tier VARCHAR(20) DEFAULT 'free', -- 'free', 'pro', 'enterprise'
    privacy_mode VARCHAR(20) DEFAULT 'standard' -- 'strict', 'standard', 'permissive'
);

-- USER_PROFILES
CREATE TABLE user_profiles (
    profile_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    display_name VARCHAR(255),
    timezone VARCHAR(50),
    language_preference VARCHAR(10) DEFAULT 'en',
    avatar_url TEXT,
    bio TEXT,
    metadata JSONB, -- Flexible profile data
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- USER_PREFERENCES
CREATE TABLE user_preferences (
    preference_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    category VARCHAR(50), -- 'ui', 'behavior', 'privacy', 'communication'
    key VARCHAR(100),
    value JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, category, key)
);

-- AUTHENTICATION_SESSIONS
CREATE TABLE auth_sessions (
    session_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    session_token VARCHAR(512) UNIQUE NOT NULL,
    device_info JSONB,
    ip_address INET,
    created_at TIMESTAMP DEFAULT NOW(),
    expires_at TIMESTAMP NOT NULL,
    last_accessed_at TIMESTAMP DEFAULT NOW()
);
```

**Graph Extensions (Neo4j)**:

```cypher
// User identity node with relationship tracking
CREATE (u:User {
    user_id: $user_id,
    created_at: datetime()
})

// Track user's evolving interests
CREATE (u)-[:INTERESTED_IN {
    strength: 0.8,
    since: datetime(),
    last_reinforced: datetime()
}]->(topic:Topic)

// Track user's expertise domains
CREATE (u)-[:EXPERT_IN {
    proficiency: 0.7,
    evidence_count: 15
}]->(domain:Domain)
```

---

### Domain 2: CONVERSATION DOMAIN

**Purpose**: Interactive dialogues, messages, and conversational context

**Database**: PostgreSQL (structure), MongoDB (full messages), Redis (active sessions)

**Core Entities**:

```sql
-- CONVERSATIONS (Sessions)
CREATE TABLE conversations (
    conversation_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    title VARCHAR(500), -- Auto-generated or user-set
    mode VARCHAR(50) DEFAULT 'general', -- 'research', 'creative', 'analytical', etc.
    status VARCHAR(20) DEFAULT 'active', -- 'active', 'archived', 'deleted'
    started_at TIMESTAMP DEFAULT NOW(),
    last_message_at TIMESTAMP,
    message_count INTEGER DEFAULT 0,
    context_window_size INTEGER DEFAULT 20,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

-- MESSAGES
CREATE TABLE messages (
    message_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID REFERENCES conversations(conversation_id) ON DELETE CASCADE,
    parent_message_id UUID REFERENCES messages(message_id), -- For threading
    role VARCHAR(20) NOT NULL, -- 'user', 'assistant', 'system', 'tool'
    content TEXT NOT NULL,
    content_hash VARCHAR(64), -- For deduplication
    embedding_id VARCHAR(100), -- Reference to vector store
    intent_classification JSONB, -- Detected intents with probabilities
    emotional_tone JSONB, -- Detected emotions
    tokens_used INTEGER,
    processing_time_ms INTEGER,
    created_at TIMESTAMP DEFAULT NOW(),
    edited_at TIMESTAMP,
    is_deleted BOOLEAN DEFAULT FALSE
);

-- MESSAGE_METADATA
CREATE TABLE message_metadata (
    metadata_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    message_id UUID REFERENCES messages(message_id) ON DELETE CASCADE,
    key VARCHAR(100),
    value JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

-- CONVERSATION_PARTICIPANTS (for multi-user scenarios)
CREATE TABLE conversation_participants (
    participant_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID REFERENCES conversations(conversation_id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    role VARCHAR(20) DEFAULT 'participant', -- 'owner', 'participant', 'viewer'
    joined_at TIMESTAMP DEFAULT NOW(),
    left_at TIMESTAMP,
    UNIQUE(conversation_id, user_id)
);

-- CONVERSATION_TAGS
CREATE TABLE conversation_tags (
    tag_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID REFERENCES conversations(conversation_id) ON DELETE CASCADE,
    tag_name VARCHAR(100),
    auto_generated BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(conversation_id, tag_name)
);
```

**MongoDB Collections**:

```javascript
// Full message documents with rich metadata
db.message_documents.insertOne({
    message_id: "uuid",
    conversation_id: "uuid",
    user_id: "uuid",
    role: "user",
    content: {
        text: "Full message text...",
        attachments: [
            {
                type: "file",
                filename: "document.pdf",
                size: 1024000,
                mime_type: "application/pdf",
                storage_reference: "s3://..."
            }
        ],
        formatting: {
            markdown: true,
            code_blocks: [...]
        }
    },
    analysis: {
        intent: {
            primary: "information_seeking",
            secondary: ["comparison", "analysis"],
            confidence: 0.92
        },
        emotion: {
            primary: "curious",
            intensity: 0.7,
            valence: 0.5 // -1 to 1
        },
        entities_mentioned: [
            {entity: "AI", type: "technology"},
            {entity: "Python", type: "programming_language"}
        ],
        topics: ["machine_learning", "software_engineering"]
    },
    context: {
        session_duration_minutes: 45,
        message_position: 12,
        time_since_last_message_seconds: 120,
        device_type: "desktop"
    },
    created_at: ISODate("2025-01-15T10:30:00Z")
})
```

**Graph Relationships (Neo4j)**:

```cypher
// Conversation flow and topic evolution
CREATE (c:Conversation {
    conversation_id: $conversation_id,
    started_at: datetime()
})

CREATE (m:Message {
    message_id: $message_id,
    role: "user",
    timestamp: datetime()
})-[:IN_CONVERSATION]->(c)

// Topic transitions
CREATE (m1:Message)-[:TRANSITIONS_TO {
    topic_shift: "gradual",
    similarity_score: 0.75
}]->(m2:Message)

// Reference relationships
CREATE (m1)-[:REFERENCES {
    reference_type: "callback",
    distance_messages: 5
}]->(m2)
```

---

### Domain 3: MEMORY DOMAIN

**Purpose**: Cognitive memory system (working, episodic, semantic, procedural)

**Database**: Neo4j (primary), Qdrant (embeddings), Redis (working memory)

**Core Entities**:

```sql
-- MEMORY_ENTRIES (PostgreSQL metadata)
CREATE TABLE memory_entries (
    memory_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    memory_type VARCHAR(20) NOT NULL, -- 'episodic', 'semantic', 'procedural', 'working'
    content_summary TEXT,
    importance_score FLOAT DEFAULT 0.5, -- 0.0 to 1.0
    access_count INTEGER DEFAULT 0,
    last_accessed_at TIMESTAMP,
    consolidation_status VARCHAR(20) DEFAULT 'raw', -- 'raw', 'consolidated', 'archived'
    decay_rate FLOAT DEFAULT 0.01,
    reinforcement_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    expires_at TIMESTAMP -- For working memory cleanup
);

-- MEMORY_ASSOCIATIONS
CREATE TABLE memory_associations (
    association_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    memory_id UUID REFERENCES memory_entries(memory_id) ON DELETE CASCADE,
    associated_entity_type VARCHAR(50), -- 'conversation', 'document', 'concept', 'person'
    associated_entity_id UUID,
    association_strength FLOAT DEFAULT 0.5,
    association_type VARCHAR(50), -- 'causal', 'temporal', 'semantic', 'emotional'
    created_at TIMESTAMP DEFAULT NOW()
);

-- MEMORY_IMPORTANCE_FACTORS
CREATE TABLE memory_importance_factors (
    factor_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    memory_id UUID REFERENCES memory_entries(memory_id) ON DELETE CASCADE,
    factor_name VARCHAR(50), -- 'recency', 'frequency', 'emotional_weight', 'user_marked'
    factor_value FLOAT,
    factor_weight FLOAT,
    calculated_at TIMESTAMP DEFAULT NOW()
);
```

**Graph Model (Neo4j)**:

```cypher
// EPISODIC MEMORY - Specific experiences
CREATE (em:EpisodicMemory {
    memory_id: $memory_id,
    user_id: $user_id,
    event_description: "User discussed project architecture",
    timestamp: datetime(),
    importance: 0.8,
    emotional_valence: 0.6,
    consolidation_level: "consolidated"
})

// Link to conversation
CREATE (em)-[:FROM_CONVERSATION {
    conversation_id: $conversation_id,
    message_range: [1, 15]
}]->(c:Conversation)

// SEMANTIC MEMORY - Learned concepts
CREATE (sm:SemanticMemory {
    memory_id: $memory_id,
    user_id: $user_id,
    concept_name: "Neural Networks",
    definition: "...",
    understanding_level: 0.75,
    source_count: 5,
    last_reinforced: datetime()
})

// Concept relationships
CREATE (sm1:SemanticMemory)-[:IS_A {
    confidence: 0.9
}]->(sm2:SemanticMemory)

CREATE (sm1)-[:RELATED_TO {
    relation_type: "applies_to",
    strength: 0.7
}]->(sm3:SemanticMemory)

// PROCEDURAL MEMORY - How to do things
CREATE (pm:ProceduralMemory {
    memory_id: $memory_id,
    user_id: $user_id,
    procedure_name: "Deploy to production",
    steps: ["Build", "Test", "Deploy", "Monitor"],
    success_count: 10,
    failure_count: 2,
    last_executed: datetime(),
    optimization_level: 0.8
})

// Memory consolidation relationships
CREATE (wm:WorkingMemory)-[:CONSOLIDATES_INTO {
    consolidation_date: datetime(),
    trigger: "sleep_cycle"
}]->(em:EpisodicMemory)

// Memory decay tracking
CREATE (em)-[:DECAYS_TO {
    half_life_days: 30,
    last_decay_calculation: datetime()
}]->(sm:SemanticMemory)
```

**Vector Store (Qdrant)**:

```python
# Memory vector schema
{
    "collection_name": "memory_embeddings",
    "vectors": {
        "size": 1536,
        "distance": "Cosine"
    },
    "payload_schema": {
        "memory_id": "uuid",
        "user_id": "uuid",
        "memory_type": "keyword",
        "timestamp": "datetime",
        "importance_score": "float",
        "access_count": "integer",
        "content_summary": "text",
        "tags": ["keyword"]
    }
}
```

---

### Domain 4: KNOWLEDGE DOMAIN

**Purpose**: User documents, citations, and knowledge base

**Database**: PostgreSQL (metadata), Qdrant (document embeddings), S3/MinIO (files)

**Core Entities**:

```sql
-- DOCUMENTS
CREATE TABLE documents (
    document_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    title VARCHAR(500),
    document_type VARCHAR(50), -- 'pdf', 'audio', 'image', 'text', 'webpage'
    mime_type VARCHAR(100),
    file_size_bytes BIGINT,
    storage_path TEXT NOT NULL,
    checksum VARCHAR(64) UNIQUE, -- For deduplication
    upload_source VARCHAR(50), -- 'upload', 'import', 'web_clip'
    processing_status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed'
    index_status VARCHAR(20) DEFAULT 'pending',
    language VARCHAR(10),
    page_count INTEGER,
    word_count INTEGER,
    created_at TIMESTAMP DEFAULT NOW(),
    processed_at TIMESTAMP,
    last_accessed_at TIMESTAMP,
    access_count INTEGER DEFAULT 0
);

-- DOCUMENT_METADATA
CREATE TABLE document_metadata (
    metadata_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID REFERENCES documents(document_id) ON DELETE CASCADE,
    key VARCHAR(100),
    value TEXT,
    value_type VARCHAR(20) DEFAULT 'string', -- 'string', 'number', 'date', 'json'
    extracted BOOLEAN DEFAULT FALSE, -- Auto-extracted vs. user-added
    created_at TIMESTAMP DEFAULT NOW()
);

-- DOCUMENT_CHUNKS
CREATE TABLE document_chunks (
    chunk_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID REFERENCES documents(document_id) ON DELETE CASCADE,
    chunk_index INTEGER, -- Position in document
    content TEXT NOT NULL,
    content_hash VARCHAR(64),
    embedding_id VARCHAR(100), -- Reference to vector store
    token_count INTEGER,
    page_number INTEGER,
    start_char INTEGER,
    end_char INTEGER,
    chunk_type VARCHAR(20) DEFAULT 'text', -- 'text', 'table', 'image_caption', 'code'
    metadata JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(document_id, chunk_index)
);

-- DOCUMENT_RELATIONSHIPS
CREATE TABLE document_relationships (
    relationship_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_document_id UUID REFERENCES documents(document_id) ON DELETE CASCADE,
    target_document_id UUID REFERENCES documents(document_id) ON DELETE CASCADE,
    relationship_type VARCHAR(50), -- 'cites', 'version_of', 'related_to', 'supersedes'
    confidence FLOAT,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

-- DOCUMENT_TAGS
CREATE TABLE document_tags (
    tag_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID REFERENCES documents(document_id) ON DELETE CASCADE,
    tag_name VARCHAR(100),
    auto_generated BOOLEAN DEFAULT FALSE,
    confidence FLOAT,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(document_id, tag_name)
);

-- COLLECTIONS (Document grouping)
CREATE TABLE collections (
    collection_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    color VARCHAR(20),
    icon VARCHAR(50),
    is_private BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- COLLECTION_DOCUMENTS
CREATE TABLE collection_documents (
    collection_id UUID REFERENCES collections(collection_id) ON DELETE CASCADE,
    document_id UUID REFERENCES documents(document_id) ON DELETE CASCADE,
    added_at TIMESTAMP DEFAULT NOW(),
    added_by UUID REFERENCES users(user_id),
    PRIMARY KEY (collection_id, document_id)
);
```

**Graph Model (Neo4j)**:

```cypher
// Document knowledge graph
CREATE (d:Document {
    document_id: $document_id,
    title: "Machine Learning Paper",
    created_at: datetime()
})

// Extracted entities
CREATE (e:Entity {
    entity_id: $entity_id,
    name: "Neural Networks",
    entity_type: "concept",
    confidence: 0.95
})

CREATE (d)-[:CONTAINS_ENTITY {
    mention_count: 15,
    prominence: 0.8
}]->(e)

// Concept relationships within documents
CREATE (e1:Entity)-[:DEFINED_AS {
    definition: "...",
    source_page: 3
}]->(e2:Entity)

// Cross-document concept tracking
CREATE (d1:Document)-[:SHARES_CONCEPT {
    concept: "deep_learning",
    overlap_score: 0.7
}]->(d2:Document)

// Citation tracking
CREATE (d1)-[:CITES {
    citation_type: "direct",
    page_number: 12,
    relevance: 0.9
}]->(d2)
```

**Vector Store (Qdrant)**:

```python
# Document chunk embeddings
{
    "collection_name": "document_chunks",
    "vectors": {
        "size": 1536,
        "distance": "Cosine"
    },
    "payload_schema": {
        "chunk_id": "uuid",
        "document_id": "uuid",
        "user_id": "uuid",
        "chunk_index": "integer",
        "document_title": "text",
        "document_type": "keyword",
        "page_number": "integer",
        "content_summary": "text",
        "created_at": "datetime",
        "tags": ["keyword"]
    }
}
```

---

### Domain 5: COGNITION DOMAIN

**Purpose**: Agentic reasoning, task execution, and decision-making

**Database**: PostgreSQL (tasks/executions), Neo4j (reasoning graphs), MongoDB (logs)

**Core Entities**:

```sql
-- AGENTS
CREATE TABLE agents (
    agent_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_name VARCHAR(100) UNIQUE NOT NULL,
    agent_type VARCHAR(50), -- 'search', 'rag', 'creative', 'analytical', 'code'
    capabilities JSONB, -- List of capabilities
    model_provider VARCHAR(50),
    model_name VARCHAR(100),
    configuration JSONB,
    status VARCHAR(20) DEFAULT 'active', -- 'active', 'inactive', 'maintenance'
    version VARCHAR(20),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- TASKS
CREATE TABLE tasks (
    task_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    conversation_id UUID REFERENCES conversations(conversation_id),
    message_id UUID REFERENCES messages(message_id),
    task_type VARCHAR(50), -- 'search', 'analyze', 'generate', 'synthesize'
    description TEXT,
    intent_classification JSONB,
    priority VARCHAR(20) DEFAULT 'medium', -- 'low', 'medium', 'high', 'urgent'
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'queued', 'executing', 'completed', 'failed'
    assigned_agent_id UUID REFERENCES agents(agent_id),
    parent_task_id UUID REFERENCES tasks(task_id), -- For subtasks
    dependencies JSONB, -- Array of task_ids that must complete first
    created_at TIMESTAMP DEFAULT NOW(),
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    timeout_at TIMESTAMP
);

-- TASK_EXECUTIONS
CREATE TABLE task_executions (
    execution_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id UUID REFERENCES tasks(task_id) ON DELETE CASCADE,
    agent_id UUID REFERENCES agents(agent_id),
    execution_order INTEGER, -- For retry tracking
    input_data JSONB,
    output_data JSONB,
    execution_time_ms INTEGER,
    tokens_used INTEGER,
    cost_estimate DECIMAL(10, 6),
    status VARCHAR(20), -- 'success', 'partial', 'failure'
    error_message TEXT,
    started_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP
);

-- REASONING_CHAINS
CREATE TABLE reasoning_chains (
    chain_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id UUID REFERENCES tasks(task_id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(user_id),
    chain_type VARCHAR(50), -- 'sequential', 'parallel', 'conditional', 'iterative'
    steps JSONB, -- Array of reasoning steps
    conclusion TEXT,
    confidence_score FLOAT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- AGENT_COMMUNICATIONS
CREATE TABLE agent_communications (
    communication_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_agent_id UUID REFERENCES agents(agent_id),
    receiver_agent_id UUID REFERENCES agents(agent_id),
    task_id UUID REFERENCES tasks(task_id),
    message_type VARCHAR(50), -- 'request', 'response', 'broadcast', 'coordination'
    content JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

-- TOOL_REGISTRY
CREATE TABLE tool_registry (
    tool_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tool_name VARCHAR(100) UNIQUE NOT NULL,
    tool_type VARCHAR(50), -- 'api', 'function', 'plugin'
    description TEXT,
    input_schema JSONB,
    output_schema JSONB,
    agent_compatibility JSONB, -- Which agents can use this tool
    configuration JSONB,
    rate_limit_per_minute INTEGER,
    is_enabled BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- TOOL_USAGE
CREATE TABLE tool_usage (
    usage_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tool_id UUID REFERENCES tool_registry(tool_id),
    agent_id UUID REFERENCES agents(agent_id),
    task_id UUID REFERENCES tasks(task_id),
    execution_id UUID REFERENCES task_executions(execution_id),
    input_parameters JSONB,
    output_result JSONB,
    success BOOLEAN,
    execution_time_ms INTEGER,
    created_at TIMESTAMP DEFAULT NOW()
);
```

**Graph Model (Neo4j)**:

```cypher
// Reasoning graph
CREATE (t:Task {
    task_id: $task_id,
    description: "Analyze document and compare with web results",
    created_at: datetime()
})

CREATE (a:Agent {
    agent_id: $agent_id,
    name: "RAG Agent"
})-[:EXECUTES]->(t)

// Reasoning steps as nodes
CREATE (r1:ReasoningStep {
    step_id: $step_id,
    step_type: "retrieve",
    description: "Retrieve relevant document chunks",
    confidence: 0.9
})-[:STEP_OF]->(t)

CREATE (r2:ReasoningStep {
    step_id: $step_id_2,
    step_type: "synthesize",
    description: "Combine document and web info"
})-[:STEP_OF]->(t)

// Step dependencies
CREATE (r1)-[:PRECEDES {
    required: true
}]->(r2)

// Agent collaboration
CREATE (a1:Agent)-[:COLLABORATES_WITH {
    task_id: $task_id,
    coordination_type: "sequential"
}]->(a2:Agent)

// Decision trees
CREATE (d:Decision {
    decision_id: $decision_id,
    question: "Is information sufficient?",
    criteria: {...}
})-[:IN_CHAIN]->(t)

CREATE (d)-[:IF_TRUE]->(r_continue:ReasoningStep)
CREATE (d)-[:IF_FALSE]->(r_search_more:ReasoningStep)
```

**MongoDB Collections**:

```javascript
// Detailed execution logs
db.execution_logs.insertOne({
    execution_id: "uuid",
    task_id: "uuid",
    agent_id: "uuid",
    execution_trace: [
        {
            timestamp: ISODate(),
            event: "started",
            context: {...}
        },
        {
            timestamp: ISODate(),
            event: "tool_call",
            tool_name: "search_web",
            parameters: {...},
            result: {...}
        },
        {
            timestamp: ISODate(),
            event: "llm_call",
            model: "gpt-4-turbo",
            prompt_tokens: 1500,
            completion_tokens: 800,
            cost: 0.042
        },
        {
            timestamp: ISODate(),
            event: "completed",
            result_summary: "..."
        }
    ],
    performance_metrics: {
        total_time_ms: 3450,
        llm_time_ms: 2100,
        tool_time_ms: 1200,
        overhead_ms: 150
    },
    created_at: ISODate()
})
```

---

### Domain 6: PERSONA DOMAIN

**Purpose**: Adaptive modes, personalities, and behavioral profiles

**Database**: PostgreSQL (configurations), Neo4j (behavioral graphs)

**Core Entities**:

```sql
-- MODES
CREATE TABLE modes (
    mode_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mode_name VARCHAR(50) UNIQUE NOT NULL, -- 'research', 'creative', 'analytical', etc.
    display_name VARCHAR(100),
    description TEXT,
    icon VARCHAR(50),
    color VARCHAR(20),
    is_system_mode BOOLEAN DEFAULT TRUE, -- vs. user-created
    configuration JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

-- MODE_CONFIGURATIONS
CREATE TABLE mode_configurations (
    config_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mode_id UUID REFERENCES modes(mode_id) ON DELETE CASCADE,
    parameter_name VARCHAR(100), -- 'temperature', 'max_tokens', 'tone', etc.
    parameter_value JSONB,
    parameter_type VARCHAR(20), -- 'llm', 'behavior', 'ui'
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(mode_id, parameter_name)
);

-- USER_MODE_PREFERENCES
CREATE TABLE user_mode_preferences (
    preference_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    mode_id UUID REFERENCES modes(mode_id),
    is_favorite BOOLEAN DEFAULT FALSE,
    customizations JSONB,
    usage_count INTEGER DEFAULT 0,
    last_used_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, mode_id)
);

-- MODE_TRIGGERS
CREATE TABLE mode_triggers (
    trigger_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mode_id UUID REFERENCES modes(mode_id) ON DELETE CASCADE,
    trigger_type VARCHAR(50), -- 'keyword', 'intent', 'emotional', 'temporal', 'contextual'
    trigger_pattern JSONB, -- Pattern matching rules
    confidence_threshold FLOAT DEFAULT 0.7,
    priority INTEGER DEFAULT 50,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- BEHAVIORAL_PROFILES
CREATE TABLE behavioral_profiles (
    profile_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    profile_type VARCHAR(50), -- 'communication', 'learning', 'decision_making'
    detected_traits JSONB,
    confidence_scores JSONB,
    evidence_count INTEGER DEFAULT 0,
    last_updated_at TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW()
);

-- COMMUNICATION_STYLES
CREATE TABLE communication_styles (
    style_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    style_dimension VARCHAR(50), -- 'formality', 'verbosity', 'technicality', 'directness'
    style_value FLOAT, -- -1.0 to 1.0 (e.g., -1.0 = very informal, 1.0 = very formal)
    confidence FLOAT,
    sample_size INTEGER,
    last_calculated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, style_dimension)
);
```

**Graph Model (Neo4j)**:

```cypher
// Mode activation patterns
CREATE (u:User {user_id: $user_id})
CREATE (m:Mode {
    mode_id: $mode_id,
    name: "Research"
})

CREATE (u)-[:PREFERS_MODE {
    frequency: 0.6,
    avg_session_length_minutes: 45,
    typical_time_of_day: ["morning", "afternoon"]
}]->(m)

// Mode transitions
CREATE (m1:Mode)-[:TRANSITIONS_TO {
    transition_probability: 0.3,
    typical_trigger: "frustration",
    avg_transition_time_minutes: 5
}]->(m2:Mode)

// Behavioral trait network
CREATE (u)-[:EXHIBITS_TRAIT {
    trait: "detail_oriented",
    strength: 0.8,
    consistency: 0.9,
    evidence_count: 50
}]->(bp:BehavioralProfile)

// Context-mode mapping
CREATE (ctx:Context {
    context_type: "time_of_day",
    value: "late_night"
})-[:SUGGESTS_MODE {
    probability: 0.7
}]->(m:Mode {name: "Dark Intelligence"})
```

---

### Domain 7: PROVENANCE DOMAIN

**Purpose**: Citation tracking, source attribution, and reasoning transparency

**Database**: PostgreSQL (citations), Neo4j (provenance chains)

**Core Entities**:

```sql
-- SOURCES
CREATE TABLE sources (
    source_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_type VARCHAR(50), -- 'document', 'web', 'memory', 'knowledge_base'
    source_reference TEXT, -- Document ID, URL, memory ID, etc.
    title VARCHAR(500),
    author VARCHAR(255),
    publication_date DATE,
    url TEXT,
    reliability_score FLOAT, -- 0.0 to 1.0
    verification_status VARCHAR(20) DEFAULT 'unverified', -- 'verified', 'unverified', 'disputed'
    created_at TIMESTAMP DEFAULT NOW()
);

-- CITATIONS
CREATE TABLE citations (
    citation_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    message_id UUID REFERENCES messages(message_id) ON DELETE CASCADE,
    source_id UUID REFERENCES sources(source_id),
    citation_type VARCHAR(50), -- 'direct_quote', 'paraphrase', 'reference', 'inspiration'
    cited_text TEXT,
    context_before TEXT,
    context_after TEXT,
    page_number INTEGER,
    confidence_score FLOAT,
    character_start INTEGER,
    character_end INTEGER,
    created_at TIMESTAMP DEFAULT NOW()
);

-- CLAIM_VERIFICATION
CREATE TABLE claim_verification (
    verification_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    message_id UUID REFERENCES messages(message_id),
    claim_text TEXT,
    verification_status VARCHAR(20), -- 'verified', 'partially_verified', 'unverified', 'disputed'
    supporting_sources JSONB, -- Array of source_ids
    contradicting_sources JSONB,
    confidence_score FLOAT,
    verification_method VARCHAR(50), -- 'automatic', 'manual', 'user_feedback'
    verified_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

-- REASONING_PROVENANCE
CREATE TABLE reasoning_provenance (
    provenance_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id UUID REFERENCES tasks(task_id),
    reasoning_step_index INTEGER,
    information_sources JSONB, -- Array of source_ids used in this step
    assumptions JSONB,
    logical_operators JSONB, -- 'and', 'or', 'if-then', 'because'
    confidence_contribution FLOAT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- INFLUENCE_TRACKING
CREATE TABLE influence_tracking (
    influence_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    output_entity_id UUID, -- Message, task result, etc.
    output_entity_type VARCHAR(50),
    input_source_id UUID REFERENCES sources(source_id),
    influence_strength FLOAT, -- 0.0 to 1.0
    influence_type VARCHAR(50), -- 'direct', 'indirect', 'contextual'
    created_at TIMESTAMP DEFAULT NOW()
);
```

**Graph Model (Neo4j)**:

```cypher
// Provenance chain
CREATE (m:Message {
    message_id: $message_id,
    content: "Neural networks are inspired by biological neurons..."
})

CREATE (s1:Source {
    source_id: $source_id_1,
    type: "document",
    title: "Neural Network Fundamentals"
})

CREATE (s2:Source {
    source_id: $source_id_2,
    type: "web",
    url: "https://..."
})

// Direct citations
CREATE (m)-[:CITES {
    citation_type: "direct_quote",
    confidence: 0.95,
    page: 12
}]->(s1)

// Indirect influence
CREATE (m)-[:INFLUENCED_BY {
    influence_type: "contextual",
    strength: 0.6
}]->(s2)

// Provenance chain through reasoning
CREATE (r:ReasoningStep)-[:USES_INFORMATION]->(s1)
CREATE (r)-[:PRODUCES]->(m)

// Multi-hop provenance
CREATE (s1)-[:DERIVED_FROM {
    transformation: "summary"
}]->(s3:Source)

// Confidence propagation
CREATE (s1)-[:SUPPORTS_CLAIM {
    claim: "...",
    support_strength: 0.8
}]->(c:Claim)

CREATE (s2)-[:CONTRADICTS_CLAIM {
    contradiction_strength: 0.3
}]->(c)
```

---

### Domain 8: SYSTEM DOMAIN

**Purpose**: Configuration, monitoring, auditing, and operations

**Database**: PostgreSQL (primary), MongoDB (logs), InfluxDB/Prometheus (metrics)

**Core Entities**:

```sql
-- SYSTEM_CONFIGURATION
CREATE TABLE system_configuration (
    config_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    config_key VARCHAR(100) UNIQUE NOT NULL,
    config_value JSONB,
    config_type VARCHAR(50), -- 'llm', 'database', 'security', 'feature_flag'
    environment VARCHAR(20) DEFAULT 'production', -- 'development', 'staging', 'production'
    is_sensitive BOOLEAN DEFAULT FALSE,
    last_modified_by UUID REFERENCES users(user_id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- AUDIT_LOGS
CREATE TABLE audit_logs (
    log_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id),
    action VARCHAR(100), -- 'login', 'delete_document', 'change_setting'
    resource_type VARCHAR(50),
    resource_id UUID,
    action_details JSONB,
    ip_address INET,
    user_agent TEXT,
    result VARCHAR(20), -- 'success', 'failure'
    created_at TIMESTAMP DEFAULT NOW()
);

-- ERROR_LOGS
CREATE TABLE error_logs (
    error_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id),
    error_type VARCHAR(50),
    error_message TEXT,
    stack_trace TEXT,
    context JSONB,
    severity VARCHAR(20), -- 'low', 'medium', 'high', 'critical'
    resolved BOOLEAN DEFAULT FALSE,
    resolved_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

-- FEATURE_FLAGS
CREATE TABLE feature_flags (
    flag_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    flag_name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    is_enabled BOOLEAN DEFAULT FALSE,
    rollout_percentage INTEGER DEFAULT 0, -- 0-100 for gradual rollout
    target_users JSONB, -- Array of user_ids for selective enabling
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- USAGE_METRICS
CREATE TABLE usage_metrics (
    metric_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id),
    metric_type VARCHAR(50), -- 'api_call', 'message_sent', 'document_uploaded'
    metric_value NUMERIC,
    metric_unit VARCHAR(20),
    metadata JSONB,
    recorded_at TIMESTAMP DEFAULT NOW()
);

-- RATE_LIMITS
CREATE TABLE rate_limits (
    limit_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id),
    resource_type VARCHAR(50), -- 'messages', 'api_calls', 'document_uploads'
    limit_value INTEGER,
    limit_period VARCHAR(20), -- 'minute', 'hour', 'day', 'month'
    current_usage INTEGER DEFAULT 0,
    reset_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

-- MODEL_VERSIONS
CREATE TABLE model_versions (
    version_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_name VARCHAR(100),
    version VARCHAR(50),
    provider VARCHAR(50),
    capabilities JSONB,
    cost_per_1k_input_tokens DECIMAL(10, 6),
    cost_per_1k_output_tokens DECIMAL(10, 6),
    max_context_window INTEGER,
    is_active BOOLEAN DEFAULT TRUE,
    deployed_at TIMESTAMP DEFAULT NOW()
);

-- PERFORMANCE_BENCHMARKS
CREATE TABLE performance_benchmarks (
    benchmark_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    component_name VARCHAR(100),
    operation_type VARCHAR(50),
    avg_latency_ms INTEGER,
    p95_latency_ms INTEGER,
    p99_latency_ms INTEGER,
    throughput_per_second NUMERIC,
    error_rate FLOAT,
    measured_at TIMESTAMP DEFAULT NOW()
);
```

---

## Cross-Domain Relationships

### Key Integration Points

```
USER (Identity Domain)
  ├── has many → CONVERSATIONS (Conversation Domain)
  ├── has many → DOCUMENTS (Knowledge Domain)
  ├── has many → MEMORY_ENTRIES (Memory Domain)
  ├── creates → TASKS (Cognition Domain)
  └── has → BEHAVIORAL_PROFILE (Persona Domain)

CONVERSATION (Conversation Domain)
  ├── contains many → MESSAGES
  ├── triggers → TASKS (Cognition Domain)
  ├── creates → MEMORY_ENTRIES (Memory Domain)
  └── references → DOCUMENTS (Knowledge Domain)

MESSAGE (Conversation Domain)
  ├── has many → CITATIONS (Provenance Domain)
  ├── creates → TASKS (Cognition Domain)
  ├── consolidates into → MEMORY_ENTRIES (Memory Domain)
  └── is analyzed by → AGENTS (Cognition Domain)

DOCUMENT (Knowledge Domain)
  ├── is chunked into → DOCUMENT_CHUNKS
  ├── is cited in → CITATIONS (Provenance Domain)
  ├── influences → MEMORY_ENTRIES (Memory Domain)
  └── is processed by → TASKS (Cognition Domain)

TASK (Cognition Domain)
  ├── executed by → AGENT
  ├── uses → DOCUMENTS (Knowledge Domain)
  ├── uses → MEMORY_ENTRIES (Memory Domain)
  ├── creates → CITATIONS (Provenance Domain)
  └── follows → MODE_CONFIGURATION (Persona Domain)

MEMORY_ENTRY (Memory Domain)
  ├── belongs to → USER (Identity Domain)
  ├── derived from → CONVERSATION (Conversation Domain)
  ├── references → DOCUMENTS (Knowledge Domain)
  └── has → PROVENANCE (Provenance Domain)

MODE (Persona Domain)
  ├── configured for → USER
  ├── activates in → CONVERSATION
  ├── influences → TASK execution
  └── adapts based on → BEHAVIORAL_PROFILE
```

---

## Implementation Strategy

### Phase 1: Foundation (Months 1-2)
**Focus**: Core domains that enable basic functionality

**Databases to Deploy**:
- PostgreSQL (Identity, Conversation basics)
- Redis (Session management)

**Domains to Implement**:
1. Identity Domain (complete)
2. Conversation Domain (basic messages, sessions)
3. System Domain (basic configuration, audit logs)

**Deliverables**:
- User authentication working
- Basic chat functionality
- Session persistence

---

### Phase 2: Knowledge & Memory (Months 3-4)
**Focus**: Document processing and memory system

**Databases to Deploy**:
- Qdrant (Vector embeddings)
- Neo4j (Graph relationships)
- S3/MinIO (File storage)

**Domains to Implement**:
1. Knowledge Domain (documents, chunks, embeddings)
2. Memory Domain (working memory, episodic memory basics)
3. Provenance Domain (basic citations)

**Deliverables**:
- Document upload and processing
- Basic RAG functionality
- Simple citation system
- Session memory working

---

### Phase 3: Cognition & Agents (Months 5-6)
**Focus**: Multi-agent orchestration and reasoning

**Databases to Deploy**:
- MongoDB (Execution logs)

**Domains to Implement**:
1. Cognition Domain (agents, tasks, reasoning)
2. Enhanced Provenance Domain (reasoning chains)

**Deliverables**:
- Multiple agents operational
- Task orchestration working
- Complex query handling
- Reasoning transparency

---

### Phase 4: Personalization (Months 7-8)
**Focus**: Adaptive modes and behavioral learning

**Domains to Implement**:
1. Persona Domain (modes, behavioral profiles)
2. Enhanced Memory Domain (semantic memory, consolidation)

**Deliverables**:
- Mode detection and switching
- Behavioral profiling
- Personalized responses
- Advanced memory consolidation

---

### Phase 5: Optimization & Scale (Months 9+)
**Focus**: Performance, monitoring, and production readiness

**Databases to Deploy**:
- InfluxDB/Prometheus (Metrics)

**All Domains**:
- Query optimization
- Caching strategies
- Monitoring dashboards
- Cost optimization
- Security hardening

**Deliverables**:
- Production-ready system
- Comprehensive monitoring
- Automated scaling
- Full documentation

---

## Database Access Patterns

### High-Frequency Operations (< 100ms target)
```sql
-- Active conversation context retrieval
SELECT * FROM messages 
WHERE conversation_id = $1 
ORDER BY created_at DESC 
LIMIT 20;

-- User session validation
SELECT * FROM auth_sessions 
WHERE session_token = $1 AND expires_at > NOW();

-- Working memory access (Redis)
GET working_memory:{user_id}
```

### Medium-Frequency Operations (< 500ms target)
```sql
-- Document chunk retrieval (Vector + SQL)
-- 1. Vector search in Qdrant
-- 2. Fetch metadata from PostgreSQL

-- Memory consolidation (Background job)
-- 1. Analyze working memory
-- 2. Calculate importance scores
-- 3. Create memory entries
-- 4. Update graph relationships
```

### Low-Frequency Operations (< 2s target)
```sql
-- Complex graph traversal
MATCH (u:User)-[:HAS_MEMORY]->(m:Memory)
      -[:RELATES_TO*1..3]->(related:Memory)
WHERE u.user_id = $user_id
RETURN related, relationship_chain;

-- Cross-domain analytics
-- Aggregate usage across multiple domains
```

---

## Data Privacy & Compliance

### GDPR Compliance Strategy

**Right to Access**:
```sql
-- Single query to extract all user data
SELECT * FROM get_all_user_data($user_id);
-- Returns JSON with all domains
```

**Right to Deletion**:
```sql
-- Cascading deletion with proper foreign keys
DELETE FROM users WHERE user_id = $user_id;
-- Triggers cascade across all domains

-- Background job to:
-- 1. Remove vector embeddings
-- 2. Clear graph nodes
-- 3. Delete S3 files
-- 4. Anonymize audit logs
```

**Data Minimization**:
- TTL on working memory (Redis)
- Automatic archival of old conversations
- Importance-based memory pruning

**Encryption**:
- At-rest: PostgreSQL TDE, S3 encryption
- In-transit: TLS 1.3 everywhere
- Sensitive fields: Application-level encryption

---

## Conclusion

This domain-driven architecture provides:

1. **Clear Separation of Concerns**: Each domain has specific responsibilities
2. **Polyglot Persistence**: Right database for each use case
3. **Scalability**: Domains can scale independently
4. **Maintainability**: Changes isolated to specific domains
5. **Flexibility**: Easy to add new domains or modify existing ones
6. **Privacy by Design**: Clear data boundaries for compliance
7. **Auditability**: Complete tracking across all operations

The Double Diamond approach ensured:
- **Discover**: Comprehensive exploration of all data needs
- **Define**: Clear problem statement and requirements
- **Develop**: Multiple solution approaches considered
- **Deliver**: Concrete, implementable architecture

This architecture supports the VATO system's goals of creating truly intelligent, adaptive, and transparent AI assistants.
