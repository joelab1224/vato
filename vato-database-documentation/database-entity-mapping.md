# VATO Database Entity Mapping
## Complete Entity Overview Across All Databases

---

## Table of Contents

1. [Database Overview](#database-overview)
2. [PostgreSQL Entities](#postgresql-entities)
3. [Neo4j Entities](#neo4j-entities)
4. [Qdrant Collections](#qdrant-collections)
5. [Redis Keys](#redis-keys)
6. [MongoDB Collections](#mongodb-collections)
7. [S3/MinIO Buckets](#s3minio-buckets)
8. [Entity Count Summary](#entity-count-summary)

---

## Database Overview

```
┌────────────────────────────────────────────────────────────┐
│                  VATO DATA ARCHITECTURE                    │
│                   Database Distribution                     │
└────────────────────────────────────────────────────────────┘

PostgreSQL (48 tables)
├── Identity Domain (4 tables)
├── Conversation Domain (5 tables)
├── Memory Domain (3 tables)
├── Knowledge Domain (8 tables)
├── Cognition Domain (9 tables)
├── Persona Domain (5 tables)
├── Provenance Domain (5 tables)
└── System Domain (9 tables)

Neo4j (27 node types, 40+ relationship types)
├── Identity Domain (3 nodes)
├── Conversation Domain (3 nodes)
├── Memory Domain (5 nodes)
├── Knowledge Domain (4 nodes)
├── Cognition Domain (6 nodes)
├── Persona Domain (4 nodes)
└── Provenance Domain (2 nodes)

Qdrant (3 collections)
├── Memory Domain (1 collection)
└── Knowledge Domain (2 collections)

Redis (8 key patterns)
├── Identity Domain (1 pattern)
├── Conversation Domain (2 patterns)
├── Memory Domain (1 pattern)
├── Cognition Domain (2 patterns)
└── System Domain (2 patterns)

MongoDB (4 collections)
├── Conversation Domain (1 collection)
├── Cognition Domain (2 collections)
└── System Domain (1 collection)

S3/MinIO (3 buckets)
└── Knowledge Domain (3 buckets)
```

---

## PostgreSQL Entities

### Schema: `identity_domain`

**Tables (4):**
1. `users`
2. `user_profiles`
3. `user_preferences`
4. `auth_sessions`

---

### Schema: `conversation_domain`

**Tables (5):**
1. `conversations`
2. `messages`
3. `message_metadata`
4. `conversation_participants`
5. `conversation_tags`

---

### Schema: `memory_domain`

**Tables (3):**
1. `memory_entries`
2. `memory_associations`
3. `memory_importance_factors`

---

### Schema: `knowledge_domain`

**Tables (8):**
1. `documents`
2. `document_metadata`
3. `document_chunks`
4. `document_relationships`
5. `document_tags`
6. `collections`
7. `collection_documents`
8. `document_processing_queue`

---

### Schema: `cognition_domain`

**Tables (9):**
1. `agents`
2. `tasks`
3. `task_executions`
4. `reasoning_chains`
5. `agent_communications`
6. `tool_registry`
7. `tool_usage`
8. `task_dependencies`
9. `agent_performance_metrics`

---

### Schema: `persona_domain`

**Tables (5):**
1. `modes`
2. `mode_configurations`
3. `user_mode_preferences`
4. `mode_triggers`
5. `behavioral_profiles`
6. `communication_styles`

---

### Schema: `provenance_domain`

**Tables (5):**
1. `sources`
2. `citations`
3. `claim_verification`
4. `reasoning_provenance`
5. `influence_tracking`

---

### Schema: `system_domain`

**Tables (9):**
1. `system_configuration`
2. `audit_logs`
3. `error_logs`
4. `feature_flags`
5. `usage_metrics`
6. `rate_limits`
7. `model_versions`
8. `performance_benchmarks`
9. `api_keys`

---

### PostgreSQL Entity Summary

**Total Tables: 48**

```
identity_domain (4)
├── users
├── user_profiles
├── user_preferences
└── auth_sessions

conversation_domain (5)
├── conversations
├── messages
├── message_metadata
├── conversation_participants
└── conversation_tags

memory_domain (3)
├── memory_entries
├── memory_associations
└── memory_importance_factors

knowledge_domain (8)
├── documents
├── document_metadata
├── document_chunks
├── document_relationships
├── document_tags
├── collections
├── collection_documents
└── document_processing_queue

cognition_domain (9)
├── agents
├── tasks
├── task_executions
├── reasoning_chains
├── agent_communications
├── tool_registry
├── tool_usage
├── task_dependencies
└── agent_performance_metrics

persona_domain (6)
├── modes
├── mode_configurations
├── user_mode_preferences
├── mode_triggers
├── behavioral_profiles
└── communication_styles

provenance_domain (5)
├── sources
├── citations
├── claim_verification
├── reasoning_provenance
└── influence_tracking

system_domain (9)
├── system_configuration
├── audit_logs
├── error_logs
├── feature_flags
├── usage_metrics
├── rate_limits
├── model_versions
├── performance_benchmarks
└── api_keys
```

---

## Neo4j Entities

### Identity Domain

**Node Types (3):**
1. `User`
2. `Topic`
3. `Domain`

**Relationship Types (3):**
1. `INTERESTED_IN` (User → Topic)
2. `EXPERT_IN` (User → Domain)
3. `FOLLOWS` (User → User)

---

### Conversation Domain

**Node Types (3):**
1. `Conversation`
2. `Message`
3. `ConversationTopic`

**Relationship Types (6):**
1. `IN_CONVERSATION` (Message → Conversation)
2. `TRANSITIONS_TO` (Message → Message)
3. `REFERENCES` (Message → Message)
4. `ABOUT` (Conversation → ConversationTopic)
5. `EVOLVES_FROM` (ConversationTopic → ConversationTopic)
6. `REPLIED_TO` (Message → Message)

---

### Memory Domain

**Node Types (5):**
1. `EpisodicMemory`
2. `SemanticMemory`
3. `ProceduralMemory`
4. `WorkingMemory`
5. `Concept`

**Relationship Types (12):**
1. `FROM_CONVERSATION` (EpisodicMemory → Conversation)
2. `CONSOLIDATES_INTO` (WorkingMemory → EpisodicMemory)
3. `DECAYS_TO` (EpisodicMemory → SemanticMemory)
4. `IS_A` (SemanticMemory → SemanticMemory)
5. `RELATED_TO` (SemanticMemory → SemanticMemory)
6. `PART_OF` (Concept → Concept)
7. `OPPOSITE_OF` (Concept → Concept)
8. `ENABLES` (ProceduralMemory → ProceduralMemory)
9. `REQUIRES` (ProceduralMemory → Concept)
10. `LEARNED_FROM` (SemanticMemory → EpisodicMemory)
11. `REINFORCES` (EpisodicMemory → SemanticMemory)
12. `ASSOCIATED_WITH` (Memory → Memory)

---

### Knowledge Domain

**Node Types (4):**
1. `Document`
2. `Entity`
3. `Concept`
4. `Collection`

**Relationship Types (9):**
1. `CONTAINS_ENTITY` (Document → Entity)
2. `DEFINED_AS` (Entity → Entity)
3. `SHARES_CONCEPT` (Document → Document)
4. `CITES` (Document → Document)
5. `MENTIONS` (Document → Concept)
6. `BELONGS_TO_COLLECTION` (Document → Collection)
7. `RELATED_DOCUMENT` (Document → Document)
8. `DERIVED_FROM` (Entity → Entity)
9. `SYNONYM_OF` (Entity → Entity)

---

### Cognition Domain

**Node Types (6):**
1. `Agent`
2. `Task`
3. `ReasoningStep`
4. `Decision`
5. `Tool`
6. `ExecutionPlan`

**Relationship Types (12):**
1. `EXECUTES` (Agent → Task)
2. `STEP_OF` (ReasoningStep → Task)
3. `PRECEDES` (ReasoningStep → ReasoningStep)
4. `COLLABORATES_WITH` (Agent → Agent)
5. `IN_CHAIN` (Decision → Task)
6. `IF_TRUE` (Decision → ReasoningStep)
7. `IF_FALSE` (Decision → ReasoningStep)
8. `USES_TOOL` (Agent → Tool)
9. `DEPENDS_ON` (Task → Task)
10. `DELEGATES_TO` (Agent → Agent)
11. `PRODUCES_OUTPUT` (Task → Message)
12. `CONSUMES_INPUT` (Task → Message)

---

### Persona Domain

**Node Types (4):**
1. `Mode`
2. `BehavioralProfile`
3. `Context`
4. `Trait`

**Relationship Types (8):**
1. `PREFERS_MODE` (User → Mode)
2. `TRANSITIONS_TO` (Mode → Mode)
3. `EXHIBITS_TRAIT` (User → BehavioralProfile)
4. `SUGGESTS_MODE` (Context → Mode)
5. `HAS_TRAIT` (BehavioralProfile → Trait)
6. `CONFLICTS_WITH` (Trait → Trait)
7. `REINFORCES` (Trait → Trait)
8. `ACTIVATED_IN` (Mode → Context)

---

### Provenance Domain

**Node Types (2):**
1. `Source`
2. `Claim`

**Relationship Types (7):**
1. `CITES` (Message → Source)
2. `INFLUENCED_BY` (Message → Source)
3. `USES_INFORMATION` (ReasoningStep → Source)
4. `PRODUCES` (ReasoningStep → Message)
5. `DERIVED_FROM` (Source → Source)
6. `SUPPORTS_CLAIM` (Source → Claim)
7. `CONTRADICTS_CLAIM` (Source → Claim)

---

### Neo4j Entity Summary

**Total Node Types: 27**
**Total Relationship Types: 57**

```
Identity Domain
Nodes (3)
├── User
├── Topic
└── Domain
Relationships (3)
├── INTERESTED_IN
├── EXPERT_IN
└── FOLLOWS

Conversation Domain
Nodes (3)
├── Conversation
├── Message
└── ConversationTopic
Relationships (6)
├── IN_CONVERSATION
├── TRANSITIONS_TO
├── REFERENCES
├── ABOUT
├── EVOLVES_FROM
└── REPLIED_TO

Memory Domain
Nodes (5)
├── EpisodicMemory
├── SemanticMemory
├── ProceduralMemory
├── WorkingMemory
└── Concept
Relationships (12)
├── FROM_CONVERSATION
├── CONSOLIDATES_INTO
├── DECAYS_TO
├── IS_A
├── RELATED_TO
├── PART_OF
├── OPPOSITE_OF
├── ENABLES
├── REQUIRES
├── LEARNED_FROM
├── REINFORCES
└── ASSOCIATED_WITH

Knowledge Domain
Nodes (4)
├── Document
├── Entity
├── Concept
└── Collection
Relationships (9)
├── CONTAINS_ENTITY
├── DEFINED_AS
├── SHARES_CONCEPT
├── CITES
├── MENTIONS
├── BELONGS_TO_COLLECTION
├── RELATED_DOCUMENT
├── DERIVED_FROM
└── SYNONYM_OF

Cognition Domain
Nodes (6)
├── Agent
├── Task
├── ReasoningStep
├── Decision
├── Tool
└── ExecutionPlan
Relationships (12)
├── EXECUTES
├── STEP_OF
├── PRECEDES
├── COLLABORATES_WITH
├── IN_CHAIN
├── IF_TRUE
├── IF_FALSE
├── USES_TOOL
├── DEPENDS_ON
├── DELEGATES_TO
├── PRODUCES_OUTPUT
└── CONSUMES_INPUT

Persona Domain
Nodes (4)
├── Mode
├── BehavioralProfile
├── Context
└── Trait
Relationships (8)
├── PREFERS_MODE
├── TRANSITIONS_TO
├── EXHIBITS_TRAIT
├── SUGGESTS_MODE
├── HAS_TRAIT
├── CONFLICTS_WITH
├── REINFORCES
└── ACTIVATED_IN

Provenance Domain
Nodes (2)
├── Source
└── Claim
Relationships (7)
├── CITES
├── INFLUENCED_BY
├── USES_INFORMATION
├── PRODUCES
├── DERIVED_FROM
├── SUPPORTS_CLAIM
└── CONTRADICTS_CLAIM
```

---

## Qdrant Collections

### Memory Domain

**Collection (1):**
1. `memory_embeddings`

---

### Knowledge Domain

**Collections (2):**
1. `document_chunks`
2. `message_embeddings`

---

### Qdrant Entity Summary

**Total Collections: 3**

```
memory_embeddings (Memory Domain)
├── Vector size: 1536
├── Distance: Cosine
└── Payload fields:
    ├── memory_id
    ├── user_id
    ├── memory_type
    ├── timestamp
    ├── importance_score
    ├── access_count
    ├── content_summary
    └── tags

document_chunks (Knowledge Domain)
├── Vector size: 1536
├── Distance: Cosine
└── Payload fields:
    ├── chunk_id
    ├── document_id
    ├── user_id
    ├── chunk_index
    ├── document_title
    ├── document_type
    ├── page_number
    ├── content_summary
    ├── created_at
    └── tags

message_embeddings (Knowledge Domain)
├── Vector size: 1536
├── Distance: Cosine
└── Payload fields:
    ├── message_id
    ├── conversation_id
    ├── user_id
    ├── role
    ├── timestamp
    ├── intent
    └── emotional_tone
```

---

## Redis Keys

### Identity Domain

**Key Patterns (1):**
1. `session:{session_id}`

---

### Conversation Domain

**Key Patterns (2):**
1. `conversation:active:{conversation_id}`
2. `conversation:context:{conversation_id}`

---

### Memory Domain

**Key Patterns (1):**
1. `working_memory:{user_id}`

---

### Cognition Domain

**Key Patterns (2):**
1. `task_queue:{priority}`
2. `agent_status:{agent_id}`

---

### System Domain

**Key Patterns (2):**
1. `rate_limit:{user_id}:{resource_type}`
2. `feature_flag:{flag_name}`

---

### Redis Entity Summary

**Total Key Patterns: 8**

```
Identity Domain (1)
└── session:{session_id}

Conversation Domain (2)
├── conversation:active:{conversation_id}
└── conversation:context:{conversation_id}

Memory Domain (1)
└── working_memory:{user_id}

Cognition Domain (2)
├── task_queue:{priority}
└── agent_status:{agent_id}

System Domain (2)
├── rate_limit:{user_id}:{resource_type}
└── feature_flag:{flag_name}
```

---

## MongoDB Collections

### Conversation Domain

**Collections (1):**
1. `message_documents`

---

### Cognition Domain

**Collections (2):**
1. `execution_logs`
2. `agent_decision_traces`

---

### System Domain

**Collections (1):**
1. `detailed_error_logs`

---

### MongoDB Entity Summary

**Total Collections: 4**

```
Conversation Domain (1)
└── message_documents
    ├── message_id
    ├── conversation_id
    ├── user_id
    ├── role
    ├── content
    ├── analysis
    ├── context
    └── created_at

Cognition Domain (2)
├── execution_logs
│   ├── execution_id
│   ├── task_id
│   ├── agent_id
│   ├── execution_trace
│   ├── performance_metrics
│   └── created_at
└── agent_decision_traces
    ├── trace_id
    ├── agent_id
    ├── task_id
    ├── decision_tree
    ├── alternatives_considered
    └── final_decision

System Domain (1)
└── detailed_error_logs
    ├── error_id
    ├── timestamp
    ├── error_type
    ├── stack_trace
    ├── context
    └── environment
```

---

## S3/MinIO Buckets

### Knowledge Domain

**Buckets (3):**
1. `vato-documents`
2. `vato-audio-files`
3. `vato-images`

---

### S3/MinIO Entity Summary

**Total Buckets: 3**

```
vato-documents
├── user_id/
│   └── document_id/
│       ├── original.*
│       ├── processed/
│       └── thumbnails/

vato-audio-files
├── user_id/
│   └── audio_id/
│       ├── original.*
│       ├── transcriptions/
│       └── processed/

vato-images
├── user_id/
│   └── image_id/
│       ├── original.*
│       ├── processed/
│       └── extracted_text/
```

---

## Entity Count Summary

### By Database Technology

```
┌──────────────┬────────────────┬───────────────────────┐
│   Database   │  Entity Type   │         Count         │
├──────────────┼────────────────┼───────────────────────┤
│ PostgreSQL   │ Tables         │ 48                    │
│ PostgreSQL   │ Schemas        │ 8                     │
├──────────────┼────────────────┼───────────────────────┤
│ Neo4j        │ Node Types     │ 27                    │
│ Neo4j        │ Relationships  │ 57                    │
├──────────────┼────────────────┼───────────────────────┤
│ Qdrant       │ Collections    │ 3                     │
├──────────────┼────────────────┼───────────────────────┤
│ Redis        │ Key Patterns   │ 8                     │
├──────────────┼────────────────┼───────────────────────┤
│ MongoDB      │ Collections    │ 4                     │
├──────────────┼────────────────┼───────────────────────┤
│ S3/MinIO     │ Buckets        │ 3                     │
└──────────────┴────────────────┴───────────────────────┘
```

---

### By Domain

```
┌────────────────────┬──────┬──────┬────────┬───────┬─────────┬─────┐
│      Domain        │ PG   │ Neo4j│ Qdrant │ Redis │ MongoDB │ S3  │
├────────────────────┼──────┼──────┼────────┼───────┼─────────┼─────┤
│ Identity           │  4   │   6  │   0    │   1   │    0    │  0  │
│ Conversation       │  5   │   9  │   0    │   2   │    1    │  0  │
│ Memory             │  3   │  17  │   1    │   1   │    0    │  0  │
│ Knowledge          │  8   │  13  │   2    │   0   │    0    │  3  │
│ Cognition          │  9   │  18  │   0    │   2   │    2    │  0  │
│ Persona            │  6   │  12  │   0    │   0   │    0    │  0  │
│ Provenance         │  5   │   9  │   0    │   0   │    0    │  0  │
│ System             │  9   │   0  │   0    │   2   │    1    │  0  │
├────────────────────┼──────┼──────┼────────┼───────┼─────────┼─────┤
│ TOTAL              │ 48   │  84  │   3    │   8   │    4    │  3  │
└────────────────────┴──────┴──────┴────────┴───────┴─────────┴─────┘

Note: Neo4j count includes both node types and relationship types
```

---

## Complete Entity Hierarchy

```
VATO SYSTEM - ALL ENTITIES
│
├── POSTGRESQL (48 tables across 8 schemas)
│   ├── identity_domain.users
│   ├── identity_domain.user_profiles
│   ├── identity_domain.user_preferences
│   ├── identity_domain.auth_sessions
│   │
│   ├── conversation_domain.conversations
│   ├── conversation_domain.messages
│   ├── conversation_domain.message_metadata
│   ├── conversation_domain.conversation_participants
│   ├── conversation_domain.conversation_tags
│   │
│   ├── memory_domain.memory_entries
│   ├── memory_domain.memory_associations
│   ├── memory_domain.memory_importance_factors
│   │
│   ├── knowledge_domain.documents
│   ├── knowledge_domain.document_metadata
│   ├── knowledge_domain.document_chunks
│   ├── knowledge_domain.document_relationships
│   ├── knowledge_domain.document_tags
│   ├── knowledge_domain.collections
│   ├── knowledge_domain.collection_documents
│   ├── knowledge_domain.document_processing_queue
│   │
│   ├── cognition_domain.agents
│   ├── cognition_domain.tasks
│   ├── cognition_domain.task_executions
│   ├── cognition_domain.reasoning_chains
│   ├── cognition_domain.agent_communications
│   ├── cognition_domain.tool_registry
│   ├── cognition_domain.tool_usage
│   ├── cognition_domain.task_dependencies
│   ├── cognition_domain.agent_performance_metrics
│   │
│   ├── persona_domain.modes
│   ├── persona_domain.mode_configurations
│   ├── persona_domain.user_mode_preferences
│   ├── persona_domain.mode_triggers
│   ├── persona_domain.behavioral_profiles
│   ├── persona_domain.communication_styles
│   │
│   ├── provenance_domain.sources
│   ├── provenance_domain.citations
│   ├── provenance_domain.claim_verification
│   ├── provenance_domain.reasoning_provenance
│   ├── provenance_domain.influence_tracking
│   │
│   ├── system_domain.system_configuration
│   ├── system_domain.audit_logs
│   ├── system_domain.error_logs
│   ├── system_domain.feature_flags
│   ├── system_domain.usage_metrics
│   ├── system_domain.rate_limits
│   ├── system_domain.model_versions
│   ├── system_domain.performance_benchmarks
│   └── system_domain.api_keys
│
├── NEO4J (27 node types, 57 relationship types)
│   ├── Identity Domain
│   │   ├── User (node)
│   │   ├── Topic (node)
│   │   ├── Domain (node)
│   │   ├── INTERESTED_IN (relationship)
│   │   ├── EXPERT_IN (relationship)
│   │   └── FOLLOWS (relationship)
│   │
│   ├── Conversation Domain
│   │   ├── Conversation (node)
│   │   ├── Message (node)
│   │   ├── ConversationTopic (node)
│   │   ├── IN_CONVERSATION (relationship)
│   │   ├── TRANSITIONS_TO (relationship)
│   │   ├── REFERENCES (relationship)
│   │   ├── ABOUT (relationship)
│   │   ├── EVOLVES_FROM (relationship)
│   │   └── REPLIED_TO (relationship)
│   │
│   ├── Memory Domain
│   │   ├── EpisodicMemory (node)
│   │   ├── SemanticMemory (node)
│   │   ├── ProceduralMemory (node)
│   │   ├── WorkingMemory (node)
│   │   ├── Concept (node)
│   │   ├── FROM_CONVERSATION (relationship)
│   │   ├── CONSOLIDATES_INTO (relationship)
│   │   ├── DECAYS_TO (relationship)
│   │   ├── IS_A (relationship)
│   │   ├── RELATED_TO (relationship)
│   │   ├── PART_OF (relationship)
│   │   ├── OPPOSITE_OF (relationship)
│   │   ├── ENABLES (relationship)
│   │   ├── REQUIRES (relationship)
│   │   ├── LEARNED_FROM (relationship)
│   │   ├── REINFORCES (relationship)
│   │   └── ASSOCIATED_WITH (relationship)
│   │
│   ├── Knowledge Domain
│   │   ├── Document (node)
│   │   ├── Entity (node)
│   │   ├── Concept (node)
│   │   ├── Collection (node)
│   │   ├── CONTAINS_ENTITY (relationship)
│   │   ├── DEFINED_AS (relationship)
│   │   ├── SHARES_CONCEPT (relationship)
│   │   ├── CITES (relationship)
│   │   ├── MENTIONS (relationship)
│   │   ├── BELONGS_TO_COLLECTION (relationship)
│   │   ├── RELATED_DOCUMENT (relationship)
│   │   ├── DERIVED_FROM (relationship)
│   │   └── SYNONYM_OF (relationship)
│   │
│   ├── Cognition Domain
│   │   ├── Agent (node)
│   │   ├── Task (node)
│   │   ├── ReasoningStep (node)
│   │   ├── Decision (node)
│   │   ├── Tool (node)
│   │   ├── ExecutionPlan (node)
│   │   ├── EXECUTES (relationship)
│   │   ├── STEP_OF (relationship)
│   │   ├── PRECEDES (relationship)
│   │   ├── COLLABORATES_WITH (relationship)
│   │   ├── IN_CHAIN (relationship)
│   │   ├── IF_TRUE (relationship)
│   │   ├── IF_FALSE (relationship)
│   │   ├── USES_TOOL (relationship)
│   │   ├── DEPENDS_ON (relationship)
│   │   ├── DELEGATES_TO (relationship)
│   │   ├── PRODUCES_OUTPUT (relationship)
│   │   └── CONSUMES_INPUT (relationship)
│   │
│   ├── Persona Domain
│   │   ├── Mode (node)
│   │   ├── BehavioralProfile (node)
│   │   ├── Context (node)
│   │   ├── Trait (node)
│   │   ├── PREFERS_MODE (relationship)
│   │   ├── TRANSITIONS_TO (relationship)
│   │   ├── EXHIBITS_TRAIT (relationship)
│   │   ├── SUGGESTS_MODE (relationship)
│   │   ├── HAS_TRAIT (relationship)
│   │   ├── CONFLICTS_WITH (relationship)
│   │   ├── REINFORCES (relationship)
│   │   └── ACTIVATED_IN (relationship)
│   │
│   └── Provenance Domain
│       ├── Source (node)
│       ├── Claim (node)
│       ├── CITES (relationship)
│       ├── INFLUENCED_BY (relationship)
│       ├── USES_INFORMATION (relationship)
│       ├── PRODUCES (relationship)
│       ├── DERIVED_FROM (relationship)
│       ├── SUPPORTS_CLAIM (relationship)
│       └── CONTRADICTS_CLAIM (relationship)
│
├── QDRANT (3 collections)
│   ├── memory_embeddings
│   ├── document_chunks
│   └── message_embeddings
│
├── REDIS (8 key patterns)
│   ├── session:{session_id}
│   ├── conversation:active:{conversation_id}
│   ├── conversation:context:{conversation_id}
│   ├── working_memory:{user_id}
│   ├── task_queue:{priority}
│   ├── agent_status:{agent_id}
│   ├── rate_limit:{user_id}:{resource_type}
│   └── feature_flag:{flag_name}
│
├── MONGODB (4 collections)
│   ├── message_documents
│   ├── execution_logs
│   ├── agent_decision_traces
│   └── detailed_error_logs
│
└── S3/MINIO (3 buckets)
    ├── vato-documents
    ├── vato-audio-files
    └── vato-images
```

---

## Quick Reference Matrix

### Entity Distribution by Domain & Database

```
┌────────────────┬─────┬────────┬────────┬───────┬─────────┬─────┬───────┐
│     Domain     │ PG  │Neo4j(N)│Neo4j(R)│Qdrant │  Redis  │ Mgo │  S3   │
├────────────────┼─────┼────────┼────────┼───────┼─────────┼─────┼───────┤
│ Identity       │  4  │   3    │   3    │   0   │    1    │  0  │   0   │
│ Conversation   │  5  │   3    │   6    │   0   │    2    │  1  │   0   │
│ Memory         │  3  │   5    │  12    │   1   │    1    │  0  │   0   │
│ Knowledge      │  8  │   4    │   9    │   2   │    0    │  0  │   3   │
│ Cognition      │  9  │   6    │  12    │   0   │    2    │  2  │   0   │
│ Persona        │  6  │   4    │   8    │   0   │    0    │  0  │   0   │
│ Provenance     │  5  │   2    │   7    │   0   │    0    │  0  │   0   │
│ System         │  9  │   0    │   0    │   0   │    2    │  1  │   0   │
└────────────────┴─────┴────────┴────────┴───────┴─────────┴─────┴───────┘

Legend:
PG      = PostgreSQL (tables)
Neo4j(N) = Neo4j nodes
Neo4j(R) = Neo4j relationships
Qdrant  = Vector collections
Redis   = Key patterns
Mgo     = MongoDB collections
S3      = Storage buckets
```

---

## Total Entity Count

```
DATABASE TECHNOLOGY SUMMARY
═══════════════════════════════════════════════════════

PostgreSQL
  • Schemas: 8
  • Tables: 48
  • Estimated Indexes: ~150

Neo4j
  • Node Types: 27
  • Relationship Types: 57
  • Total Graph Elements: 84

Qdrant
  • Collections: 3
  • Vector Dimensions: 1536 per collection
  • Payload Fields: ~30 total

Redis
  • Key Patterns: 8
  • Namespaces: 5
  • TTL Patterns: ~4

MongoDB
  • Collections: 4
  • Estimated Indexes: ~12

S3/MinIO
  • Buckets: 3
  • Directory Structures: ~9

═══════════════════════════════════════════════════════
GRAND TOTAL ENTITIES: 150+
(48 tables + 84 graph elements + 3 collections + 
 8 key patterns + 4 collections + 3 buckets)
═══════════════════════════════════════════════════════
```

---

## Notes

1. **PostgreSQL** serves as the primary transactional database for all structured data
2. **Neo4j** handles complex relationship traversal and graph-based queries
3. **Qdrant** manages vector embeddings for semantic search
4. **Redis** provides high-speed caching and session management
5. **MongoDB** stores semi-structured logs and execution traces
6. **S3/MinIO** handles file storage for documents, audio, and images

Each database technology is chosen based on the specific access patterns and requirements of the domain it serves.
