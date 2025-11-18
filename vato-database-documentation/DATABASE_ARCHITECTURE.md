# VATO Database Architecture

## Overview

VATO implements a **multi-database polyglot persistence architecture** with a unified abstraction layer. This design allows the application to leverage the strengths of different database technologies while maintaining a clean, maintainable codebase.

## Architecture Layers

```
┌─────────────────────────────────────────────────────────────┐
│                    APPLICATION LAYER                        │
│                  (Next.js Frontend + APIs)                  │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│                  ABSTRACTION LAYERS                         │
├─────────────────────────────────────────────────────────────┤
│  DatabaseService (Factory Pattern)                          │
│    ├── RelationalDB      → PostgreSQL Interface            │
│    ├── GraphDB           → Neo4j/Graph Interface           │
│    ├── VectorDB          → Qdrant Interface                │
│    ├── CacheDB           → Redis Interface                 │
│    ├── DocumentDB        → MongoDB Interface               │
│    └── ObjectStorage     → MinIO/S3 Interface              │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│               DATABASE IMPLEMENTATIONS                      │
└─────────────────────────────────────────────────────────────┘
```

---

## 1. Application Layer

### Next.js Frontend + APIs

The application layer consists of:
- **Frontend**: React/Next.js UI components
- **API Routes**: Next.js API endpoints (`/api/*`)
- **Server Components**: Server-side rendered components
- **Client Components**: Interactive client-side components

**Key Responsibilities:**
- User interaction handling
- Business logic orchestration
- API endpoint exposure
- Data presentation

---

## 2. Abstraction Layer

### DatabaseService (Factory Pattern)

The abstraction layer provides a **unified interface** to interact with multiple databases without tight coupling to specific implementations.

#### Structure

```
lib/database/
├── interfaces/
│   ├── IRelationalDB       // PostgreSQL interface
│   ├── IGraphDB            // Graph database interface
│   ├── IVectorDB           // Vector database interface
│   ├── ICacheDB            // Cache interface
│   ├── IDocumentDB        // Document store interface
│   └── IObjectStorage      // Object storage interface
│
├── implementations/
│   ├── PostgreSQLAdapter   // Implements IRelationalDB
│   ├── Neo4jAdapter        // Implements IGraphDB
│   ├── QdrantAdapter      // Implements IVectorDB
│   ├── RedisAdapter       // Implements ICacheDB
│   ├── MongoDBAdapter    // Implements IDocumentDB
│   └── MinIOAdapter       // Implements IObjectStorage
│
├── factory/
│   └── DatabaseFactory     // Creates database instances
│
└── index                 // Main database service export
```

#### Design Patterns Used

1. **Factory Pattern**: `DatabaseFactory` instantiates the appropriate database adapter
2. **Adapter Pattern**: Each adapter translates generic interface calls to database-specific operations
3. **Strategy Pattern**: Different databases can be swapped without changing application code
4. **Dependency Injection**: Database instances are injected into services

#### Benefits

- **Loose Coupling**: Application code doesn't depend on specific database implementations
- **Testability**: Easy to mock database interfaces for testing
- **Flexibility**: Switch database providers without code changes
- **Maintainability**: Centralized database logic
- **Type Safety**: TypeScript interfaces ensure compile-time type checking

---

## 3. Database Implementations

### 3.1 PostgreSQL (Relational Database)

**Port:** 5432  
**Purpose:** Primary relational data storage

#### Schema Organization (8 Schemas)

1. **identity**: Users, authentication, profiles
2. **conversation**: Chat messages, threads, participants
3. **memory**: Long-term memory storage, memory fragments
4. **agent**: Agent configurations, capabilities, skills
5. **task**: Task definitions, execution states, workflows
6. **knowledge**: Knowledge base, documents, facts
7. **analytics**: Usage metrics, performance data
8. **system**: System configurations, logs, metadata

#### Scale

- **48 Tables** across 8 schemas
- ACID compliance for critical data
- Complex relational queries and joins
- Foreign key constraints for data integrity

#### Use Cases

- User management and authentication
- Structured conversation data
- Task and workflow management
- Transactional operations

---

### 3.2 Neo4j Community Edition (Graph Database)

**Ports:** 7474 (HTTP), 7687 (Bolt)  
**Purpose:** Relationship and knowledge graph management

#### Graph Structure

- **27 Node Types**: Users, Agents, Memories, Concepts, Tasks, etc.
- **57 Relationship Types**: Connections between entities

#### Use Cases

- **Relationship Mapping**: Complex entity relationships
- **Knowledge Graphs**: Semantic connections between concepts
- **Agent Networks**: Multi-agent interaction patterns
- **Memory Associations**: How memories relate to each other
- **Path Finding**: Discover connections and patterns
- **Recommendation**: Graph-based recommendations

#### Example Relationships

```
(User)-[:INITIATED]->(Conversation)
(Agent)-[:PARTICIPATED_IN]->(Conversation)
(Memory)-[:RELATED_TO]->(Memory)
(Task)-[:DEPENDS_ON]->(Task)
(Agent)-[:HAS_SKILL]->(Skill)
(Concept)-[:IS_A]->(Category)
```

---

### 3.3 Qdrant (Vector Database)

**Port:** 6333  
**Purpose:** Semantic search and similarity matching

#### Collections

1. **memory_embeddings**
   - Memory fragments as vectors
   - Semantic memory retrieval
   - Similar experience finding

2. **document_chunks**
   - Document embeddings for RAG
   - Content-based search
   - Semantic document retrieval

3. **message_embeddings**
   - Conversation message vectors
   - Similar conversation finding
   - Context-aware responses

#### Use Cases

- **Semantic Search**: Find conceptually similar content
- **RAG (Retrieval Augmented Generation)**: Context injection for LLMs
- **Memory Retrieval**: Find relevant past experiences
- **Duplicate Detection**: Identify similar content
- **Contextual Understanding**: Semantic similarity matching

#### Vector Dimensions

Typically 768 or 1536 dimensions (depending on embedding model used)

---

### 3.4 Redis (Cache & Real-time Data)

**Port:** 6379  
**Purpose:** High-performance caching and real-time state management

#### Key Namespaces

1. **Sessions**
   - User session data
   - Authentication tokens
   - Temporary user state

2. **Working Memory**
   - Agent current context
   - Active conversation state
   - Short-term memory cache

3. **Task Queues**
   - Background job queues
   - Task scheduling
   - Job status tracking

#### Use Cases

- **Session Management**: Fast session lookup
- **Caching**: Reduce database load
- **Rate Limiting**: API rate limit tracking
- **Real-time State**: Current agent state
- **Pub/Sub**: Real-time event broadcasting
- **Leaderboards**: Sorted sets for rankings

#### TTL (Time-To-Live) Strategy

- Sessions: 24 hours
- Working memory: 1 hour
- Cache entries: Configurable per use case

---

### 3.5 MongoDB (Document Database)

**Port:** 27017  
**Purpose:** Flexible document storage for unstructured/semi-structured data

#### Collections

1. **message_documents**
   - Complete message payloads
   - Rich metadata
   - Nested conversation context

2. **execution_logs**
   - Agent execution traces
   - Step-by-step logs
   - Performance metrics

3. **agent_decision_traces**
   - Decision-making process logs
   - Reasoning chains
   - Tool usage history

4. **detailed_error_logs**
   - Full error stack traces
   - Context at error time
   - Debug information

#### Use Cases

- **Audit Trails**: Complete execution history
- **Debug Logs**: Detailed error information
- **Flexible Schema**: Evolving data structures
- **Nested Data**: Complex hierarchical documents
- **Analytics**: Log aggregation and analysis

#### Document Structure Example

```json
{
  "_id": "msg_123",
  "conversation_id": "conv_456",
  "timestamp": "2025-11-05T16:54:00Z",
  "content": {
    "text": "...",
    "metadata": {...},
    "attachments": [...]
  },
  "agent_context": {
    "reasoning": [...],
    "tools_used": [...]
  }
}
```

---

### 3.6 MinIO (Object Storage)

**Ports:** 9000 (API), 9001 (Console)  
**Purpose:** S3-compatible object storage for large files

#### Buckets

1. **vato-documents**
   - PDF files
   - Word documents
   - Text files
   - Spreadsheets

2. **vato-audio-files**
   - Voice recordings
   - Audio transcriptions
   - Speech samples

3. **vato-images**
   - User uploads
   - Generated images
   - Avatars and thumbnails

#### Use Cases

- **File Uploads**: User-uploaded content
- **Media Storage**: Audio and image files
- **Backup Storage**: Database backups
- **Static Assets**: Large static files
- **Document Archival**: Long-term document storage

#### Features

- **S3 Compatibility**: Standard S3 API
- **Versioning**: File version control
- **Access Control**: Bucket policies and IAM
- **Encryption**: At-rest and in-transit encryption
- **Lifecycle Policies**: Automated data management

---

## Data Flow Examples

### Example 1: User Sends Message

```
1. User Input → Next.js API Route
2. API → DatabaseFactory.getRelationalDB()
3. PostgreSQL: Save message to conversation.messages
4. DatabaseFactory.getVectorDB()
5. Qdrant: Store message embedding in message_embeddings
6. DatabaseFactory.getDocumentDB()
7. MongoDB: Save full message document with metadata
8. DatabaseFactory.getCacheDB()
9. Redis: Update working memory cache
```

### Example 2: Semantic Memory Search

```
1. Agent needs relevant context
2. API → DatabaseFactory.getVectorDB()
3. Qdrant: Query similar memory embeddings
4. Get memory IDs from vector search
5. DatabaseFactory.getRelationalDB()
6. PostgreSQL: Fetch full memory details
7. DatabaseFactory.getGraphDB()
8. Neo4j: Get related memories and concepts
9. Return enriched context to agent
```

### Example 3: File Upload

```
1. User uploads file → Next.js API
2. API → DatabaseFactory.getObjectStorage()
3. MinIO: Store file in vato-documents bucket
4. Get object URL and metadata
5. DatabaseFactory.getRelationalDB()
6. PostgreSQL: Save file reference in knowledge.documents
7. DatabaseFactory.getVectorDB()
8. Qdrant: Store document chunk embeddings
9. Return success with file URL
```

---

## Database Selection Rationale

| Database   | Why This Choice?                                          |
|------------|----------------------------------------------------------|
| PostgreSQL | Industry-standard relational DB, ACID compliance, mature |
| Neo4j      | Best-in-class graph database, powerful query language    |
| Qdrant     | Rust-based, high-performance vector search               |
| Redis      | Fastest in-memory cache, rich data structures            |
| MongoDB    | Flexible schema, excellent for logs and traces           |
| MinIO      | Self-hosted S3, cost-effective object storage            |

---

## Scalability Considerations

### Horizontal Scaling

- **PostgreSQL**: Read replicas for query scaling
- **Neo4j**: Clustering available (Enterprise Edition)
- **Qdrant**: Distributed mode for large vector datasets
- **Redis**: Cluster mode, sharding
- **MongoDB**: Sharding for horizontal scaling
- **MinIO**: Distributed mode with erasure coding

### Vertical Scaling

Each database can be independently scaled based on workload:
- CPU: Neo4j (graph traversal), Qdrant (vector search)
- Memory: Redis (in-memory cache), Qdrant (vector indexes)
- Storage: PostgreSQL, MongoDB, MinIO

---

## Monitoring & Observability

### Key Metrics to Track

1. **PostgreSQL**: Query performance, connection pool usage
2. **Neo4j**: Graph traversal times, node/relationship counts
3. **Qdrant**: Search latency, vector dimension health
4. **Redis**: Hit ratio, memory usage, eviction rate
5. **MongoDB**: Document sizes, index usage
6. **MinIO**: Storage capacity, bandwidth usage

### Recommended Tools

- **Prometheus**: Metrics collection
- **Grafana**: Visualization dashboards
- **Loki**: Log aggregation
- **Jaeger**: Distributed tracing
- **pgAdmin**: PostgreSQL management
- **Neo4j Browser**: Graph visualization

---

## Development Guidelines

### When to Use Each Database

| Scenario                          | Database       |
|-----------------------------------|----------------|
| User authentication               | PostgreSQL     |
| Finding related concepts          | Neo4j          |
| Semantic search                   | Qdrant         |
| Caching API responses             | Redis          |
| Storing execution logs            | MongoDB        |
| Uploading user documents          | MinIO          |
| Complex multi-table queries       | PostgreSQL     |
| Recommendation systems            | Neo4j          |
| Similar memory retrieval          | Qdrant         |
| Session management                | Redis          |
| Flexible schema requirements      | MongoDB        |
| Large binary files                | MinIO          |

### Code Example: Using the Abstraction Layer

```typescript
import { DatabaseFactory } from '@/lib/database';

// Get database instances
const relationalDB = DatabaseFactory.getRelationalDB();
const graphDB = DatabaseFactory.getGraphDB();
const vectorDB = DatabaseFactory.getVectorDB();

// Save a message
async function saveMessage(message: Message) {
  // Store in PostgreSQL
  const savedMsg = await relationalDB.query(
    'INSERT INTO conversation.messages VALUES ($1, $2, $3)',
    [message.id, message.content, message.userId]
  );
  
  // Create graph relationships
  await graphDB.createRelationship(
    { type: 'User', id: message.userId },
    'SENT',
    { type: 'Message', id: message.id }
  );
  
  // Store embedding
  await vectorDB.upsert('message_embeddings', {
    id: message.id,
    vector: await generateEmbedding(message.content),
    metadata: { userId: message.userId }
  });
}
```

---

## Security Considerations

### Connection Security

- All database connections use TLS/SSL
- Environment variables for credentials (never hardcoded)
- Connection string encryption at rest
- Principle of least privilege for database users

### Access Control

- **PostgreSQL**: Row-level security policies
- **Neo4j**: Role-based access control
- **Qdrant**: API key authentication
- **Redis**: ACL (Access Control Lists)
- **MongoDB**: Database-level authentication
- **MinIO**: IAM policies and bucket policies

### Data Protection

- Encryption at rest (where supported)
- Encryption in transit (TLS)
- Regular backups with encryption
- Data anonymization for sensitive fields
- Audit logging for all data access

---

## Backup & Disaster Recovery

### Backup Strategy

| Database   | Backup Method                    | Frequency   |
|------------|----------------------------------|-------------|
| PostgreSQL | pg_dump + WAL archiving         | Daily       |
| Neo4j      | neo4j-admin backup              | Daily       |
| Qdrant     | Snapshot API                    | Daily       |
| Redis      | RDB snapshots + AOF             | Hourly      |
| MongoDB    | mongodump                       | Daily       |
| MinIO      | S3 replication to backup bucket | Real-time   |

### Recovery Time Objectives (RTO)

- Critical data (PostgreSQL, Redis): < 1 hour
- Graph data (Neo4j): < 4 hours
- Vector data (Qdrant): < 4 hours
- Logs (MongoDB): < 24 hours
- Object storage (MinIO): < 24 hours

---

## Migration Strategy

### Phase 1: Interface Definition
Define TypeScript interfaces for each database type

### Phase 2: Adapter Implementation
Implement adapters one database at a time

### Phase 3: Factory Setup
Create DatabaseFactory with configuration management

### Phase 4: Service Layer Integration
Refactor existing code to use abstraction layer

### Phase 5: Testing
Comprehensive testing with mocks and real databases

### Phase 6: Deployment
Gradual rollout with feature flags

---

## Future Enhancements

### Potential Additions

1. **Read Replicas**: Scale read operations
2. **Caching Layer**: Add Redis caching to all queries
3. **Query Optimizer**: Automatically route queries to optimal database
4. **Schema Evolution**: Automated schema migration tools
5. **Multi-region**: Geographic distribution of databases
6. **Real-time Sync**: CDC (Change Data Capture) for data synchronization

### Technology Alternatives to Consider

- **CockroachDB**: PostgreSQL-compatible distributed SQL
- **ArangoDB**: Multi-model database (graph + document)
- **Milvus**: Alternative vector database
- **ScyllaDB**: High-performance Cassandra alternative
- **Apache Pulsar**: Distributed messaging for real-time sync

---

## Conclusion

This multi-database architecture provides VATO with:

✅ **Flexibility**: Right tool for each job  
✅ **Scalability**: Independent scaling of each database  
✅ **Maintainability**: Clean abstraction layer  
✅ **Performance**: Optimized for each data type  
✅ **Resilience**: No single point of failure  

The abstraction layer ensures that the application remains decoupled from specific database implementations, allowing for future evolution and optimization.
